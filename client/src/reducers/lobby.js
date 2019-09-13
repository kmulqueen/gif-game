import { GET_LOBBIES, LOBBY_ERROR, JOIN_LOBBY } from "../actions/types";

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
      return {
        ...state,
        lobby: payload,
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
