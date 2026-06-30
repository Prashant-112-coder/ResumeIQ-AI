import "./SuggestionCard.css";

function SuggestionCard({ suggestions = [] }) {
  return (
    <div className="suggestion-card">

      <h2>💡 ATS Suggestions</h2>

      {suggestions.length === 0 ? (
        <p>No suggestions available.</p>
      ) : (
        <ul>
          {suggestions.map((item, index) => (
            <li key={index}>✅ {item}</li>
          ))}
        </ul>
      )}

    </div>
  );
}

export default SuggestionCard;