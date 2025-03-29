import "./Tests.css";
import ReactionTimeTest from "../assets/reaction-time/reaction-time-test.svg";
import SequenceMemoryTest from "../assets/sequence-memory-test.svg";
import AimTrainerTest from "../assets/aim-trainer-test.svg";
import NumberMemoryTest from "../assets/number-memory-test.svg";
import VerbalMemoryTest from "../assets/verbal-memory-test.svg";

export default function Tests() {
  return (
    <div className="tests-card">
      <div className="tests-container">
        {/* br is for wip to be positioned correctly */}
        <a href="/reactiontime">
          <div id="reaction-time" className="tests-item">
            <img src={ReactionTimeTest} alt="test-image" />
            <h3 className="test-title">Reaction Time</h3>
            <p className="test-description">Test your visual reflexes.</p>
          </div>
        </a>
        <a href="/sequencememory">
          <div id="sequence-memory" className="tests-item">
            <img src={SequenceMemoryTest} alt="test-image" />
            <h3 className="test-title">Sequence Memory</h3>
            <p className="test-description">Remember an increasingly long pattern of button presses.</p>
          </div>
        </a>
        <a href="/aimtrainer">
          <div id="aim-trainer" className="tests-item">
            <img src={AimTrainerTest} alt="test-image" />
            <h3 className="test-title">Aim Trainer</h3>
            <p className="test-description">
              How quickly can you hit all the targets? <br /> <br />
            </p>
          </div>
        </a>
        <a href="/numbermemory">
          <div id="number-memory" className="tests-item wip">
            <img src={NumberMemoryTest} alt="test-image" />
            <h3 className="test-title">Number Memory</h3>
            <p className="test-description">
              Remember the longest number you can. <br /> <br />
            </p>
          </div>
        </a>
        <a href="/verbalmemory">
          <div id="verbal-memory" className="tests-item wip">
            <img src={VerbalMemoryTest} alt="test-image" />
            <h3 className="test-title">Verbal Memory</h3>
            <p className="test-description">Keep as many words in short term memory as possible.</p>
          </div>
        </a>
        <a href="/chimptest">
          <div id="chimp-test" className="tests-item wip">
            <img src={SequenceMemoryTest} alt="test-image" />
            <h3 className="test-title">Chimp Test</h3>
            <p className="test-description">
              Are you smarter than a chimpanzee? <br /> <br />
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}
