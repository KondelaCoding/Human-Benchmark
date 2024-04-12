import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReactionTimeImage from "../assets/reaction-time-test.svg";
import "./ReactionTimeTest.css";

export default function ReactionTimeTest() {
  return (
    <>
      <Navbar />
      <div className="reaction-time-test-container">
        <img
          className="test-image"
          src={ReactionTimeImage}
          alt="reaction-time-image"
        />
        <h1 className="test-title">Reaction Time</h1>
        <p className="test-description">
          Simple task to test your reaction time, wait for the screen to turn
          green and click it as fast as possible. Good luck!
        </p>
        <h1 className="begin-instruction">Click the screen to begin</h1>
      </div>
      <Footer />
    </>
  );
}
