import { useState } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import UploadBox from "./components/UploadBox";
import ScoreCard from "./components/ScoreCard";
import SummaryCard from "./components/SummaryCard";
import SkillsCard from "./components/SkillsCard";
import MissingSkills from "./components/MissingSkills";
import SuggestionCard from "./components/SuggestionCard";

function App() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);


  const uploadResume = async () => {
    if (!file) {
      alert("Please select a PDF");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {

    setLoading(true);

    const response = await axios.post(
      "http://127.0.0.1:8000/upload",
      formData
    );

    setAnalysis(response.data);

  } catch (error) {

    console.log(error);

    alert("Upload Failed");

  } finally {

    setLoading(false);

  }

};

  return (
    <div className="App">
      <Navbar />

      <UploadBox
    file={file}
    setFile={setFile}
    uploadResume={uploadResume}
    loading={loading}
/>
      <ScoreCard score={analysis?.score || 0} />

      <SkillsCard skills={analysis?.skills || []} />

      <MissingSkills skills={analysis?.missingSkills || []} />

      <SuggestionCard suggestions={analysis?.suggestions || []} />
    </div>
  );
}

export default App;