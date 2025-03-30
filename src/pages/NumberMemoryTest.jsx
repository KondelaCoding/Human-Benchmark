import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NumberMemoryTestImage from "../assets/number-memory-test.svg";
import "./NumberMemoryTest.css";
import { useEffect, useState, useRef } from "react";
import ClickSound from "../assets/click-sound.wav";
import SuccessSound from "../assets/success-sound.wav";
import FailureSound from "../assets/failure-sound.wav";

//TODO: fix sounds

const NumberMemoryTest = () => {
  const [progress, setProgress] = useState(100);
  const [sequence, setSequence] = useState([]);
  const [score, setScore] = useState(0);
  const [isInputScreen, setIsInputScreen] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isEverStarted, setIsEverStarted] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [displayedScore, setDisplayedScore] = useState(0);

  const clickSound = new Audio(ClickSound);
  const successSound = new Audio(SuccessSound);
  const failureSound = new Audio(FailureSound);
  clickSound.volume = 0.5;
  successSound.volume = 0.5;
  failureSound.volume = 0.5;

  const inputRef = useRef(null);

  const startGame = () => {
    clickSound.play();
    setIsStarted(true);
    setIsEverStarted(true);
    setProgress(100);
    setScore(0);
    generateRandomNumberSequence(0);
    decreaseProgress();
  };

  const checkUserInput = () => {
    const userInput = inputRef.current.value.split("");
    if (userInput.length === sequence.length) {
      for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] !== sequence[i]) {
          setIsStarted(false);
          setIsInputScreen(false);
          return;
        }
      }
      setScore((prev) => prev + 1);
      setProgress(100);
      setDisplayedScore((prevScore) => prevScore + 1);
    } else {
      setIsStarted(false);
      setIsInputScreen(false);
      setUserInput(userInput);
      setScore(0);
    }
  };

  const nextStep = () => {
    setIsInputScreen(false);
    decreaseProgress();
    generateRandomNumberSequence();
  };

  useEffect(() => {
    if (progress === 0) {
      setIsInputScreen(true);
    }
  }, [progress]);

  const generateRandomNumberSequence = () => {
    const numbers = [];
    for (let i = 0; i < score + 1; i++) {
      numbers.push(Math.floor(Math.random() * 10).toString());
    }
    setSequence(numbers);
  };

  const decreaseProgress = () => {
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        setProgress((prevProgress) => {
          if (prevProgress <= 0) {
            return 0;
          }
          return prevProgress - 1;
        });
      }, i * 30);
    }
  };

  const StartScreenState = () => {
    return (
      <div className="banner" onClick={startGame}>
        <img src={NumberMemoryTestImage} alt="numbers" />
        <h1 className="title">Number Memory Test</h1>
        <p className="description">
          Test your memory by remembering the sequence of numbers that will be displayed on the screen.
        </p>
        <h1 className="instruction">Click the screen to begin</h1>
      </div>
    );
  };

  const NumberSequenceScreenState = () => {
    return (
      <div className="banner">
        <h1 className="title">Remember this sequence:</h1>
        <div className="number-sequence">
          {sequence.map((number, index) => (
            <h2 key={index} className="number">
              {number}
            </h2>
          ))}
        </div>
        <div className="progress-bar" style={{ width: `${progress * 2}px` }}></div>
      </div>
    );
  };

  const InputScreenState = () => {
    return (
      <div className="banner">
        <h1 className="title">Input the sequence</h1>
        <input type="text" className="sequence-input" ref={inputRef} />
        <button className="btn" onClick={checkUserInput}>
          Next
        </button>
      </div>
    );
  };

  const NextStepScreenState = () => {
    successSound.play();
    return (
      <div className="banner bg-green">
        <h1 className="title">Good job!</h1>
        <p className="description">You remembered the sequence correctly.</p>
        <button className="btn" onClick={nextStep}>
          Next
        </button>
      </div>
    );
  };

  const GameOverScreenState = () => {
    failureSound.play();
    return (
      <div className="banner bg-red">
        <h1 className="title">Game Over</h1>
        <p className="description">You remembered the sequence incorrectly.</p>
        <p className="description">
          The correct sequence was: <br />
          <b>{sequence.join(" ")}</b>
        </p>
        <p className="description">
          You answered: <br />
          <b>{userInput.join(" ")}</b>
        </p>
        <p className="description">Your score: {displayedScore}</p>
        <button className="btn" onClick={startGame}>
          Restart
        </button>
      </div>
    );
  };

  const renderGameState = () => {
    if (!isStarted) {
      if (isEverStarted) {
        return <GameOverScreenState />;
      } else {
        return <StartScreenState />;
      }
    }

    if (isInputScreen) {
      if (!progress) {
        return <InputScreenState />;
      } else {
        return <NextStepScreenState />;
      }
    }

    return <NumberSequenceScreenState />;
  };

  return (
    <div className="screen-height">
      <Navbar />
      <div id="number-memory-test-container">{renderGameState()}</div>
      <Footer />
    </div>
  );
};

export default NumberMemoryTest;
