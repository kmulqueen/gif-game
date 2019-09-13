import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLobbies } from "../../actions/lobby";
import LobbyItem from "./LobbyItem";

const LobbyList = ({ getLobbies, lobbies }) => {
  useEffect(() => {
    getLobbies();
  }, [getLobbies]);

  return (
    <div>
      <h1>Lobby List</h1>
      {lobbies.map(lobby => (
        <LobbyItem lobby={lobby} key={lobby._id} />
      ))}
    </div>
  );
};

LobbyList.propTypes = {
  getLobbies: PropTypes.func.isRequired,
  lobbies: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  lobbies: state.lobby.lobbies
});
export default connect(
  mapStateToProps,
  { getLobbies }
)(LobbyList);
