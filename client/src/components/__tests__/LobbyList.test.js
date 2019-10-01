import React from "react";
import { mount } from "enzyme";
import LobbyList from "components/Lobby/LobbyList";
import Root from "Root";

let wrapped;

beforeEach(() => {
  const initialState = {
    lobby: ["Lobby 1", "Lobby 2"]
  };
  wrapped = mount(
    <Root initialState={initialState}>
      <LobbyList />
    </Root>
  );
});

it("shows one li per lobby", () => {
  expect(wrapped.find("li").length).toEqual(2);
});

it("shows text for each lobby", () => {
  expect(wrapped.render().text()).toContain("Lobby 1");
  expect(wrapped.render().text()).toContain("Lobby 2");
});
