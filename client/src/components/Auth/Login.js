import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };
  return (
    <Fragment>
      <h1>Login</h1>
      <form onSubmit={e => onSubmit(e)}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={e => onChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={e => onChange(e)}
        />
        <button type="submit">Login</button>
      </form>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
