import Logo from "../assets/logo.png";
import "./Navbar.css";

export default function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-left">
            <img src={Logo} alt="logo" id="logo-home" />
            <a href="/home" className="nav-item">
              Home
            </a>
            <a href="/about" className="nav-item">
              About
            </a>
            <a href="contact" className="nav-item">
              Contact
            </a>
          </div>
          <div className="nav-right">
            <a href="/support" className="nav-item">
              Support
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
