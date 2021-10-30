import { COMMENTS, ERROR_COMMENTS, LOADING_COMMENTS } from "../action";
import { initialState } from "../store";

export const commentsReducer = (
  state = initialState.lyricsComments,
  action
) => {
  switch (action.type) {
    case COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case ERROR_COMMENTS:
      return {
        ...state,
        error: action.payload,
      };
    case LOADING_COMMENTS:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
