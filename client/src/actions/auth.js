import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// Register User
export const registerUser = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Login
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = { email, password };

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (error) {
    // const errors = error.response.data.errors;

    // if (errors) {
    //   errors.forEach(error => dispatch(setAlert(error.msg)));
    // }
    console.error(error);

    dispatch({
      type: LOGIN_FAIL
    });
  }
};
