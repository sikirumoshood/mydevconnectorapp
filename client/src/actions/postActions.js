import {
  GET_POST,
  POST_LOADING,
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  GET_ERRORS
} from "./types";

import axios from "axios";

export const addPost = postData => dispatch => {
  axios
    .post("/api/post", postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/api/post")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

export const setPostLoading = () => {
  return {
    type: POST_LOADING,
    payload: {
      loading: true
    }
  };
};
