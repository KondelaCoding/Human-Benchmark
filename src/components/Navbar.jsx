import Logo from "../assets/Logo.png";
import "./Navbar.css";

export default function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-left">
            <img src={Logo} alt="logo" id="logo-home" />
            <a href="https://www.google.com" className="nav-item">
              Home
            </a>
            <a href="https://www.google.com" className="nav-item">
              About
            </a>
            <a href="https://www.google.com" className="nav-item">
              Contact
            </a>
          </div>
          <div className="nav-right">
            <a href="https://www.google.com" className="nav-item">
              Support
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
