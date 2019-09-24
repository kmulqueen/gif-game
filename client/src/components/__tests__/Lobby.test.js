import React from "react";
import { mount } from "enzyme";

import Lobby from "components/Lobby/Lobby";

let wrapped;
beforeEach(() => {
  wrapped = mount(<Lobby />);
});

afterEach(() => {
  wrapped.unmount();
});

it("has a message, a list of ready players, a dashboard with a list of players in lobby and a ready button", () => {
  expect(wrapped.find("h3").length).toEqual(1);
  expect(wrapped.find("ul").length).toEqual(2);
  expect(wrapped.find(".dashboard").length).toEqual(1);
  expect(wrapped.find("button").length).toEqual(1);
});
