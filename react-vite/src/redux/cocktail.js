// Action Types
import { addUserCocktail } from "./session";

const ADD_COCKTAIL = "cocktails/ADD_COCKTAIL";
const SET_COCKTAILS = "cocktails/SET_COCKTAILS";

// Action Creators
const addCocktail = (cocktail) => ({
  type: ADD_COCKTAIL,
  cocktail,
});

const setCocktails = (cocktails) => ({
  type: SET_COCKTAILS,
  cocktails,
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
    default:
      return state;
  }
};

export default cocktailReducer;
