import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Game from "../Game/Game";
import { getLobby } from "../../actions/lobby";

const Lobby = ({ lobby, getLobby }) => {
  useEffect(() => {
    if (lobby !== null) {
      getLobby(lobby._id);
      console.log("get lobby ran");
    }
  }, [lobby, getLobby]);
  return (
    <Fragment>
      {lobby === null ? (
        <p>Loading</p>
      ) : (
        <Fragment>
          <h1>{lobby.name}</h1>
          <h3>Players</h3>
          <ul>
            {lobby.players.map(player => (
              <li key={player._id}>{player.name}</li>
            ))}
          </ul>
          <h3>Players Ready</h3>
          <ul>
            {lobby.game.playersReady.map(player => (
              <li key={player._id}>{player.name}</li>
            ))}
          </ul>
          <Game lobby={lobby} />
        </Fragment>
      )}
    </Fragment>
  );
};

Lobby.propTypes = {
  lobby: PropTypes.object.isRequired,
  getLobby: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  lobby: state.lobby.lobby
});

export default connect(
  mapStateToProps,
  { getLobby }
)(Lobby);
