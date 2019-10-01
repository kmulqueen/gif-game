import { CREATE_LOBBY, GET_ALL_LOBBIES } from "actions/types";

export default function(state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_LOBBY:
      return [...state, payload];
    case GET_ALL_LOBBIES:
      const lobbies = payload.map(lobby => lobby.name);
      return [...state, ...lobbies];
    default:
      return state;
  }
}
