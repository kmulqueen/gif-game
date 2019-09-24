import { CREATE_LOBBY } from "actions/types";

export default function(state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_LOBBY:
      return [...state, payload];
    default:
      return state;
  }
}
