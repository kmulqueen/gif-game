import axios from "axios";
import {
  GET_LOBBIES,
  GET_LOBBY,
  JOIN_LOBBY,
  CREATE_LOBBY,
  CLEAR_LOBBY,
  LEAVE_LOBBY,
  LOBBY_ERROR
} from "./types";

export const getLobbies = () => async dispatch => {
  try {
    dispatch({
      type: CLEAR_LOBBY
    });
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

export const getLobby = lobbyId => async dispatch => {
  try {
    const res = await axios.get(`/lobby/${lobbyId}`);

    dispatch({
      type: GET_LOBBY,
      payload: res.data
    });
  } catch (error) {
    console.error(error);
  }
};

export const createLobby = ({ name }, userId, history) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name });

  try {
    const res = await axios.post(`/api/lobby/${userId}`, body, config);

    dispatch({
      type: CREATE_LOBBY,
      payload: res.data
    });

    history.push(`/lobby/${res.data._id}`);
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

    // Check if user exists in data
    console.log("from joinLobby action:");
    console.log(res.data);

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

export const leaveLobby = (lobby_id, player_id) => async dispatch => {
  try {
    const res = await axios.delete(`/api/lobby/${lobby_id}/${player_id}`);

    dispatch({
      type: LEAVE_LOBBY,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: LOBBY_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
