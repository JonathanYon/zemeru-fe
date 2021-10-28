export const LOG_ME = "LOG_ME";
export const ERROR_ME = "ERROR_ME";
export const LOADING_ME = "LOADING_ME";
export const LOADING_BLOG = "LOADING_BLOG";
export const ERROR_BLOG = "ERROR_BLOG";
export const BLOGS = "BLOGS";
export const LOADING_LYRICS = "LOADING_LYRICS";
export const ERROR_LYRICS = "ERROR_LYRICS";
export const LYRICS = "LYRICS";

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
//blogs
export const myBlogs = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/blogs`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
        },
      });
      if (response.ok) {
        const res = await response.json();

        dispatch({
          type: LOADING_BLOG,
          payload: false,
        });
        dispatch({
          type: BLOGS,
          payload: res,
        });
      } else {
        dispatch({
          type: ERROR_BLOG,
          payload: true,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR_BLOG,
        payload: true,
      });
    }
  };
};
//lYRICS
export const myLyrics = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/lyrics/all`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
        },
      });
      if (response.ok) {
        const res = await response.json();
        console.log("inAction", res);
        dispatch({
          type: LOADING_LYRICS,
          payload: false,
        });
        dispatch({
          type: LYRICS,
          payload: res,
        });
      } else {
        dispatch({
          type: ERROR_LYRICS,
          payload: true,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR_LYRICS,
        payload: true,
      });
    }
  };
};
