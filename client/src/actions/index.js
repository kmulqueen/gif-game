import { CREATE_LOBBY } from "actions/types";

export function createLobby(lobby) {
  return {
    type: CREATE_LOBBY,
    payload: lobby
  };
}
