import "./ScoreCard.css";

function ScoreCard({ score }) {

  const getStatus = () => {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Average";
    return "Needs Improvement";
  };

  const getColor = () => {
    if (score >= 85) return "#22c55e";
    if (score >= 70) return "#3b82f6";
    if (score >= 50) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className="score-card">

      <h2>📊 ATS Resume Score</h2>

      <div
        className="score-circle"
        style={{ borderColor: getColor(), color: getColor() }}
      >
        <div>
          <h1>{score}</h1>
          <span>/100</span>
        </div>
      </div>

      <h3 style={{ color: getColor() }}>
        {getStatus()}
      </h3>

    </div>
  );
}

export default ScoreCard;