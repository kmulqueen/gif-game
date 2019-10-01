import React from "react";
import moxios from "moxios";
import { mount } from "enzyme";
import Root from "Root";
import App from "components/App";

beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

describe("Lobby List", () => {
  let wrapped;

  beforeEach(() => {
    wrapped = mount(
      <Root>
        <App />
      </Root>
    );
    moxios.stubRequest("/api/lobby/", {
      status: 200,
      response: [{ name: "Fetched Lobby #1" }, { name: "Fetched Lobby #2" }]
    });
  });

  afterEach(() => {
    wrapped.unmount();
  });

  it("fetch a list of lobbies and display them", done => {
    setTimeout(() => {
      wrapped.update();
      expect(wrapped.find(".lobby-list-li").length).toEqual(2);

      done();
    }, 100);
  });
});
