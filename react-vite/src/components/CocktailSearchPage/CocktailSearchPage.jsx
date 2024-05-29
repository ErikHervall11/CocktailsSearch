import { useState } from "react";

const CocktailSearchPage = () => {
  const [query, setQuery] = useState("");
  const [cocktails, setCocktails] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/search-cocktails?query=${query}`);
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
      <h1>Home Page</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a cocktail"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button type="submit">Search</button>
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
