import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllLobbies } from "actions";
import PropTypes from "prop-types";

const LobbyList = ({ lobbies, getAllLobbies }) => {
  useEffect(() => {
    getAllLobbies();
  }, [getAllLobbies]);

  function renderLobbies() {
    return lobbies.map(lobby => {
      return (
        <li className="lobby-list-li" key={lobby}>
          {lobby}
        </li>
      );
    });
  }
  return (
    <div>
      <h4>Lobby List</h4>
      <ul>{renderLobbies()}</ul>
    </div>
  );
};

const mapStateToProps = state => {
  return { lobbies: state.lobby };
};

LobbyList.propTypes = {
  lobbies: PropTypes.array.isRequired,
  getAllLobbies: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { getAllLobbies }
)(LobbyList);
