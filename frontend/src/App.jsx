import { useMemo, useRef, useState } from "react";
import axios from "axios";
import {
  FiActivity, FiArrowRight, FiBell, FiBookOpen, FiBriefcase, FiCheckCircle,
  FiChevronRight, FiClock, FiCloudUpload, FiCopy, FiEdit3, FiFileText,
  FiGrid, FiHelpCircle, FiHome, FiKey, FiLayers, FiLogOut, FiMenu, FiMoreVertical,
  FiPlus, FiSearch, FiSettings, FiShield, FiZap, FiTarget, FiTrendingUp,
  FiUploadCloud, FiUser, FiX
} from "react-icons/fi";

const navItems = [
  ["Dashboard", FiHome], ["My Resumes", FiFileText], ["ATS Score", FiActivity],
  ["AI Analyzer", FiZap], ["Templates", FiLayers], ["Cover Letter", FiEdit3],
  ["Job Matcher", FiTarget], ["Profile", FiUser], ["Settings", FiSettings]
];

const templates = ["Modern 01", "Modern 02", "Professional 01", "Professional 02", "Minimal 01", "Creative 01"];

function App() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState("Dashboard");
  const [mobileNav, setMobileNav] = useState(false);
  const inputRef = useRef(null);

  const score = Number(analysis?.score || 92);
  const skills = analysis?.skills || ["JavaScript", "React", "Node.js", "TypeScript", "Python", "Git", "REST APIs"];
  const missing = analysis?.missingSkills || ["Docker", "Kubernetes", "CI/CD", "AWS"];
  const suggestions = analysis?.suggestions || [
    "Add quantified achievements to your experience section.",
    "Include more role-specific keywords from the target job.",
    "Make your summary more concise and results-driven."
  ];

  const uploadResume = async () => {
    if (!file) return inputRef.current?.click();
    const formData = new FormData();
    formData.append("file", file);
    try {
      setLoading(true);
      const response = await axios.post("http://127.0.0.1:8000/upload", formData);
      setAnalysis(response.data);
      setPage("ATS Score");
    } catch (error) {
      console.error(error);
      alert("Upload failed. Please make sure the backend is running on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  const onFile = (event) => {
    const selected = event.target.files?.[0];
    if (selected) setFile(selected);
  };

  const scoreLabel = useMemo(() => score >= 85 ? "Excellent" : score >= 70 ? "Good" : score >= 55 ? "Average" : "Needs Work", [score]);

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNav ? "open" : ""}`}>
        <div className="brand" onClick={() => setPage("Dashboard")}>
          <span className="brand-mark"><FiZap /></span>
          <span>ResumeIQ<span>-AI</span></span>
        </div>
        <div className="sidebar-label">Workspace</div>
        <nav>
          {navItems.map(([label, Icon]) => (
            <button key={label} className={`nav-item ${page === label ? "active" : ""}`} onClick={() => { setPage(label); setMobileNav(false); }}>
              <Icon /><span>{label}</span>{page === label && <FiChevronRight className="nav-arrow" />}
            </button>
          ))}
        </nav>
        <div className="upgrade-card">
          <div className="upgrade-icon"><FiZap /></div>
          <strong>Upgrade to Pro</strong>
          <p>Unlock unlimited scans, AI suggestions & more.</p>
          <button>Upgrade Now <FiArrowRight /></button>
        </div>
        <div className="profile-mini">
          <div className="avatar">PS</div>
          <div><strong>Prashant S</strong><span>prashant@example.com</span></div>
          <FiMoreVertical />
        </div>
      </aside>

      {mobileNav && <div className="sidebar-backdrop" onClick={() => setMobileNav(false)} />}

      <main className="main-content">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileNav(true)}><FiMenu /></button>
          <div className="mobile-brand"><span className="brand-mark"><FiZap /></span>ResumeIQ-AI</div>
          <div className="topbar-spacer" />
          <button className="icon-btn"><FiSearch /></button>
          <button className="icon-btn notification"><FiBell /><i /></button>
          <button className="primary-btn small" onClick={() => { setPage("Dashboard"); setTimeout(() => inputRef.current?.click(), 0); }}><FiPlus /> Analyze New Resume</button>
        </header>

        {page === "Dashboard" && (
          <Dashboard page={page} setPage={setPage} score={score} scoreLabel={scoreLabel} skills={skills} missing={missing} suggestions={suggestions} file={file} setFile={setFile} loading={loading} uploadResume={uploadResume} inputRef={inputRef} onFile={onFile} />
        )}
        {page === "My Resumes" && <ResumeLibrary setPage={setPage} file={file} score={score} />}
        {page === "ATS Score" && <AnalysisPage score={score} scoreLabel={scoreLabel} skills={skills} missing={missing} suggestions={suggestions} file={file} setPage={setPage} />}
        {page === "AI Analyzer" && <SuggestionsPage suggestions={suggestions} setPage={setPage} />}
        {page === "Templates" && <TemplatesPage setPage={setPage} />}
        {page === "Cover Letter" && <EmptyFeature icon={FiEdit3} title="AI Cover Letter" text="Create a tailored cover letter from your resume and target job description." action="Create Cover Letter" />}
        {page === "Job Matcher" && <EmptyFeature icon={FiTarget} title="Smart Job Matcher" text="Compare your resume with job descriptions and discover roles where you are a strong match." action="Match a Job" />}
        {page === "Profile" && <ProfilePage />}
        {page === "Settings" && <SettingsPage />}
      </main>
    </div>
  );
}

function Dashboard({ setPage, score, scoreLabel, skills, missing, suggestions, file, setFile, loading, uploadResume, inputRef, onFile }) {
  return <div className="page-wrap fade-in">
    <section className="welcome-row"><div><div className="eyebrow">AI-POWERED CAREER ASSISTANT</div><h1>Welcome back, Prashant! <span>👋</span></h1><p>Let&apos;s build a resume that gets you hired.</p></div><div className="date-pill"><FiClock /> Updated today</div></section>
    <section className="hero-banner">
      <div><span className="hero-chip"><FiZap /> AI-powered resume optimization</span><h2>Build a resume<br />that <em>gets you hired.</em></h2><p>Analyze, optimize and score your resume with intelligent ATS insights and actionable AI recommendations.</p><div className="hero-actions"><button className="primary-btn" onClick={() => inputRef.current?.click()}><FiUploadCloud /> Optimize My Resume</button><button className="ghost-btn" onClick={() => setPage("Templates")}>View Templates</button></div></div>
      <div className="resume-orb"><div className="resume-sheet"><div className="resume-avatar" /><b>YOUR NAME</b><small>FULL STACK DEVELOPER</small><div className="fake-line long" /><div className="fake-line" /><div className="fake-line medium" /><div className="skill-dots"><i/><i/><i/><i/><i/><i/></div></div><div className="score-orb"><strong>{score}</strong><span>ATS SCORE</span></div></div>
      <div className="hero-glow" />
    </section>
    <input ref={inputRef} type="file" accept="application/pdf,.doc,.docx" hidden onChange={onFile} />
    <section className="quick-tools"><button onClick={() => setPage("ATS Score")}><FiShield /><span>ATS Score Checker</span><FiArrowRight /></button><button onClick={() => setPage("AI Analyzer")}><FiZap /><span>AI Suggestions</span><FiArrowRight /></button><button onClick={() => setPage("Job Matcher")}><FiTarget /><span>Job Match Analysis</span><FiArrowRight /></button></section>
    {file && <div className="file-ready"><FiCheckCircle /><div><strong>{file.name}</strong><span>Ready to analyze</span></div><button className="primary-btn small" onClick={uploadResume} disabled={loading}>{loading ? "Analyzing..." : "Analyze Resume"}</button><button onClick={() => setFile(null)}><FiX /></button></div>}
    <section className="stats-grid"><Stat icon={FiShield} label="ATS Score" value={score} suffix="/100" badge={scoreLabel} progress={score} /><Stat icon={FiFileText} label="Resumes Analyzed" value="24" trend="+12 this month" /><Stat icon={FiTarget} label="Job Matches" value="18" badge="High Match" trend="+8 this month" /><Stat icon={FiTrendingUp} label="Profile Strength" value="85" suffix="%" badge="Strong" progress={85} /></section>
    <section className="content-grid"><div className="panel recent-panel"><div className="panel-head"><div><h3>Recent Resumes</h3><p>Your latest resume analyses</p></div><button onClick={() => setPage("My Resumes")}>View all <FiArrowRight /></button></div><ResumeRow name="Software Engineer Resume.pdf" date="Analyzed today" value={score} label={scoreLabel} /><ResumeRow name="Frontend Developer Resume.pdf" date="Analyzed 2 days ago" value="78" label="Good" /><ResumeRow name="Full Stack Developer Resume.pdf" date="Analyzed 6 days ago" value="65" label="Average" /></div><div className="side-stack"><div className="panel tip-panel"><div className="tip-icon"><FiZap /></div><span className="section-kicker">AI TIP OF THE DAY</span><h3>Make your impact measurable.</h3><p>Use action verbs and quantify achievements to make your resume stand out.</p><button onClick={() => setPage("AI Analyzer")}>Explore AI tips <FiArrowRight /></button></div><div className="panel help-panel"><FiHelpCircle /><div><h4>Need help?</h4><p>Check our guide to improve your resume score.</p><button>View Guide</button></div></div></div></section>
    <section className="trusted"><span>Trusted by ambitious job seekers</span><div><b>Google</b><b>Microsoft</b><b>amazon</b><b>Adobe</b><b>Infosys</b><b>TCS</b></div></section>
    <div className="hidden-data" aria-hidden="true">{skills.join(",")} {missing.join(",")} {suggestions.join(" ")}</div>
  </div>;
}

function Stat({ icon: Icon, label, value, suffix, badge, trend, progress }) { return <div className="stat-card"><div className="stat-top"><span className="stat-icon"><Icon /></span>{progress ? <div className="mini-ring" style={{ "--p": `${progress * 3.6}deg` }}><span>{value}{suffix}</span></div> : <FiTrendingUp className="trend-icon" />}</div><span className="stat-label">{label}</span><div className="stat-value">{value}<small>{suffix}</small></div>{badge ? <span className="success-badge">{badge}</span> : <span className="stat-trend">{trend}</span>}</div>; }
function ResumeRow({ name, date, value, label }) { return <div className="resume-row"><div className="file-icon"><FiFileText /></div><div className="resume-name"><strong>{name}</strong><span>{date}</span></div><div className="row-score"><strong>{value}</strong><span>{label}</span></div><button className="outline-btn">View Report</button><FiMoreVertical className="more" /></div>; }

function ResumeLibrary({ setPage, file, score }) { return <PageFrame title="My Resumes" subtitle="Manage and review every resume you have analyzed."><div className="library-actions"><div className="search-box"><FiSearch /><input placeholder="Search resumes..." /></div><button className="primary-btn"><FiUploadCloud /> Upload Resume</button></div><div className="resume-cards"><ResumeRow name={file?.name || "Software Engineer Resume.pdf"} date="Latest analysis" value={score} label="Excellent" /><ResumeRow name="Frontend Developer Resume.pdf" date="Analyzed 2 days ago" value="78" label="Good" /><ResumeRow name="Full Stack Developer Resume.pdf" date="Analyzed 6 days ago" value="65" label="Average" /><ResumeRow name="Data Analyst Resume.pdf" date="Analyzed 1 week ago" value="88" label="Very Good" /></div><div className="empty-callout"><FiCopy /><div><h3>Keep your versions organized</h3><p>Upload tailored resumes for different roles and compare their ATS performance.</p></div><button onClick={() => setPage("Templates")}>Browse templates <FiArrowRight /></button></div></PageFrame>; }

function AnalysisPage({ score, scoreLabel, skills, missing, suggestions, file }) { return <PageFrame title="Resume Analysis Result" subtitle={file ? `Analysis for ${file.name}` : "Upload a resume to get a personalized ATS report."}><div className="analysis-hero panel"><div className="resume-preview"><div className="preview-title">YOUR NAME</div><div className="preview-sub">FULL STACK DEVELOPER</div>{Array.from({ length: 9 }).map((_, i) => <div className={`fake-line ${i % 3 === 0 ? "long" : ""}`} key={i} />)}</div><div className="big-score"><div className="score-ring"><span>{score}</span><small>/100</small></div><div><span className="score-status">{scoreLabel}</span><h2>Your resume is ATS-ready.</h2><p>Strong structure and relevant skills. A few targeted improvements can increase your match rate.</p></div></div></div><div className="breakdown-grid"><div className="panel"><PanelTitle title="Score Breakdown" /><Bar label="Content" value={95} /><Bar label="Structure" value={90} /><Bar label="Skills" value={94} /><Bar label="Experience" value={88} /><Bar label="Overall" value={score} /></div><div className="panel"><PanelTitle title="ATS Strengths" /><Checklist items={["Good use of keywords", "Clear section structure", "Relevant skills included", "Achievements are measurable"]} /><PanelTitle title="Areas to improve" /><Checklist items={missing.slice(0, 4)} warning /></div></div><div className="panel keyword-panel"><PanelTitle title="Keyword Match" action="85% match" /><div className="chips">{skills.map((s) => <span key={s}>{s}</span>)}<span>+12 more</span></div><div className="match-bar"><i style={{ width: "85%" }} /></div></div><div className="analysis-note"><FiZap /><span><strong>You&apos;re 82% optimized for ATS.</strong> Keep up the great work!</span></div><div className="page-actions"><button className="outline-btn"><FiCopy /> Download Report</button><button className="primary-btn"><FiZap /> Apply AI Improvements</button></div><div className="hidden-data">{suggestions.join(" ")}</div></PageFrame>; }
function Bar({ label, value }) { return <div className="bar-row"><span>{label}</span><div><i style={{ width: `${value}%` }} /></div><b>{value}/100</b></div>; }
function Checklist({ items, warning }) { return <div className="check-list">{items.map((x, i) => <div key={i}><span className={warning ? "warning-dot" : "check-dot"}>{warning ? "!" : "✓"}</span>{x}</div>)}</div>; }
function PanelTitle({ title, action }) { return <div className="panel-title"><h3>{title}</h3>{action && <span>{action}</span>}</div>; }

function SuggestionsPage({ suggestions, setPage }) { const extended = [...suggestions, "Add relevant certifications or technical projects.", "Move your strongest experience bullets higher.", "Tailor your headline to your target role."]; return <PageFrame title="AI Suggestions" subtitle="Actionable improvements generated from your resume"><div className="suggestion-tabs"><button className="active">All Suggestions</button><button>Content</button><button>Skills</button><button>Structure</button><button>Keywords</button></div><div className="suggestion-list">{extended.map((text, i) => <div className="suggestion-card" key={i}><div className="suggestion-number">{i + 1}</div><div className="suggestion-copy"><div><span className={i === 0 ? "impact high" : "impact"}>{i === 0 ? "HIGH IMPACT" : "MEDIUM IMPACT"}</span><h3>{text}</h3></div><p>{i === 0 ? "Add numbers to your achievements to show measurable impact. Example: Increased website performance by 40%." : "This change can improve clarity, keyword relevance and ATS compatibility."}</p></div><button className="outline-btn" onClick={() => setPage("ATS Score")}>View suggestion</button></div>)}</div><button className="primary-btn full"><FiZap /> Apply All AI Suggestions</button></PageFrame>; }

function TemplatesPage({ setPage }) { return <PageFrame title="Choose a Template" subtitle="Start with a professionally designed, ATS-friendly layout."><div className="template-filters"><button className="active">All</button><button>Modern</button><button>Professional</button><button>Minimal</button><button>Creative</button></div><div className="template-grid">{templates.map((name, i) => <div className={`template-card ${i === 0 ? "selected" : ""}`} key={name}><div className="template-preview"><div className="tp-sidebar" /><div className="tp-body"><b>YOUR NAME</b><span /><span /><span className="short" /><div className="tp-block" /><div className="tp-block" /></div>{i === 0 && <div className="selected-check"><FiCheckCircle /></div>}</div><strong>{name}</strong><small>ATS-friendly • A4</small></div>)}</div><button className="primary-btn full" onClick={() => setPage("Dashboard")}>Use This Template <FiArrowRight /></button></PageFrame>; }

function ProfilePage() { return <PageFrame title="Profile" subtitle="Keep your career profile ready for smarter recommendations."><div className="profile-layout"><div className="panel profile-card"><div className="large-avatar">PS</div><h2>Prashant S</h2><p>Full Stack Developer</p><button className="outline-btn"><FiEdit3 /> Edit profile</button></div><div className="panel form-card"><PanelTitle title="Professional details" /><label>Full name<input value="Prashant S" readOnly /></label><label>Target role<input value="Full Stack Developer" readOnly /></label><label>Experience level<select defaultValue="Mid-level"><option>Entry level</option><option>Mid-level</option><option>Senior</option></select></label><label>Top skills<input value="React, Node.js, JavaScript, Python" readOnly /></label></div></div></PageFrame>; }
function SettingsPage() { return <PageFrame title="Settings" subtitle="Control your ResumeIQ-AI experience."><div className="settings-list panel"><Setting icon={FiBell} title="Notifications" text="Get alerts when your resume analysis is complete." /><Setting icon={FiShield} title="Privacy & data" text="Manage how your resume data is handled." /><Setting icon={FiKey} title="Account security" text="Password and account access settings." /><Setting icon={FiLogOut} title="Sign out" text="Sign out from this device." danger /></div></PageFrame>; }
function Setting({ icon: Icon, title, text, danger }) { return <div className="setting"><span><Icon /></span><div><h3>{title}</h3><p>{text}</p></div><FiChevronRight className={danger ? "danger" : ""} /></div>; }
function EmptyFeature({ icon: Icon, title, text, action }) { return <div className="page-wrap feature-page fade-in"><div className="feature-card panel"><div className="feature-icon"><Icon /></div><span className="eyebrow">COMING TO YOUR WORKFLOW</span><h1>{title}</h1><p>{text}</p><button className="primary-btn">{action} <FiArrowRight /></button></div></div>; }
function PageFrame({ title, subtitle, children }) { return <div className="page-wrap fade-in"><div className="page-heading"><div><span className="eyebrow">RESUMEIQ-AI WORKSPACE</span><h1>{title}</h1><p>{subtitle}</p></div></div>{children}</div>; }

export default App;
