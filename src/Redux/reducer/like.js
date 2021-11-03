import { initialState } from "../store";
import { TOGGLE_BLOG, TOGGLE_LYRICS } from "../action";

const likeReducer = (state = initialState.liked, action) => {
  switch (action.type) {
    case TOGGLE_LYRICS:
      return {
        ...state,

        lyrics: state.lyrics.includes(action.payload)
          ? state.lyrics
              .slice(0, state.lyrics.indexOf(action.payload))
              .concat(
                state.lyrics.slice(
                  state.lyrics.indexOf(action.payload) + 1,
                  state.lyrics.length
                )
              )
          : state.lyrics.concat(action.payload),
      };
    case TOGGLE_BLOG:
      return {
        ...state,
        blog: state.blog.includes(action.payload)
          ? state.blog
              .slice(0, state.blog.indexOf(action.payload))
              .concat(
                state.blog.slice(
                  state.blog.indexOf(action.payload) + 1,
                  state.blog.length
                )
              )
          : state.blog.concat(action.payload),
      };
    default:
      return state;
  }
};

export default likeReducer;
