import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { meReducer } from "../reducer";
import { blogsReducer } from "../reducer/blogs";

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
};

const rootReducer = combineReducers({
  user: meReducer,
  blogs: blogsReducer,
});

const configStore = createStore(
  rootReducer,
  initialState,
  process.env.REACT_APP_DEV
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(thunk))
    : compose(applyMiddleware(thunk))
);
export default configStore;
