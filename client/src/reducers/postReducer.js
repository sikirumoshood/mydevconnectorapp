import {
  GET_POST,
  POST_LOADING,
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  GET_ERRORS
} from "../actions/types";

const initialState = {
  post: {},
  posts: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return {};

    default:
      return state;
  }
}
