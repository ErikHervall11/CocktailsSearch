import { useState } from "react";
import "./CocktailSearchPage.css";

const CocktailSearchPage = () => {
  const [searchType, setSearchType] = useState("");
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [cocktails, setCocktails] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (searchType === "name" && name) {
      params.append("name", name);
    } else if (searchType === "ingredients" && ingredients) {
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
      setCocktails(data);
      setError(null);
    } catch (err) {
      setError(err.message || "An error occurred");
      setCocktails([]);
    }
  };

  return (
    <div>
      <div className="search-top">
        <h1>Cocktail Search</h1>
        <h3>Search from our database of over 1,000 different cocktails!</h3>
        <h5>If you search by ingredient, separate ingredients by comma</h5>
        <div className="search-toggle-buttons">
          <button
            className={searchType === "name" ? "active" : ""}
            onClick={() => setSearchType("name")}
          >
            Search by Name
          </button>
          <button
            className={searchType === "ingredients" ? "active" : ""}
            onClick={() => setSearchType("ingredients")}
          >
            Search by Ingredient
          </button>
        </div>
        <form onSubmit={handleSearch}>
          {searchType === "name" && (
            <div className="cocktail-search-box">
              <p>SEARCH BY NAME</p>
              <input
                className="search-input"
                type="text"
                placeholder="Example: 'margarita'"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button type="submit">Search</button>
            </div>
          )}
          {searchType === "ingredients" && (
            <div className="cocktail-search-box">
              <p>SEARCH BY INGREDIENT</p>
              <input
                className="search-input"
                type="text"
                placeholder="Example: 'whiskey, vermouth, bitters'"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              />
              <button type="submit">Search</button>
            </div>
          )}
        </form>
      </div>
      {error && <p>{error}</p>}
      <div className="cocktail-search-container">
        {cocktails.map((cocktail, index) => (
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
  );
};

export default CocktailSearchPage;
