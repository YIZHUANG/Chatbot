import {
  LOG_OUT,
  FETCH_USER,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL
} from "../actions/types";

const INITIAL_STATE = {
  authenticated: false,
  user: false,
  loginError: "",
  signupError: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOG_OUT:
      return INITIAL_STATE;
    case LOGIN_SUCCESS:
      return { authenticated: true, loginError: "", signupError: "" };
    case LOGIN_FAIL:
      return {
        loginError:
          "Log in fail, check your if your username or password is correct"
      };
    case FETCH_USER:
      return { ...state, user: action.payload.data || false }; //has  to be data.
    case SIGNUP_SUCCESS:
      return {
        user: false,
        status: null,
        signupError: ""
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        signupError: "account already exist or check your internet connect"
      };
    default:
      return state;
  }
};
