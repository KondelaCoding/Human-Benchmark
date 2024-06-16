import Logo from "../assets/logo.png";
import "./Navbar.css";

export default function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-left">
            <a href="/home">
              <img src={Logo} alt="logo" id="logo-home" />
            </a>
            <a href="/home" className="nav-item">
              <span>Home</span>
              <hr className="underline" />
            </a>
            <a href="/about" className="nav-item">
              <span>About</span>
              <hr className="underline" />
            </a>
            <a href="contact" className="nav-item">
              <span>Contact</span>
              <hr className="underline" />
            </a>
          </div>
          <div className="nav-right">
            <a href="/support" className="nav-item">
              <span>Support</span>
              <hr className="underline" />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
