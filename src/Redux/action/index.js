export const LOG_ME = "LOG_ME";
export const ERROR_ME = "ERROR_ME";
export const LOADING_ME = "LOADING_ME";
export const LOADING_BLOG = "LOADING_BLOG";
export const ERROR_BLOG = "ERROR_BLOG";
export const BLOGS = "BLOGS";
export const LOADING_LYRICS = "LOADING_LYRICS";
export const ERROR_LYRICS = "ERROR_LYRICS";
export const LYRICS = "LYRICS";
export const LOADING_COMMENTS = "LOADING_COMMENTS";
export const ERROR_COMMENTS = "ERROR_COMMENTS";
export const COMMENTS = "COMMENTS";
export const LOADING_BLOG_COMMENTS = "LOADING_BLOG_COMMENTS";
export const ERROR_BLOG_COMMENTS = "ERROR_BLOG_COMMENTS";
export const BLOG_COMMENTS = "BLOG_COMMENTS";
export const TOGGLE_BLOG = "TOGGLE_BLOG";
export const TOGGLE_LYRICS = "TOGGLE_LYRICS";

export const myLogin = () => {
  return async (dispatch) => {
    try {
      console.log("me Action try");
      const response = await fetch(`${process.env.REACT_APP_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
        },
      });
      if (response.ok) {
        console.log("me Action .ok");

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
          type: LOADING_ME,
          payload: false,
        });
        dispatch({
          type: ERROR_ME,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: LOADING_ME,
        payload: false,
      });
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
          type: LOADING_BLOG,
          payload: false,
        });
        dispatch({
          type: ERROR_BLOG,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: LOADING_BLOG,
        payload: false,
      });
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
          type: LOADING_LYRICS,
          payload: false,
        });
        dispatch({
          type: ERROR_LYRICS,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: LOADING_LYRICS,
        payload: false,
      });
      console.log(error);
      dispatch({
        type: ERROR_LYRICS,
        payload: true,
      });
    }
  };
};

//comments in lyrics
export const getComments = (id) => {
  return async (dispatch) => {
    try {
      console.log("try action");
      const response = await fetch(
        `${process.env.REACT_APP_URL}/lyrics/post/${id}/comments`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
          },
        }
      );
      if (response.ok) {
        console.log("response.ok action");
        const res = await response.json();
        dispatch({
          type: LOADING_COMMENTS,
          payload: false,
        });
        dispatch({
          type: COMMENTS,
          payload: res,
        });
      } else {
        dispatch({
          type: LOADING_COMMENTS,
          payload: false,
        });
        alert("something Wrong");
        dispatch({
          type: ERROR_COMMENTS,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: LOADING_COMMENTS,
        payload: false,
      });
      console.log("catcherrr comment action");
      console.log(error);
      dispatch({
        type: ERROR_COMMENTS,
        payload: true,
      });
    }
  };
};

//comments in Blog
export const getBlogComments = (id) => {
  return async (dispatch) => {
    try {
      console.log("try action");
      const response = await fetch(
        `${process.env.REACT_APP_URL}/blogs/post/${id}/comments`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("Token")}`,
          },
        }
      );
      if (response.ok) {
        console.log("response.ok action");
        const res = await response.json();
        dispatch({
          type: LOADING_BLOG_COMMENTS,
          payload: false,
        });
        dispatch({
          type: BLOG_COMMENTS,
          payload: res,
        });
      } else {
        dispatch({
          type: LOADING_BLOG_COMMENTS,
          payload: false,
        });
        alert("something Wrong");
        dispatch({
          type: ERROR_BLOG_COMMENTS,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: LOADING_BLOG_COMMENTS,
        payload: false,
      });
      console.log("catcherrr comment action");
      console.log(error);
      dispatch({
        type: ERROR_BLOG_COMMENTS,
        payload: true,
      });
    }
  };
};

// lyrics like

export const toggleLikeLyrics = (data) => ({
  type: TOGGLE_LYRICS,
  payload: data,
});
export const toggleLikeBlog = (data) => ({
  type: TOGGLE_BLOG,
  payload: data,
});
