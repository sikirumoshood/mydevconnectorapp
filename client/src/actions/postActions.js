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
        payload: post.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
