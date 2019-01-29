import { VIEW_DEVELOPER_PROFILE } from "../actions/types";
import { INVALID_GITHUB_USERNAME } from "../actions/types";

const initialState = {
  repos: [],
  gitHubErrorOcurred: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case VIEW_DEVELOPER_PROFILE:
      return {
        ...state,
        repos: action.payload.repos,
        gitHubErrorOcurred: action.payload.gitHubErrorOcurred
      };
    case INVALID_GITHUB_USERNAME:
      return {
        ...state,
        repos: action.payload.repos,
        gitHubErrorOcurred: action.payload.gitHubErrorOcurred
      };

    default:
      return state;
  }
}
