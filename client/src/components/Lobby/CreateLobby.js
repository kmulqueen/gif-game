import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createLobby } from "../../actions/lobby";
import { getLobbies } from "../../actions/lobby";
import Lobby from "./Lobby";

const CreateLobby = ({ user, createLobby, lobby, history, getLobbies }) => {
  useEffect(() => {
    getLobbies();
  }, []);
  const [name, setName] = useState("");

  const onSubmit = async e => {
    e.preventDefault();
    createLobby({ name }, user._id, history);
  };
  return (
    <Fragment>
      <h1>Create Lobby</h1>
      <form onSubmit={e => onSubmit(e)}>
        <input
          type="text"
          name="name"
          placeholder="Lobby Name"
          onChange={e => setName(e.target.value)}
        />
        <button type="submit">Create Lobby</button>
      </form>
    </Fragment>
  );
};

Lobby.propTypes = {
  getLobbies: PropTypes.func.isRequired,
  createLobby: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.users.user,
  lobby: state.lobby.lobby
});

export default connect(
  mapStateToProps,
  { createLobby, getLobbies }
)(CreateLobby);
