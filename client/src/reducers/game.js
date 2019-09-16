import {
  START_GAME,
  NEW_QUESTION,
  CLEAR_GAME,
  PLAYER_READY
} from "../actions/types";

const initialState = {
  question: "",
  start: false,
  playersReady: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case START_GAME:
      return {
        ...state,
        ...payload
      };
    case PLAYER_READY:
      return {
        ...state,
        playersReady: payload
      };
    case NEW_QUESTION:
      return {
        ...state,
        question: payload,
        ready: true
      };
    case CLEAR_GAME:
      return {
        ...state,
        question: "",
        ready: false
      };

    default:
      return state;
  }
}
