import {
  BLOG_COMMENTS,
  LOADING_BLOG_COMMENTS,
  ERROR_BLOG_COMMENTS,
} from "../action";
import { initialState } from "../store";

export const blogCommentsReducer = (
  state = initialState.blogsComments,
  action
) => {
  switch (action.type) {
    case BLOG_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case ERROR_BLOG_COMMENTS:
      return {
        ...state,
        error: action.payload,
      };
    case LOADING_BLOG_COMMENTS:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
