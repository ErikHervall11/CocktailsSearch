import { addUserCocktail, deleteUserCocktail } from "./session";

const ADD_COCKTAIL = "cocktails/ADD_COCKTAIL";
const SET_COCKTAILS = "cocktails/SET_COCKTAILS";
const UPDATE_COCKTAIL = "cocktails/UPDATE_COCKTAIL";
const DELETE_COCKTAIL = "cocktails/DELETE_COCKTAIL";

// Action
const addCocktail = (cocktail) => ({
  type: ADD_COCKTAIL,
  cocktail,
});

const setCocktails = (cocktails) => ({
  type: SET_COCKTAILS,
  cocktails,
});

const updateCocktail = (cocktail) => ({
  type: UPDATE_COCKTAIL,
  cocktail,
});

const deleteCocktail = (cocktailId) => ({
  type: DELETE_COCKTAIL,
  cocktailId,
});

// Thunks
export const createCocktail = (cocktailData) => async (dispatch, getState) => {
  const response = await fetch("/api/cocktails/new", {
    method: "POST",
    body: cocktailData,
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addCocktail(data));

    const user = getState().session.user;
    if (user) {
      dispatch(addUserCocktail(data));
    }
    return data;
  } else {
    const errors = await response.json();
    console.error(errors);
    return errors;
  }
};

export const fetchCocktails = () => async (dispatch) => {
  try {
    const response = await fetch("/api/cocktails");
    if (response.ok) {
      const data = await response.json();
      dispatch(setCocktails(data));
    } else {
      const errors = await response.json();
      console.error("Errors:", errors);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const updateCocktailThunk =
  (cocktailId, cocktailData) => async (dispatch) => {
    const response = await fetch(`/api/cocktails/${cocktailId}`, {
      method: "PUT",
      body: cocktailData,
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(updateCocktail(data));
      return data;
    } else {
      const errors = await response.json();
      console.error(errors);
      return errors;
    }
  };

export const deleteCocktailThunk =
  (cocktailId) => async (dispatch, getState) => {
    const getCsrfToken = () => {
      const csrfCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("csrf_token="));
      return csrfCookie ? csrfCookie.split("=")[1] : null;
    };

    const response = await fetch(`/api/cocktails/${cocktailId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCsrfToken(),
      },
    });

    if (response.ok) {
      dispatch(deleteCocktail(cocktailId));
      const user = getState().session.user;
      if (user) {
        dispatch(deleteUserCocktail(cocktailId));
      }
    } else {
      const errors = await response.json();
      console.error(errors);
    }
  };

// Initial State
const initialState = {
  cocktails: [],
};

// Reducer
const cocktailReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COCKTAIL:
      return {
        ...state,
        cocktails: [...state.cocktails, action.cocktail],
      };
    case SET_COCKTAILS:
      return {
        ...state,
        cocktails: action.cocktails,
      };
    case UPDATE_COCKTAIL:
      return {
        ...state,
        cocktails: state.cocktails.map((cocktail) =>
          cocktail.id === action.cocktail.id ? action.cocktail : cocktail
        ),
      };
    case DELETE_COCKTAIL:
      return {
        ...state,
        cocktails: state.cocktails.filter(
          (cocktail) => cocktail.id !== action.cocktailId
        ),
      };
    default:
      return state;
  }
};

export default cocktailReducer;
