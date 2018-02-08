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
      .catch(() => registerFail());
  };
};

const signUpSuccess = ({ username, password }, history) => {
  const res = axios
    .post(`api/signIn`, { username, password })
    .then(() => {
      history.push("/redirect");
    })
    .catch(() => registerFail());

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

const registerFail = () => {
  return {
    type: SIGNUP_FAIL
  };
};

const signInFail = dispatch => {
  dispatch({
    type: LOGIN_FAIL
  });
};

const loginSucess = dispatch => {
  dispatch({
    type: LOGIN_SUCCESS
  });
};

export const signIn = ({ username, password }, history) => {
  return dispatch => {
    axios
      .post(`/api/signIn`, { username, password })
      .then(() => {
        loginSucess(dispatch);
        history.push("/DashBoard");
      })
      .catch(() => signInFail(dispatch));
  };
};

export const fetchUser = () => async dispatch => {
  const res = await axios.get(`/api/current_user`);
  dispatch({
    type: FETCH_USER,
    payload: res
  });
};

export const logout = history => async dispatch => {
  const res = await axios.get(`/api/logout`);
  dispatch({
    type: LOG_OUT,
    payload: res //reset the input value for the form in the reducer.
  });
  history.push("/");
};

export const updateProfile = ({ role, address }, userId, history) => {
  return dispatch => {
    axios
      .put(`/api/user/${userId}`, { role, address })
      .then(() => {
        history.push("/DashBoard");
      })
      .catch();
  };
};

export const handleStripeToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);
  dispatch({
    type: FETCH_USER,
    payload: res
  });
};
