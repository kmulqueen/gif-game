import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };

    case USER_LOADED:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false
      };

    default:
      return state;
  }
}
