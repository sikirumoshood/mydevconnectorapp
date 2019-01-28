//Action handlers to reducers
import { GET_ERRORS } from "./types";
import axios from "axios";
import attachTokenToAllRequestsHeader from "../utils/attachTokenToAllRequestsHeader";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER } from "./types";

//Register user
export const registerUser = (registerData, history) => dispatch => {
  //Perform registeration
  axios
    .post("api/user/register", registerData)
    .then(res => history.push("/login"))
    .catch(err => {
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Login user

export const loginUser = loginData => dispatch => {
  axios
    .post("api/user/login", loginData)
    .then(res => {
      //Get logged in token and decode user info into user object in auth state

      const { token } = res.data;
      //Attach to all request headers henceforth

      attachTokenToAllRequestsHeader(token);
      //store

      localStorage.setItem("jwt-token", token);
      //decode token to get user data

      const decodedData = jwt_decode(token);

      //set current user data to be used in other protected routes (e.g profile)

      dispatch(setCurrentUser(decodedData));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = decodedData => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedData
  };
};

export const logoutUser = () => dispatch => {
  //Destroy token
  localStorage.removeItem("jwt-token");

  //Remove token from header
  attachTokenToAllRequestsHeader(false);

  //Empty current user and set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
