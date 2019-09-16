import { USER_ERROR, GET_ALL_USERS, USER_LOADED } from "../actions/types";

const initialState = {
  user: null,
  users: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: payload,
        loading: false
      };
    case USER_LOADED:
      return {
        ...state,
        user: payload,
        loading: false
      };
    case USER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    default:
      return state;
  }
}
