import { combineReducers } from "redux";
import lobbyReducer from "reducers/lobby";

export default combineReducers({
  lobby: lobbyReducer
});
