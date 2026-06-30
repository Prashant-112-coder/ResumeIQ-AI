import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        📄 ResumeIQ <span>AI</span>
      </div>

      <div className="menu">
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;