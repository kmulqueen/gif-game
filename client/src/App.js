import React, { Fragment } from "react";
import { Provider } from "react-redux";
import store from "./store";

import CreateUser from "./components/Users/CreateUser";
import LobbyList from "./components/Lobby/LobbyList";
import CreateLobby from "./components/Lobby/CreateLobby";

function App() {
  return (
    <Provider store={store}>
      <Fragment>
        <CreateUser />
        <LobbyList />
        <CreateLobby />
      </Fragment>
    </Provider>
  );
}

export default App;
