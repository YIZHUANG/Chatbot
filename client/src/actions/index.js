import axios from "axios";
import { BrowserRouter, Route, Router, Link } from "react-router-dom";
import {
  LOG_OUT,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_SUCCESS,
  FETCH_USER,
  SIGNUP_FAIL
} from "./types";

const ROOT_URL = "";
const API_KEY = "?key=fdfs";

export const signUp = (values, history) => {
  return dispatch => {
    axios
      .post(`api/signUp`, values)
      .then(() => signUpSuccess(values, history))
      .catch(() => signUpFail(dispatch));
  };
};

const signUpSuccess = ({ username, password }, history) => {
  const res = axios
    .post(`api/signIn`, { username, password })
    .then(() => {
      history.push("/redirect");
    })
    .catch(() => signInFail());

  return {
    type: LOGIN_SUCCESS,
    payload: res
  };
};

const signUpFail = dispatch => {
  dispatch({
    type: SIGNUP_FAIL
  });
};

const signInFail = dispatch => {
  dispatch({
    type: LOGIN_FAIL
  });
};

export const signIn = ({ username, password }, history) => {
  const res = axios
    .post(`api/signIn`, { username, password })
    .then(() => {
      history.push("/DashBoard");
    })
    .catch(() => signInFail());

  return {
    type: LOGIN_SUCCESS,
    payload: res
  };
};
