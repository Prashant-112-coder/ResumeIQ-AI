import os
import json
import tempfile
import fitz
import google.generativeai as genai

from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

# ==========================
# Load Environment Variables
# ==========================
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY not found in .env file")

genai.configure(api_key=api_key)

# Gemini Model
model = genai.GenerativeModel("models/gemini-2.5-flash")

# ==========================
# FastAPI App
# ==========================
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================
# Home Route
# ==========================
@app.get("/")
def home():
    return {"message": "Backend Running"}

# ==========================
# Upload Resume Route
# ==========================
@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    try:

        # Save uploaded PDF
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(await file.read())
            temp_path = temp_file.name

        # Read PDF
        doc = fitz.open(temp_path)

        resume_text = ""

        for page in doc:
            resume_text += page.get_text()

        doc.close()

        if resume_text.strip() == "":
            return {
                "error": "No text found in PDF."
            }

        # Gemini Prompt
        prompt = f"""
You are an ATS Resume Analyzer.

Analyze the following resume.

Return ONLY valid JSON.

Do NOT use markdown.
Do NOT use ```json.
Do NOT explain anything.

Return exactly like this:

{{
    "score": 0,
    "summary": "",
    "skills": [],
    "missingSkills": [],
    "suggestions": []
}}

Resume:

{resume_text}
"""

        # Call Gemini
        response = model.generate_content(prompt)

        # Clean Gemini response
        text = response.text.strip()
        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

        # Convert to JSON
        data = json.loads(text)

        return data

    except Exception as e:

        print("ERROR:", e)

        return {
            "error": str(e)
        }