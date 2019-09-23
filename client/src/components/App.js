import React, { Fragment } from "react";
import Game from "components/Game";
import Lobby from "components/Lobby";

export default () => {
  return (
    <Fragment>
      <Lobby />
      <Game />
    </Fragment>
  );
};
