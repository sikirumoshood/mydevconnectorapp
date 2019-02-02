import {
  GET_DEV_PROFILE_BY_HANDLE,
  GET_ERRORS,
  DEV_PROFILE_LOADING,
  VIEW_DEVELOPER_PROFILE,
  INVALID_GITHUB_USERNAME,
  CLEAR_ERRORS,
  CLEAR_GITHUB_REPO
} from "./types";

import axios from "axios";

export const getDevProfileByHandle = handle => dispatch => {
  //Clear existing errors so as to be sure that any error found in the error reducer originates from here

  dispatch({
    type: CLEAR_ERRORS,
    payload: {}
  });
  dispatch({
    type: CLEAR_GITHUB_REPO
  });
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res => {
      //we also want to view get developer repos
      let clientId = "b40ad624918b8a03149c",
        clientSecret = "dd820583d9cf0dc59f86840fba5270a4c516698c",
        count = 5,
        sort = "created: asc";

      fetch(
        `https://api.github.com/users/${
          res.data.githubusername
        }/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
      )
        .then(resp => resp.json())
        .then(data => {
          if (Array.isArray(data)) {
            //Array is returned if successful
            dispatch({
              type: VIEW_DEVELOPER_PROFILE,
              payload: {
                repos: data,
                gitHubErrorOcurred: false
              }
            });
            dispatch({
              type: GET_DEV_PROFILE_BY_HANDLE,
              payload: res.data
            });
          } else {
            //An object is returned
            dispatch({
              type: INVALID_GITHUB_USERNAME,
              payload: {
                repos: [],
                gitHubErrorOcurred: true
              }
            });

            dispatch({
              type: GET_DEV_PROFILE_BY_HANDLE,
              payload: res.data
            });
          }
        });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setProfileLoading = () => {
  return {
    type: DEV_PROFILE_LOADING
  };
};
