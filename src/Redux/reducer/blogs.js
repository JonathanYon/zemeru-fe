import { BLOGS, ERROR_BLOG, LOADING_BLOG } from "../action";
import { initialState } from "../store";

export const blogsReducer = (state = initialState.blogs, action) => {
  switch (action.type) {
    case BLOGS:
      return {
        ...state,
        articles: action.payload,
      };
    case ERROR_BLOG:
      return {
        ...state,
        error: action.payload,
      };
    case LOADING_BLOG:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
