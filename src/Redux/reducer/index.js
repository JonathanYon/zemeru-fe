import { LOG_ME, LOADING_ME, ERROR_ME } from "../action";
import { initialState } from "../store";

export const meReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case LOG_ME:
      return {
        ...state,
        me: action.payload,
      };
    case ERROR_ME:
      return {
        ...state,
        error: action.payload,
      };
    case LOADING_ME:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
