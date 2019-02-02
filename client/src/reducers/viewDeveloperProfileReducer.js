import { VIEW_DEVELOPER_PROFILE } from "../actions/types";
import { INVALID_GITHUB_USERNAME } from "../actions/types";
import { CLEAR_GITHUB_REPO } from "../actions/types";
const initialState = {
  repos: [],
  gitHubErrorOcurred: null
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
    case CLEAR_GITHUB_REPO:
      return {
        ...state,
        repos: [],
        gitHubErrorOcurred: null
      };

    default:
      return state;
  }
}
