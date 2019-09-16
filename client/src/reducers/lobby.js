import {
  GET_LOBBIES,
  GET_LOBBY,
  LOBBY_ERROR,
  CREATE_LOBBY,
  JOIN_LOBBY,
  LEAVE_LOBBY,
  CLEAR_LOBBY
} from "../actions/types";

const initialState = {
  lobby: null,
  lobbies: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LOBBIES:
      return {
        ...state,
        lobbies: payload,
        loading: false
      };
    case JOIN_LOBBY:
    case GET_LOBBY:
      return {
        ...state,
        lobby: payload,
        lobbies: state.lobbies.map((lobby, i) => {
          if (lobby._id === payload._id) {
            return (state.lobbies[i] = payload);
          } else {
            return lobby;
          }
        }),
        loading: false
      };
    case LEAVE_LOBBY:
      return {
        ...state,
        lobby: null,
        lobbies: state.lobbies.map((lobby, i) => {
          if (lobby._id === payload._id) {
            return (state.lobbies[i] = payload);
          } else {
            return lobby;
          }
        }),
        loading: false
      };
    case CREATE_LOBBY:
      return {
        ...state,
        lobby: payload,
        lobbies: [...state.lobbies, payload],
        loading: false
      };
    case CLEAR_LOBBY:
      return {
        ...state,
        lobby: null,
        loading: false
      };
    case LOBBY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    default:
      return state;
  }
}
