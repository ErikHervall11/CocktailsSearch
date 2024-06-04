const SET_COMMENTS = "comments/SET_COMMENTS";
const ADD_COMMENT = "comments/ADD_COMMENT";
const UPDATE_COMMENT = "comments/UPDATE_COMMENT";
const DELETE_COMMENT = "comments/DELETE_COMMENT";

// Actions
const setComments = (comments) => ({
  type: SET_COMMENTS,
  comments,
});

const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment,
});

const updateComment = (comment) => ({
  type: UPDATE_COMMENT,
  comment,
});

const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  commentId,
});

// Thunks
export const fetchCommentsById = (cocktailId) => async (dispatch) => {
  const response = await fetch(`/api/cocktails/${cocktailId}/comments`);
  if (response.ok) {
    const data = await response.json();
    dispatch(setComments(data));
  }
};

export const fetchComments = () => async (dispatch) => {
  const response = await fetch("/api/comments");
  if (response.ok) {
    const data = await response.json();
    dispatch(setComments(data));
  }
};

export const createComment = (cocktailId, commentData) => async (dispatch) => {
  const response = await fetch(`/api/cocktails/${cocktailId}/comments`, {
    method: "POST",
    body: commentData,
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(addComment(data));
    return data;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const updateCommentThunk =
  (commentId, commentData) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: "PUT",
      body: commentData,
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(updateComment(data));
      return data;
    } else {
      const errors = await response.json();
      return errors;
    }
  };

export const deleteCommentThunk = (commentId) => async (dispatch) => {
  const getCsrfToken = () => {
    const csrfCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrf_token="));
    return csrfCookie ? csrfCookie.split("=")[1] : null;
  };

  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCsrfToken(),
    },
  });

  if (response.ok) {
    dispatch(deleteComment(commentId));
  } else {
    const errors = await response.json();
    console.error(errors);
  }
};

const initialState = {
  comments: [],
};

// Reducer
const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENTS:
      return {
        ...state,
        comments: action.comments,
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.comment],
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.id === action.comment.id ? action.comment : comment
        ),
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment.id !== action.commentId
        ),
      };
    default:
      return state;
  }
};

export { setComments, addComment, deleteComment };

export default commentsReducer;
