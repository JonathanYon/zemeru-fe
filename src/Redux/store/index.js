import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { meReducer } from "../reducer";
import { blogsReducer } from "../reducer/blogs";
import { lyricsReducer } from "../reducer/lyrics";

export const initialState = {
  user: {
    me: null,
    error: false,
    loading: true,
  },
  blogs: {
    articles: [],
    error: false,
    loading: true,
  },
  allLyrics: {
    lyrics: [],
    error: false,
    loading: true,
  },
};

const rootReducer = combineReducers({
  user: meReducer,
  blogs: blogsReducer,
  allLyrics: lyricsReducer,
});

const configStore = createStore(
  rootReducer,
  initialState,
  process.env.REACT_APP_DEV
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(thunk))
    : compose(applyMiddleware(thunk))
);
export default configStore;
