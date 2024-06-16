import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SequenceMemoryImage from "../assets/sequence-memory-test.svg";
import "./SequenceMemoryTest.css";

export default function ReactionTimeTest() {
  function StartScreen() {
    return (
      <div className="test-container">
        <img className="start-test-image" src={SequenceMemoryImage} alt="reaction-time-image" />
        <h1 className="start-test-title">Sequence Memory</h1>
        <p className="start-test-description">
          On 3x3 grid the squares will light up in a sequence. Try to remember the sequence. Good luck!
        </p>
        <h1 className="start-begin-instruction">Click the screen to begin</h1>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <StartScreen />
      <Footer />
    </>
  );
}
