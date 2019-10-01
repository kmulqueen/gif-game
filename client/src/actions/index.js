import { CREATE_LOBBY, GET_ALL_LOBBIES } from "actions/types";
import axios from "axios";

export function createLobby(lobby) {
  return {
    type: CREATE_LOBBY,
    payload: lobby
  };
}

export async function getAllLobbies() {
  const res = await axios.get(`/api/lobby/`);

  return {
    type: GET_ALL_LOBBIES,
    payload: res.data
  };
}
