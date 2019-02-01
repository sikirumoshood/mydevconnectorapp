import {
  GET_POST,
  POST_LOADING,
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  LIKE_POST,
  DISLIKE_POST,
  ADD_COMMENT,
  DELETE_COMMENT
} from "../actions/types";

const initialState = {
  post: null,
  posts: null,
  loading: false
};

// get index of post
//Index is expected to be avaiable since the post to be liked
//Or disliked is picked from the existing post

const getIndex = (posts, newPost) => {
  const postIndex = posts.map(post => post._id.toString()).indexOf(newPost._id);
  return postIndex;
};
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };

    case ADD_COMMENT:
      return {
        ...state,
        post: Object.assign({}, { ...state.post }, action.payload)
      };
    case DELETE_COMMENT:
      return {
        ...state,
        post: Object.assign({}, { ...state.post }, action.payload)
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
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };

    case LIKE_POST:
      return {
        ...state,
        // Since array is an object t=['a','b'] can be modified immutably as Object.assign([...t],{1:'b'})
        // This will immutably change array element at index 1 to the specified elemet which is b here
        posts: Object.assign([...state.posts], {
          [getIndex(state.posts, action.payload)]: action.payload
        })
      };

    case DISLIKE_POST:
      return {
        ...state,
        posts: Object.assign([...state.posts], {
          [getIndex(state.posts, action.payload)]: action.payload
        })
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(
          post => post._id.toString() !== action.payload
        ),
        loading: false
      };

    default:
      return state;
  }
}
