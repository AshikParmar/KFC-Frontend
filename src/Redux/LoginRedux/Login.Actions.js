import axios from "axios";
import {
  LOGIN_ERROR,
  LOGIN_RESET,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./Login.ActionTypes";

export const login = ({ payload }) => async (dispatch) => {
  try {
    const res = await axios.post("https://kfc-backend-eight.vercel.app/user/login", payload);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    return res.data;
  } catch (error) {
    console.error("Login Error:", error);
    const errorMessage = error.response ? error.response.data.message || error.message : error.message;
    dispatch({ type: LOGIN_ERROR, payload: errorMessage });
    throw new Error(errorMessage); 
  }
};


export const resetLogin = () => async (dispatch) => {
  dispatch({ type: LOGIN_RESET });
};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT })
};
