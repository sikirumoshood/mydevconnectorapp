import { VIEW_DEVELOPER_PROFILE, INVALID_GITHUB_USERNAME } from "./types";

export const viewDeveloper = username => dispatch => {
  //argument initialization

  let clientId = "b40ad624918b8a03149c",
    clientSecret = "dd820583d9cf0dc59f86840fba5270a4c516698c",
    count = 5,
    sort = "created: asc";

  fetch(
    `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
  )
    .then(res => res.json()) //objects represent error must have occured, while array represents good response.
    .then(data => {
      console.log(data);
      if (Array.isArray(data)) {
        dispatch({
          type: VIEW_DEVELOPER_PROFILE,
          payload: {
            repos: data,
            gitHubErrorOcurred: false
          }
        });
      } else {
        dispatch({
          type: INVALID_GITHUB_USERNAME,
          payload: {
            repos: [],
            gitHubErrorOcurred: true
          }
        });
      }
    })
    .catch(err =>
      dispatch({
        type: INVALID_GITHUB_USERNAME,
        payload: {
          repos: [],
          gitHubErrorOcurred: true
        }
      })
    );
};
