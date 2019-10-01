import React from "react";
import { mount } from "enzyme";
import Root from "Root";

import CreateLobby from "components/Lobby/CreateLobby";

let wrapped;
beforeEach(() => {
  wrapped = mount(
    <Root>
      <CreateLobby />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

describe("Layout", () => {
  it("has a text input and a button", () => {
    expect(wrapped.find("input").length).toEqual(1);
    expect(wrapped.find("button").length).toEqual(1);
  });
});
