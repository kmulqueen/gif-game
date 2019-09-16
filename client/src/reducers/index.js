import { combineReducers } from "redux";
import lobby from "./lobby";
import users from "./users";
import auth from "./auth";

export default combineReducers({ lobby, users, auth });
