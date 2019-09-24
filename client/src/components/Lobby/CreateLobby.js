import React, { useState } from "react";
import { connect } from "react-redux";
import { createLobby } from "actions";
import PropTypes from "prop-types";
import LobbyList from "components/Lobby/LobbyList";

const CreateLobby = ({ createLobby }) => {
  const [name, setName] = useState("");

  const handleChange = e => {
    setName(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    createLobby(name);
    setName("");
  };

  return (
    <div>
      <h4>Create Lobby</h4>
      <form onSubmit={e => handleSubmit(e)}>
        <input type="text" onChange={handleChange} value={name} />
        <button type="submit">Create</button>
      </form>
      <h4>Lobby List</h4>
      <LobbyList />
    </div>
  );
};

CreateLobby.propTypes = {
  createLobby: PropTypes.func.isRequired
};

export default connect(
  null,
  { createLobby }
)(CreateLobby);
