import { createLobby } from "actions";
import { CREATE_LOBBY } from "actions/types";

describe("createLobby", () => {
  it("has the correct type", () => {
    const action = createLobby();

    expect(action.type).toEqual(CREATE_LOBBY);
  });
  it("has the correct payload", () => {
    const action = createLobby("New Lobby");

    expect(action.payload).toEqual("New Lobby");
  });
});
