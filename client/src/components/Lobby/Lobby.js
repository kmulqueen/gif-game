import React from "react";

const Lobby = () => {
  const onReadyClick = () => {
    // Ready Player
    console.log("Player Ready");
  };
  return (
    <div>
      <h3>Ready Up</h3>
      <ul>
        <li>Ready Player</li>
        <li>Ready Player</li>
        <li>Ready Player</li>
      </ul>
      <div className="dashboard">
        Dashboard
        <ul>
          <li>Player in lobby</li>
          <li>Player in lobby</li>
          <li>Player in lobby</li>
        </ul>
        <button onClick={onReadyClick}>Ready</button>
      </div>
    </div>
  );
};

export default Lobby;
