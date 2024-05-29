import { useState } from "react";
import "./CocktailSearchPage.css";

const CocktailSearchPage = () => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [cocktails, setCocktails] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (name) {
      params.append("name", name);
    }
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
      setCocktails(data);
      setError(null);
    } catch (err) {
      setError(err.message || "An error occurred");
      setCocktails([]);
    }
  };

  return (
    <div>
      <h1>Cocktail Search</h1>
      <form onSubmit={handleSearch}>
        <div className="cocktail-search-box">
          <p>Search by name</p>
          <input
            className="search-input"
            type="text"
            placeholder="Example: 'margarita'"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Search</button>
        </div>
        <div className="cocktail-search-box">
          <p>Search by ingredient</p>
          <input
            className="search-input"
            type="text"
            placeholder="Example: 'whiskey, vermouth, bitters'"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          <button type="submit">Search</button>
        </div>
      </form>
      {error && <p>{error}</p>}
      <ul>
        {cocktails.map((cocktail, index) => (
          <li key={index}>
            <h2>{cocktail.name}</h2>
            <p>{cocktail.instructions}</p>
            <ul>
              {cocktail.ingredients.map((ingredient, i) => (
                <li key={i}>{ingredient}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CocktailSearchPage;
