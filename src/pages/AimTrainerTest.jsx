import { useEffect, useState, useRef } from "react";
import "../index.css";
import "./AimTrainerTest.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AimTrainerTestImage from "../assets/aim-trainer-test.svg";
import ShotSound from "../assets/aim-trainer/shot-sound.mp3";
import SuccessSound from "../assets/success-sound.wav";

const AimTrainerTest = () => {
  const [semiScore, setSemiScore] = useState(0);
  const [shotTargets, setShotTargets] = useState([]);
  const [ocupiedBlocks, setOcupiedBlocks] = useState([]);
  const [finalTime, setFinalTime] = useState(null); // Final time when the score reaches 10
  const [isStarted, setIsStarted] = useState(false); // To control the game state
  const [isEverStarted, setIsEverStarted] = useState(false); // To control the game state

  const timerRef = useRef(0); // Ref to track the timer value
  const intervalRef = useRef(null); // Ref to store the interval ID

  const startGame = () => {
    setIsStarted(true); // Start the game
    setIsEverStarted(true); // Set the game as ever started
    setShotTargets([]); // Reset shot targets
    setSemiScore(0); // Reset score
    setOcupiedBlocks([]); // Reset occupied blocks
    setFinalTime(null); // Reset final time
    randomizeTargets(); // Randomize targets
    startTimer(); // Start the timer
  };

  const startTimer = () => {
    timerRef.current = 0; // Reset the timer
    intervalRef.current = setInterval(() => {
      timerRef.current += 10; // Increment timer by 10ms
    }, 10);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current); // Clear the interval
    setFinalTime(timerRef.current); // Save the final timer value
    const successSound = new Audio(SuccessSound);
    successSound.volume = 0.5;
    successSound.play();
  };

  const randomizeTargets = () => {
    let newOcupiedBlocks = [];
    while (newOcupiedBlocks.length < 10) {
      const randomBlock = Math.floor(Math.random() * 30) + 1;
      if (!newOcupiedBlocks.includes(randomBlock)) {
        newOcupiedBlocks.push(randomBlock);
      }
    }
    setOcupiedBlocks(newOcupiedBlocks);
  };

  const handleShootTarget = (targetNumber) => () => {
    const shotSound = new Audio(ShotSound);
    shotSound.volume = 0.5;
    shotSound.play();

    setShotTargets((prev) => [...prev, targetNumber]);
    setSemiScore((prev) => prev + 1);
  };

  useEffect(() => {
    if (semiScore >= 10) {
      setIsStarted(false); // End the game
      stopTimer(); // Stop the timer when the score reaches 10
    }
  }, [semiScore]);

  const StartScreen = () => {
    return (
      <div onClick={startGame} className="test-container">
        <img src={AimTrainerTestImage} alt="aim-icon" className="start-test-image" />
        <h1 className="wait-test-title">Aim Trainer Test</h1>
        <p className="wait-test-desciption">Click on the targets as fast as you can!</p>
        <h1 className="start-begin-instruction">Click the screen to begin</h1>
      </div>
    );
  };

  const EndScreen = () => {
    return (
      <div className="test-container end-screen" onClick={startGame}>
        <h1 className="wait-test-title">You did it!</h1>
        <p className="wait-test-description">Your time: {(finalTime / 1000).toFixed(2)} seconds</p>
        <h1 className="start-begin-instruction">Click the screen to retry</h1>
      </div>
    );
  };

  const GameScreen = () => {
    return (
      <div className="test-container">
        <div className="aim-grid">
          {Array.from({ length: 10 }, (_, index) => (
            <img
              key={index}
              src={AimTrainerTestImage}
              alt={`aim-${index + 1}`}
              className={`aim-icon ${shotTargets.includes(index + 1) ? "shot" : ""} grid-block-${ocupiedBlocks[index]}`}
              id={`aim-${index + 1}`}
              onClick={handleShootTarget(index + 1)}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="screen-height">
      <Navbar />
      {isStarted ? <GameScreen /> : isEverStarted ? <EndScreen /> : <StartScreen />}
      <Footer />
    </div>
  );
};

export default AimTrainerTest;
