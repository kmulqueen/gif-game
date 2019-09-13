import { combineReducers } from "redux";
import lobby from "./lobby";
import users from "./users";

export default combineReducers({ lobby, users });
