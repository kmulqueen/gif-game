import axios from "axios";
import { CREATE_USER, USER_ERROR } from "./types";

export const createUser = ({ name }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name });

  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: CREATE_USER,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: error.message }
    });
  }
};
