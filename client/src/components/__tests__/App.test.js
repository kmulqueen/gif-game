import React from "react";
import { shallow } from "enzyme";

import App from "components/App";
import Game from "components/Game";
import Lobby from "components/Lobby/Lobby";
import CreateLobby from "components/Lobby/CreateLobby";

let wrapped;
beforeEach(() => {
  wrapped = shallow(<App />);
});

it("should show a game component", () => {
  expect(wrapped.find(Game).length).toEqual(1);
});

it("should show a create lobby component", () => {
  expect(wrapped.find(CreateLobby).length).toEqual(1);
});
it("should show a lobby component", () => {
  expect(wrapped.find(Lobby).length).toEqual(1);
});
