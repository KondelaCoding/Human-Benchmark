import LogoText from "../assets/logo-text.png";
import "./Header.css";

export default function Header() {
  function handleGetStarted() {
    window.scrollTo({
      top: 600,
      left: 0,
      behavior: "smooth",
    });
  }

  return (
    <div id="title-screen">
      <img id="logo-text-image" src={LogoText} alt="logo" />
      <h1 id="title">Human Benchmark</h1>
      <p>Test your brain skills in a number of different tasks</p>
      <button id="get-started-btn" className="btn" onClick={handleGetStarted}>
        Get Started
      </button>
    </div>
  );
}
