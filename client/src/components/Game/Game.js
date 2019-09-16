import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { startGame } from "../../actions/game";
import { leaveLobby } from "../../actions/lobby";
import { newQuestion } from "../../actions/game";
import { playerReady } from "../../actions/game";

const Game = ({
  startGame,
  leaveLobby,
  playerReady,
  newQuestion,
  lobby: { _id, game },
  user
}) => {
  const handleStart = () => {
    startGame(_id, game._id);
    newQuestion(_id, game._id);
  };

  const handleReady = () => {
    playerReady(game._id, user._id);
  };
  return (
    <Fragment>
      <h3>Question: {game.question}</h3>
      <button onClick={() => handleStart()}>Start Game</button>
      <button onClick={() => handleReady()}>Ready Up</button>
      <Link to="/lobbies" onClick={() => leaveLobby(_id, user._id)}>
        Leave Game
      </Link>
    </Fragment>
  );
};

Game.propTypes = {
  startGame: PropTypes.func.isRequired,
  newQuestion: PropTypes.func.isRequired,
  playerReady: PropTypes.func.isRequired,
  leaveLobby: PropTypes.func.isRequired,
  lobby: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { startGame, leaveLobby, newQuestion, playerReady }
)(Game);
