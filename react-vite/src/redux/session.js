const getCsrfToken = () => {
  const csrfCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrf_token="));
  return csrfCookie ? csrfCookie.split("=")[1] : null;
};

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const ADD_USER_COCKTAIL = "session/addUserCocktail";
const DELETE_USER_COCKTAIL = "session/DELETE_USER_COCKTAIL";
const SET_USERS = "session/setUsers";

const setUsers = (users) => ({
  type: SET_USERS,
  payload: users,
});

const addUserCocktail = (cocktail) => ({
  type: ADD_USER_COCKTAIL,
  payload: cocktail,
});

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const deleteUserCocktail = (cocktailId) => ({
  type: DELETE_USER_COCKTAIL,
  cocktailId,
});

//THUNKS

export const thunkAuthenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/");
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

export const thunkLogin = (credentials) => async (dispatch) => {
  const csrfToken = getCsrfToken();
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": csrfToken },

    body: JSON.stringify(credentials),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

export const thunkSignup = (user) => async (dispatch) => {
  const csrfToken = getCsrfToken();
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "X-CSRF-TOKEN": csrfToken },
    body: user,
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

export const thunkLogout = () => async (dispatch) => {
  const csrfToken = getCsrfToken();
  await fetch("/api/auth/logout", {
    method: "POST",
    headers: {
      "X-CSRF-TOKEN": csrfToken,
    },
  });
  dispatch(removeUser());
};

export const fetchUsers = () => async (dispatch) => {
  const response = await fetch("/api/users/");
  if (response.ok) {
    const data = await response.json();
    dispatch(setUsers(data));
  }
};

const initialState = {
  user: null,
  users: [],
};

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    case SET_USERS:
      return { ...state, users: action.payload };
    case ADD_USER_COCKTAIL:
      return {
        ...state,
        user: {
          ...state.user,
          cocktails: [...state.user.cocktails, action.payload],
        },
      };
    case DELETE_USER_COCKTAIL:
      return {
        ...state,
        user: {
          ...state.user,
          cocktails: state.user.cocktails.filter(
            (cocktail) => cocktail.id !== action.cocktailId
          ),
        },
      };
    default:
      return state;
  }
}

export { addUserCocktail, deleteUserCocktail };

export default sessionReducer;
