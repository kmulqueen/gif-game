import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { joinLobby } from "../../actions/lobby";

const LobbyItem = ({ lobby, user, joinLobby }) => {
  return (
    <Fragment>
      <h3>{lobby.name}</h3>
      <p>Hosted by: {lobby.host.name}</p>
      <p>Players: {lobby.players.map(player => player.name)}</p>
      <p>Question: {lobby.game.question}</p>
      <button onClick={() => joinLobby(lobby._id, user._id)}>Join Lobby</button>
    </Fragment>
  );
};

LobbyItem.propTypes = {
  lobby: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.users.user
});

export default connect(
  mapStateToProps,
  { joinLobby }
)(LobbyItem);
