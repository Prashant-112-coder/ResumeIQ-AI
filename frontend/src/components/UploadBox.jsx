import "./UploadBox.css";

function UploadBox({
  file,
  setFile,
  uploadResume,
  loading
}) {
  return (
    <div className="upload-card">

      <h1>AI Resume Analyzer</h1>

      <p>
        Upload your resume and receive
        an ATS score with AI suggestions.
      </p>

      <input
        type="file"
        accept=".pdf"
        onChange={(e)=>setFile(e.target.files[0])}
      />

      {file && (
        <h4>
            Selected:
            {" "}
            {file.name}
        </h4>
      )}

      <button
    onClick={uploadResume}
    disabled={loading}
>
    {loading ? "Analyzing Resume..." : "Analyze Resume"}
</button>
      

    </div>
  );
}

export default UploadBox;