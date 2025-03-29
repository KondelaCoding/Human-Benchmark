import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReactionTimeImage from "../assets/reaction-time/reaction-time-test.svg";
import Clock from "../assets/reaction-time/clock.svg";
import Trophy from "../assets/reaction-time/trophy.svg";
import ThreeDots from "../assets/reaction-time/three-dots.svg";
import "./ReactionTimeTest.css";
import { useEffect, useState } from "react";

export default function ReactionTimeTest() {
  const [isEverStarted, setIsEverStarted] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [score, setScore] = useState(1);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [delay, setDelay] = useState(0);
  const [timeoutID, setTimeoutID] = useState(0);

  function GoodResultScreen() {
    return (
      <>
        <div className="reaction-time-test-container" onClick={startTest}>
          <img className="good-result-test-image" src={Trophy} alt="trophy-image" />
          <h1 className="wait-test-title">Score: {score}ms</h1>
        </div>
      </>
    );
  }

  function BadResultScreen() {
    return (
      <>
        <div className="reaction-time-test-container red" onClick={startTest}>
          <img className="bad-result-test-image" src={Clock} alt="clock-image" />
          <h1 className="bad-result-test-title">You clicked too soon</h1>
        </div>
      </>
    );
  }

  function StartScreenState() {
    return (
      <>
        <div className="reaction-time-test-container" onClick={startTest}>
          <img className="start-test-image" src={ReactionTimeImage} alt="reaction-time-image" />
          <h1 className="start-test-title">Reaction Time</h1>
          <p className="start-test-description">
            Simple task to test your reaction time, wait for the screen to turn green and click it as fast as possible.
            Good luck!
          </p>
          <h1 className="start-begin-instruction">Click the screen to begin</h1>
        </div>
      </>
    );
  }

  function StartedGameScreenState() {
    return (
      <>
        <div className="reaction-time-test-container" onClick={calcResult}>
          <img className="wait-test-image" src={ThreeDots} alt="three-dots-image" />
          <h1 className="wait-test-title">Wait for green</h1>
        </div>
      </>
    );
  }

  function startTest() {
    setIsEverStarted(true);
    setIsStarted(true);
    setStartTime(Date.now());
    const randomDelay = Math.floor(Math.random() * 5000) + 2000;
    setDelay(randomDelay);
    setTimeoutID(
      setTimeout(() => {
        document.querySelector(".reaction-time-test-container").style.backgroundColor = "green";
      }, randomDelay)
    );
  }

  function calcResult() {
    clearTimeout(timeoutID);
    setIsStarted(false);
    setEndTime(Date.now());
  }

  useEffect(() => {
    setScore(endTime - startTime - delay - 100);
  }, [endTime, startTime]);

  return (
    <div className="screen-height">
      <Navbar />
      {!isEverStarted ? <StartScreenState /> : null}
      {isStarted ? <StartedGameScreenState /> : null}
      {!isStarted && isEverStarted ? score > 0 ? <GoodResultScreen /> : <BadResultScreen /> : null}
      <Footer />
    </div>
  );
}
