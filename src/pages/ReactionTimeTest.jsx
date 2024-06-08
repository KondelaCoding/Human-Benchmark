import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReactionTimeImage from "../assets/reaction-time-test.svg";
import Clock from "../assets/clock.svg";
import Trophy from "../assets/trophy.svg";
import ThreeDots from "../assets/three-dots.svg";
import "./ReactionTimeTest.css";
import React, { useEffect, useState } from "react";

export default function ReactionTimeTest() {
  const [isClicked, setIsClicked] = useState(false);
  const [isEverStarted, setIsEverStarted] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [score, setScore] = useState(1);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  function GoodResultScreen() {
    return (
      <>
        <div className="reaction-time-test-container" onClick={startTest}>
          <img
            className="good-result-test-image"
            src={Trophy}
            alt="trophy-image"
          />
          <h1 className="wait-test-title">GOOD {score}</h1>
        </div>
      </>
    );
  }

  function BadResultScreen() {
    return (
      <>
        <div className="reaction-time-test-container" onClick={startTest}>
          <img
            className="bad-result-test-image"
            src={Clock}
            alt="clock-image"
          />
          <h1 className="bad-result-test-title">You clicked too soon</h1>
        </div>
      </>
    );
  }

  function StartScreenState() {
    return (
      <>
        <div className="reaction-time-test-container" onClick={startTest}>
          <img
            className="start-test-image"
            src={ReactionTimeImage}
            alt="reaction-time-image"
          />
          <h1 className="start-test-title">Reaction Time</h1>
          <p className="start-test-description">
            Simple task to test your reaction time, wait for the screen to turn
            green and click it as fast as possible. Good luck!
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
          <img
            className="wait-test-image"
            src={ThreeDots}
            alt="three-dots-image"
          />
          <h1 className="wait-test-title">Wait for green</h1>
        </div>
      </>
    );
  }

  function startTest() {
    setIsEverStarted(true);
    setIsStarted(true);
    setStartTime(Date.now());
  }

  function calcResult() {
    setIsStarted(false);
    setEndTime(Date.now());
  }

  useEffect(() => {
    setScore(endTime - startTime);
  }, [endTime, startTime]);

  return (
    <>
      <Navbar />
      {!isEverStarted ? <StartScreenState /> : null}
      {isStarted ? <StartedGameScreenState /> : null}
      {!isStarted && isEverStarted ? (
        score > 0 ? (
          <GoodResultScreen />
        ) : (
          <BadResultScreen />
        )
      ) : null}
      {startTime}
      <br />
      {endTime}
      <br />
      {score}
      <Footer />
    </>
  );
}
