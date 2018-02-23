import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import { reducer as reduxForm } from "redux-form";

export default combineReducers({
  // our application level states are defined
  auth: AuthReducer,
  form: reduxForm
});
