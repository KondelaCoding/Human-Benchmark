import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VerbalMemoryTestImage from "../assets/verbal-memory-test.svg";
import "./VerbalMemoryTest.css";
import { useEffect, useState, useRef } from "react";
import ClickSound from "../assets/click-sound.wav";
import SuccessSound from "../assets/success-sound.wav";
import FailureSound from "../assets/failure-sound.wav";
import words from "../data/words.json";

const wordsList = words.words;

//TODO: fix sounds

//? GAME STATES
//* 1. Start Screen
//! 2. Word Screen
//! 3. Good Job Screen
//! 4. Game Over Screen

const VerbalMemoryTest = () => {
  const [score, setScore] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [shownWord, setShownWord] = useState("");
  const [shownWordsArr, setShownWordsArr] = useState([]);
  const [showGameOverScreen, setShowGameOverScreen] = useState(false);
  const [message, setMessage] = useState("");

  const clickSound = new Audio(ClickSound);
  const successSound = new Audio(SuccessSound);
  const failureSound = new Audio(FailureSound);
  clickSound.volume = 0.5;
  successSound.volume = 0.5;
  failureSound.volume = 0.5;

  const startGame = () => {
    clickSound.play();
    setIsStarted(true);
    setScore(0);
    setShownWord(generateRandomWord());
    setShownWordsArr([]);
  };

  const generateRandomWord = () => {
    const randomWord = wordsList[Math.floor(Math.random() * wordsList.length)];
    return randomWord;
  };

  const checkUserInput = (userInput) => {
    switch (userInput) {
      case "new":
        if (!shownWordsArr.includes(shownWord)) {
          setScore((prev) => prev + 1);
          successSound.play();
          setShownWordsArr((prev) => [...prev, shownWord]);
        } else {
          gameOver();
          setMessage("You already saw this word");
          failureSound.play();
        }
        break;
      case "seen":
        if (shownWordsArr.includes(shownWord)) {
          setScore((prev) => prev + 1);
          successSound.play();
        } else {
          gameOver();
          setMessage("You haven't seen this word");
          failureSound.play();
        }
        break;
      default:
        break;
    }
    setShownWord(generateRandomWord());
  };

  const gameOver = () => {
    setIsStarted(false);
    setShowGameOverScreen(true);
  };

  const StartScreenState = () => {
    return (
      <div className="banner" onClick={startGame}>
        <img src={VerbalMemoryTestImage} alt="numbers" />
        <h1 className="title">Verbal Memory Test</h1>
        <p className="description">Test your memory by pointing out repeated words.</p>
        <h1 className="instruction">Click the screen to begin</h1>
      </div>
    );
  };

  const ShowWordScreenState = () => {
    return (
      <div className="banner">
        <h1 className="title">Have you seen this word?</h1>
        <p className="description">{shownWord}</p>
        <div className="button-container">
          <button className="btn" onClick={() => checkUserInput("new")}>
            New
          </button>
          <button className="btn" onClick={() => checkUserInput("seen")}>
            Seen
          </button>
        </div>
        <h1>Score: {score}</h1>
      </div>
    );
  };

  const GameOverScreenState = () => {
    return (
      <div className="banner bg-red">
        <h1 className="title">Game Over</h1>
        <p className="description">{message}</p>
        <p className="description">Your score: {score}</p>
        <button className="btn" onClick={startGame}>
          Restart
        </button>
      </div>
    );
  };

  const renderGameState = () => {
    if (isStarted) {
      return <ShowWordScreenState />;
    } else if (showGameOverScreen) {
      return <GameOverScreenState />;
    } else {
      return <StartScreenState />;
    }
  };

  return (
    <div className="screen-height">
      <Navbar />
      <div id="verbal-memory-test-container">{renderGameState()}</div>
      {shownWordsArr.join(" ")}
      <Footer />
    </div>
  );
};

export default VerbalMemoryTest;
