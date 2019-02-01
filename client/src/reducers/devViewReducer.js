import { GET_DEV_PROFILE_BY_HANDLE } from "../actions/types";
import { DEV_PROFILE_LOADING } from "../actions/types";

const initialState = {
  profile: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DEV_PROFILE_BY_HANDLE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case DEV_PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
