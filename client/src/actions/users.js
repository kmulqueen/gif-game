import axios from "axios";
import { GET_ALL_USERS, USER_ERROR } from "./types";

export const getAllUsers = () => async dispatch => {
  try {
    const res = await axios.get("/api/users");

    dispatch({
      type: GET_ALL_USERS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: error.message }
    });
  }
};
