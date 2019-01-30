import {
  GET_POST,
  POST_LOADING,
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  GET_ERRORS
} from "../actions/types";

const initialState = {
  post: null,
  posts: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
