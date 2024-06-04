import { useEffect, useState } from "react";
import CocktailCard from "./CocktailCard";
import "./HomePage.css";

const HomePage = () => {
  const [recentCocktails, setRecentCocktails] = useState([]);
  const [mostCommentedCocktails, setMostCommentedCocktails] = useState([]);
  const [searchedCocktails, setSearchedCocktails] = useState([]);
  const [ingredients, setIngredients] = useState("");
  const [error, setError] = useState(null);

  const ingredientsByCategory = {
    juice: ["Lemon", "Lime", "Orange", "Pineapple", "Cranberry"],
    syrup: ["Simple", "Grenadine", "Honey", "Raspberry", "Ginger", "Cinnamon"],
    liquor: ["Vodka", "Gin", "Rum", "Tequila", "Whiskey", "Vermouth"],
    herbs: ["Mint", "Basil", "Rosemary", "Lavender", "Cinnamon"],
    misc: ["Bitters", "Sugar", "Cola", "Soda", "Wine", "Sparkling"],
  };

  useEffect(() => {
    fetch("/api/cocktails/recent")
      .then((response) => response.json())
      .then((data) => setRecentCocktails(data))
      .catch((error) =>
        console.error("Error fetching recent cocktails:", error)
      );

    fetch("/api/cocktails/most_comments")
      .then((response) => response.json())
      .then((data) => setMostCommentedCocktails(data))
      .catch((error) =>
        console.error("Error fetching most commented cocktails:", error)
      );
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (ingredients) {
      params.append("ingredients", ingredients);
    }

    try {
      const response = await fetch(
        `/api/search-cocktails?${params.toString()}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setSearchedCocktails(data);
      setError(null);
    } catch (err) {
      setError(err.message || "An error occurred");
      setSearchedCocktails([]);
    }
  };

  const addIngredient = (ingredient) => {
    const newIngredients = ingredients
      ? `${ingredients}, ${ingredient}`
      : ingredient;
    setIngredients(newIngredients);
  };

  const handleReset = () => {
    setIngredients("");
    setSearchedCocktails([]);
    setError(null);
  };

  return (
    <div className="homepage">
      <div className="left-column">
        <h2 className="cocktail-list-header">Most Recent Cocktails</h2>
        <div className="cocktail-grid">
          {recentCocktails.slice(0, 2).map((cocktail) => (
            <CocktailCard key={cocktail.id} cocktail={cocktail} />
          ))}
        </div>

        <h2 className="cocktail-list-header">Most Commented Cocktails</h2>
        <div className="cocktail-grid">
          {mostCommentedCocktails.slice(0, 2).map((cocktail) => (
            <CocktailCard key={cocktail.id} cocktail={cocktail} />
          ))}
        </div>
      </div>

      <div className="right-column">
        <h2>Search Cocktails by Ingredients</h2>
        <h5>
          You will only see cocktails that include ALL selected ingredients
        </h5>
        <form onSubmit={handleSearch}>
          <div className="cocktail-search-box">
            <input
              className="search-input"
              type="text"
              placeholder="CLICK THE INGREDIENTS BELOW TO FILL THE SEARCH BAR !"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
            <div className="search-buttons">
              <button type="submit">Search</button>
              <button type="button" onClick={handleReset}>
                Reset
              </button>
            </div>
          </div>
        </form>
        {error && <p>{error}</p>}

        <div className="available-ingredients">
          <div className="ingredient-columns">
            {Object.entries(ingredientsByCategory).map(
              ([category, items], idx) => (
                <div key={idx} className="ingredient-column">
                  <h4>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </h4>
                  <div className="ingredient-list">
                    {items.map((ingredient, index) => (
                      <button
                        key={index}
                        onClick={() => addIngredient(ingredient)}
                        className="ingredient-button"
                      >
                        {ingredient}
                      </button>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        <div className="cocktail-search-container">
          {searchedCocktails.map((cocktail, index) => (
            <div key={index} className="cocktail-card">
              <h2>{cocktail.name}</h2>
              <p>{cocktail.instructions}</p>
              <ul>
                {cocktail.ingredients.map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
