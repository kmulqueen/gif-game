import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createUser } from "../../actions/users";

const CreateUser = ({ createUser }) => {
  const [name, setName] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    createUser({ name });
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="name" onChange={e => setName(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
};

CreateUser.propTypes = {
  createUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { createUser }
)(CreateUser);
