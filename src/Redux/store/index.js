import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { meReducer } from "../reducer";

export const initialState = {
  user: {
    me: null,
    error: false,
    loading: true,
  },
};

const rootReducer = combineReducers({
  user: meReducer,
});

const configStore = createStore(
  rootReducer,
  initialState,
  process.env.REACT_APP_DEV
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(thunk))
    : compose(applyMiddleware(thunk))
);
export default configStore;
