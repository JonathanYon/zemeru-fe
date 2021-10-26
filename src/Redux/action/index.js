export const LOG_ME = "LOG_ME";
export const ERROR_ME = "ERROR_ME";
export const LOADING_ME = "LOADING_ME";

export const myLogin = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
        },
      });
      if (response.ok) {
        const res = await response.json();
        console.log(res);
        dispatch({
          type: LOADING_ME,
          payload: false,
        });
        dispatch({
          type: LOG_ME,
          payload: res,
        });
      } else {
        dispatch({
          type: ERROR_ME,
          payload: true,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR_ME,
        payload: true,
      });
    }
  };
};
