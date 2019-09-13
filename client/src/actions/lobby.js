import axios from "axios";
import { GET_LOBBIES, JOIN_LOBBY, LOBBY_ERROR } from "./types";

export const getLobbies = () => async dispatch => {
  try {
    const res = await axios.get("/api/lobby");

    dispatch({
      type: GET_LOBBIES,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: LOBBY_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const joinLobby = (lobby_id, player_id) => async dispatch => {
  try {
    const res = await axios.put(`/api/lobby/${lobby_id}/${player_id}`);

    dispatch({
      type: JOIN_LOBBY,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: LOBBY_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
