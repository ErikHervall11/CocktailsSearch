// store/cocktail.js
export const createCocktail = (cocktailData) => async (dispatch) => {
  const response = await fetch('/api/cocktail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cocktailData),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addCocktail(data));
    return data;
  } else {
    // Handle errors
    const errors = await response.json();
    console.error(errors);
  }
};

const addCocktail = (cocktail) => ({
  type: 'ADD_COCKTAIL',
  cocktail,
});
