import "./SkillsCard.css";

function SkillsCard({ skills = [] }) {
  return (
    <div className="skills-card">

      <h2>💻 Skills Found</h2>

      <div className="skills-container">

        {skills.map((skill,index)=>(
            <span
                key={index}
                className="skill-badge"
            >
                {skill}
            </span>
        ))}

      </div>

    </div>
  );
}

export default SkillsCard;