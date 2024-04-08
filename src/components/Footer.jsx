import "./Footer.css";
import GithubLogo from "../assets/github-logo.svg";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="logo-container">
        <a href="https://github.com/KondelaCoding">
          <img src={GithubLogo} alt="github-logo" className="logo" />
        </a>
      </div>
      <div className="copyright">
        <p>
          Copyright &#169;{currentYear}; Original site{" "}
          <a href="https://humanbenchmark.com">humanbenchmark.com</a>
        </p>
      </div>
    </footer>
  );
}
