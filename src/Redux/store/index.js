import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { meReducer } from "../reducer";
import { blogsReducer } from "../reducer/blogs";
import { commentsReducer } from "../reducer/comments";
import likeReducer from "../reducer/like";
import { lyricsReducer } from "../reducer/lyrics";
import { blogCommentsReducer } from "../reducer/blogComments";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // only navigation will be persisted
};

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
  liked: {
    lyrics: [],
    blog: [],
  },
  lyricsComments: {
    comments: [],
    error: false,
    loading: true,
  },
  blogsComments: {
    comments: [],
    error: false,
    loading: true,
  },
};

const rootReducer = combineReducers({
  user: meReducer,
  blogs: blogsReducer,
  allLyrics: lyricsReducer,
  lyricsComments: commentsReducer,
  liked: likeReducer,
  blogsComments: blogCommentsReducer,
});

const configPersist = persistReducer(persistConfig, rootReducer);

export const configStore = createStore(
  configPersist,
  initialState,
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(thunk))
    : compose(applyMiddleware(thunk))
);
export const persistor = persistStore(configStore);
export default { configStore, persistor };
