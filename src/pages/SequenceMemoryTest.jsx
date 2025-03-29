import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SequenceMemoryImage from "../assets/sequence-memory-test.svg";
import "./SequenceMemoryTest.css";
import { useEffect, useState, useRef } from "react";

//* User starts a game
//* GAME LOOP
//? 1. Show a sequence of blocks
//! 2. User clicks the blocks in the same order
//! 3. If the user clicks the blocks in the same order, add a point and maybe a fancy animation
//! 4. If the user clicks the blocks in the wrong order, he looses a game
//! 5. Show the score and a button to play again
//! 6. If the user clicks the button, reset the game and start again

export default function ReactionTimeTest() {
  const [isEverStarted, setIsEverStarted] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);

  const startGame = () => {
    setIsStarted(true);
    setScore(0);
    setUserSequence([]);

    // Generate a new sequence
    const newSequence = [];
    for (let i = 0; i < 5; i++) {
      const randomBlock = Math.floor(Math.random() * 9) + 1;
      newSequence.push(randomBlock);
    }

    // Update the state and use the new sequence directly
    setTimeout(() => {
      console.log("show sequence", newSequence);
      showSequenceOfBlocks(newSequence); // Use the new sequence directly
      setSequence(newSequence);
    }, 1000);
  };

  const handleBlockClick = (blockNumber) => () => {
    console.log("block clicked", blockNumber);
    if (userSequence.length < sequence.length - 1) {
      setUserSequence((prev) => [...prev, blockNumber]);
    } else if (userSequence.length === sequence.length - 1) {
      disableAllBlocks();
      // Check if the user clicked the blocks in the same order
      userSequence.push(blockNumber); // Add the last clicked block
      if (userSequence.join("") === sequence.join("")) {
        setScore((prev) => prev + 1);
        setUserSequence([]);
        setTimeout(() => {
          const newBlock = Math.floor(Math.random() * 9) + 1;
          setSequence((prev) => [...prev, newBlock]);
          showSequenceOfBlocks([...sequence, newBlock]);
        }, 1000);
      } else {
        setIsStarted(false);
      }
    }
  };

  const disableAllBlocks = () => {
    const blocks = document.querySelectorAll(".block");
    console.log(blocks);
    blocks.forEach((block) => {
      block.classList.add("disabled");
    });
  };

  const enableAllBlocks = () => {
    const blocks = document.querySelectorAll(".block");
    blocks.forEach((block) => {
      block.classList.remove("disabled");
    });
  };

  const showSequenceOfBlocks = (array) => {
    disableAllBlocks();
    for (let i = 0; i < array.length; i++) {
      setTimeout(() => {
        const block = document.getElementById(`block-${array[i]}`);
        if (block) {
          block.classList.add("selected");
          setTimeout(() => {
            block.classList.remove("selected");
          }, 700);
        }
      }, i * 800);
    }
    // Enable the blocks after the sequence is shown
    setTimeout(() => {
      enableAllBlocks();
    }, array.length * 800 + 500);
  };

  const gameLogic = () => {
    if (isEverStarted) {
      if (isStarted) {
        return (
          <div className="test-container">
            {blockGrid()}
            <h1 className="wait-test-title">Score: {score}</h1>
          </div>
        );
      } else {
        return (
          <div className="test-container game-over" onClick={startGame}>
            <h1 className="wait-test-title">Game Over</h1>
            <h2 className="wait-test-desciption">Score: {score}</h2>
            <h1 className="start-begin-instruction">Click the screen to retry</h1>
          </div>
        );
      }
    } else {
      return <StartScreen />;
    }
  };

  useEffect(() => {
    if (isStarted) {
      setIsEverStarted(true);
    }
  }, [isStarted]);

  function StartScreen() {
    return (
      <div className="test-container" onClick={startGame}>
        <img className="start-test-image" src={SequenceMemoryImage} alt="reaction-time-image" />
        <h1 className="start-test-title">Sequence Memory</h1>
        <p className="start-test-description">
          On 3x3 grid the squares will light up in a sequence. Try to remember the sequence. Good luck!
        </p>
        <h1 className="start-begin-instruction">Click the screen to begin</h1>
      </div>
    );
  }

  const blockGrid = () => {
    return (
      <div className="block-grid">
        <div className="block disabled" id="block-1" onClick={handleBlockClick(1)}></div>
        <div className="block disabled" id="block-2" onClick={handleBlockClick(2)}></div>
        <div className="block disabled" id="block-3" onClick={handleBlockClick(3)}></div>
        <div className="block disabled" id="block-4" onClick={handleBlockClick(4)}></div>
        <div className="block disabled" id="block-5" onClick={handleBlockClick(5)}></div>
        <div className="block disabled" id="block-6" onClick={handleBlockClick(6)}></div>
        <div className="block disabled" id="block-7" onClick={handleBlockClick(7)}></div>
        <div className="block disabled" id="block-8" onClick={handleBlockClick(8)}></div>
        <div className="block disabled" id="block-9" onClick={handleBlockClick(9)}></div>
      </div>
    );
  };

  return (
    <div className="screen-height">
      <Navbar />
      {gameLogic()}
      <Footer />
    </div>
  );
}
