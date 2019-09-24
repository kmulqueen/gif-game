import lobbyReducer from "reducers/lobby";
import { CREATE_LOBBY } from "actions/types";

it("handles actions of type CREATE_LOBBY", () => {
  const action = {
    type: CREATE_LOBBY,
    payload: "New Lobby"
  };

  const newState = lobbyReducer([], action);

  expect(newState).toEqual(["New Lobby"]);
});

it("handles action with unknown type", () => {
  const newState = lobbyReducer([], {});

  expect(newState).toEqual([]);
});
