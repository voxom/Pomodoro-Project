import React, { useState } from "react";
import ChangeDuration from "./ChangeDuration";
import PlayPauseButtons from "./PlayPauseButtons";
import DisplayDuration from "./DisplayDuration";
import { Player } from "video-react";
import sample from "./sample.mp4";

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [session, setSession] = useState({ label: "", timeRemaining: "" });
  const initialActiveState = {
    focusDuration: 25,
    breakDuration: 5,
    sessionActive: false,
  };
  const [activeState, setActiveState] = useState({ ...initialActiveState });
  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          if (prevStateSession) {
            return {
              label: "Focusing",
              timeRemaining: activeState.focusDuration * 60,
            };
          }
          return prevStateSession;
        });
        setActiveState({ ...activeState, sessionActive: true });
      }
      return nextState;
    });
  }

  function stop() {
    setActiveState({ ...initialActiveState });
    setIsTimerRunning(false);
  }

  return (

    <div className="pomodoro">
      <ChangeDuration
        activeState={activeState}
        setActiveState={setActiveState}
        isTimerRunning={isTimerRunning}
      />
      <PlayPauseButtons
        playPause={playPause}
        stop={stop}
        activeState={activeState}
        isTimerRunning={isTimerRunning}
      />
      <DisplayDuration
        activeState={activeState}
        session={session}
        setSession={setSession}
        isTimerRunning={isTimerRunning}
      />
      <Player 
        src={sample}
        muted
        loop
        autoPlay
      />
    </div>
  );
}

export default Pomodoro;
