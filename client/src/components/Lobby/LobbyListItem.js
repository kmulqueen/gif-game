import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { joinLobby } from "../../actions/lobby";

const LobbyListItem = ({ lobby, user, joinLobby }) => {
  return (
    <Fragment>
      <h3>{lobby.name}</h3>
      <p>Hosted by: {lobby.host.name}</p>
      <p>Players: {lobby.players.map(player => player.name)}</p>
      <p>Question: {lobby.game.question}</p>
      <Link
        onClick={() => joinLobby(lobby._id, user._id)}
        to={`/lobby/${lobby._id}`}
      >
        Join Lobby
      </Link>
    </Fragment>
  );
};

LobbyListItem.propTypes = {
  lobby: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.users.user
});

export default connect(
  mapStateToProps,
  { joinLobby }
)(LobbyListItem);
