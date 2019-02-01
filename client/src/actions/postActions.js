import {
  GET_POST,
  POST_LOADING,
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  GET_ERRORS,
  LIKE_POST,
  DISLIKE_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
  CLEAR_ERRORS
} from "./types";

import axios from "axios";

export const addPost = postData => dispatch => {
  dispatch(setClearErrors());
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
export const addComment = (postId, commentData) => dispatch => {
  dispatch(setClearErrors());
  axios
    .post(`/api/post/comment/${postId}`, commentData)
    .then(res =>
      dispatch({
        type: ADD_COMMENT,
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

export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/post/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: DELETE_COMMENT,
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

export const getPost = postId => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/post/${postId}`)
    .then(res =>
      dispatch({
        type: GET_POST,
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

export const likePost = postId => dispatch => {
  axios
    .post(`/api/post/like/${postId}`)
    .then(res => {
      dispatch({
        type: LIKE_POST,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const dislikePost = postId => dispatch => {
  axios
    .delete(`/api/post/unlike/${postId}`)
    .then(res =>
      dispatch({
        type: DISLIKE_POST,
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
export const deletePost = postId => dispatch => {
  axios
    .delete(`/api/post/${postId}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: postId
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.payload
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
export const setClearErrors = () => {

  return {
    type:CLEAR_ERRORS,
    payload: {}

  }
}