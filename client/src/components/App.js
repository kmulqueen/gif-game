import React, { Fragment } from "react";
import Game from "components/Game";
import Lobby from "components/Lobby/Lobby";
import CreateLobby from "components/Lobby/CreateLobby";

export default () => {
  return (
    <Fragment>
      <CreateLobby />
      <Lobby />
      <Game />
    </Fragment>
  );
};
