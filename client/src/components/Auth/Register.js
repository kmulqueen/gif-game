import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ registerUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const { name, email, password, confirmPassword } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error("Passwords don't match");
    } else {
      registerUser({ name, email, password });
    }
  };

  return (
    <Fragment>
      <h1>Register</h1>
      <form onSubmit={e => onSubmit(e)}>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Name"
          onChange={e => onChange(e)}
          required
        />
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Email"
          onChange={e => onChange(e)}
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={e => onChange(e)}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={e => onChange(e)}
          required
        />

        <button type="submit">Register</button>
      </form>
    </Fragment>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { registerUser }
)(Register);
