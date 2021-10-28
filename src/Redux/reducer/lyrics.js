import { LYRICS, ERROR_LYRICS, LOADING_LYRICS } from "../action";
import { initialState } from "../store";

export const lyricsReducer = (state = initialState.allLyrics, action) => {
  switch (action.type) {
    case LYRICS:
      return {
        ...state,
        lyrics: action.payload,
      };
    case ERROR_LYRICS:
      return {
        ...state,
        error: action.payload,
      };
    case LOADING_LYRICS:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
