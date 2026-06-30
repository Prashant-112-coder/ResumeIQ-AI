import "./SummaryCard.css";

function SummaryCard({ summary }) {
  return (
    <div className="summary-card">
      <h2>📝 Resume Summary</h2>

      <p>{summary}</p>
    </div>
  );
}

export default SummaryCard;