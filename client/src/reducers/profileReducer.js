import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  PROFILE_NOT_FOUND
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };

    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case PROFILE_LOADING:
      return {
        ...state,
        loading: action.payload.loading
      };

    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: action.payload.profile
      };
    case PROFILE_NOT_FOUND:
      return {
        ...state,
        loading: false,
        profile: action.payload
      };
    default:
      return state;
  }
}
