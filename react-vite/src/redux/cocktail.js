// Action Types
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
export const createCocktail = (cocktailData) => async (dispatch) => {
  const response = await fetch("/api/cocktails/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cocktailData),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addCocktail(data));
    return data;
  } else {
    const errors = await response.json();
    console.error(errors);
    return errors;
  }
};

export const fetchCocktails = () => async (dispatch) => {
  const response = await fetch("/api/cocktails");

  if (response.ok) {
    const data = await response.json();
    dispatch(setCocktails(data));
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
    default:
      return state;
  }
};

export default cocktailReducer;
