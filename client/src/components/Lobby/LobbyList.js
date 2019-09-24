import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const LobbyList = ({ lobbies }) => {
  function renderLobbies() {
    return lobbies.map(lobby => {
      return <li key={lobby}>{lobby}</li>;
    });
  }
  return (
    <div>
      <ul>{renderLobbies()}</ul>
    </div>
  );
};

const mapStateToProps = state => {
  return { lobbies: state.lobby };
};

LobbyList.propTypes = {
  lobbies: PropTypes.array.isRequired
};

export default connect(
  mapStateToProps,
  {}
)(LobbyList);
