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
  // const csrfToken = getCookie('csrf_token');
  const response = await fetch("/api/cocktail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'X-CSRFToken': csrfToken,
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
  }
};

export const fetchCocktails = () => async (dispatch) => {
  const response = await fetch("/api/cocktail");

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

// Utility Function to Get CSRF Token
// function getCookie(name) {
//   let cookieValue = null;
//   if (document.cookie && document.cookie !== '') {
//     const cookies = document.cookie.split(';');
//     for (let i = 0; i < cookies.length; i++) {
//       const cookie = cookies[i].trim();
//       if (cookie.substring(0, name.length + 1) === (name + '=')) {
//         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//         break;
//       }
//     }
//   }
//   return cookieValue;
// }
