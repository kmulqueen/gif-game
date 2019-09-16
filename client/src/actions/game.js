import axios from "axios";
import { START_GAME, CLEAR_GAME, PLAYER_READY, NEW_QUESTION } from "./types";

export const startGame = (lobbyId, gameId) => async dispatch => {
  try {
    const res = await axios.get(`/api/game/${lobbyId}/${gameId}`);
    dispatch({
      type: START_GAME,
      payload: res.data
    });
  } catch (error) {
    console.error(error);
  }
};

export const newQuestion = (lobbyId, gameId) => async dispatch => {
  try {
    const res = await axios.post(`/api/game/${lobbyId}/${gameId}`);

    dispatch({
      type: NEW_QUESTION,
      payload: res.data.question
    });
  } catch (error) {
    console.error(error);
  }
};

export const playerReady = (gameId, playerId) => async dispatch => {
  try {
    let res = await axios.post(`/api/game/${gameId}/${playerId}`);

    dispatch({
      type: PLAYER_READY,
      payload: res.data
    });
  } catch (error) {
    console.error(error);
  }
};
