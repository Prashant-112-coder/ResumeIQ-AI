import "./MissingSkills.css";

function MissingSkills({ skills = [] }) {
  return (
    <div className="missing-card">
      <h2>❌ Missing Skills</h2>

      <div className="missing-container">
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <span key={index} className="missing-badge">
              {skill}
            </span>
          ))
        ) : (
          <p>No missing skills found.</p>
        )}
      </div>
    </div>
  );
}

export default MissingSkills;