import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";

// Components
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import LobbyList from "./components/Lobby/LobbyList";
import CreateLobby from "./components/Lobby/CreateLobby";
import UserList from "./components/Users/UserList";
import Lobby from "./components/Lobby/Lobby";

// Check for user's token in local storage
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/users" component={UserList} />
          <Route exact path="/lobbies" component={LobbyList} />
          <Route exact path="/create-lobby" component={CreateLobby} />
          <Route exact path="/lobby/:id" component={Lobby} />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
