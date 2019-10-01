import React, { Fragment } from "react";
import Game from "components/Game";
import Lobby from "components/Lobby/Lobby";
import CreateLobby from "components/Lobby/CreateLobby";
import LobbyList from "components/Lobby/LobbyList";

export default () => {
  return (
    <Fragment>
      <CreateLobby />
      <LobbyList />
      <Lobby />
      <Game />
    </Fragment>
  );
};
