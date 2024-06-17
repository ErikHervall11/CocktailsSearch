import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CocktailCard from "./CocktailCard";
import "./HomePage.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const HomePage = () => {
  const [recentCocktails, setRecentCocktails] = useState([]);
  const [mostCommentedCocktails, setMostCommentedCocktails] = useState([]);
  const [searchedCocktails, setSearchedCocktails] = useState([]);
  const [ingredients, setIngredients] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state) => state.session.user);

  const ingredientsByCategory = {
    juice: ["lemon", "lime", "orange", "pineapple", "cranberry"],
    syrup: ["simple", "grenadine", "honey", "raspberry", "ginger"],
    liquor: ["vodka", "gin", "rum", "tequila", "whiskey", "vermouth"],
    herbs: ["mint", "basil", "rosemary", "lavender", "cinnamon"],
    misc: ["bitters", "sugar", "cola", "soda", "wine", "sparkling"],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recentResponse = await fetch("/api/cocktails/recent");
        const recentData = await recentResponse.json();
        setRecentCocktails(recentData);

        const mostCommentedResponse = await fetch(
          "/api/cocktails/most_comments"
        );
        const mostCommentedData = await mostCommentedResponse.json();
        setMostCommentedCocktails(mostCommentedData);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
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

  const handleIngredientClick = (ingredient, category) => {
    let updatedIngredients = ingredients;
    const updatedSelectedIngredients = { ...selectedIngredients };

    if (selectedIngredients[ingredient]) {
      delete updatedSelectedIngredients[ingredient];
      updatedIngredients = updatedIngredients
        .split(", ")
        .filter(
          (ing) => ing !== ingredient && ing !== `${ingredient} ${category}`
        )
        .join(", ");
    } else {
      updatedSelectedIngredients[ingredient] = true;
      updatedIngredients = updatedIngredients
        ? `${updatedIngredients}, ${ingredient}${
            category === "juice" || category === "syrup" ? " " + category : ""
          }`
        : `${ingredient}${
            category === "juice" || category === "syrup" ? " " + category : ""
          }`;
    }

    setSelectedIngredients(updatedSelectedIngredients);
    setIngredients(updatedIngredients);
  };

  const handleReset = () => {
    setIngredients("");
    setSelectedIngredients({});
    setSearchedCocktails([]);
    setError(null);
  };

  if (!user) {
    return (
      <div className="loading-container other-loading">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "50px",
            textAlign: "center",
          }}
        >
          LOG IN TO JOIN THE COCKTAIL COLLECTIVE
        </div>
        <div>
          <img src="/shakerr.png" alt="Loading..." className="shaker" />
        </div>
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="website-header-home">
            <h1>Welcome to Cocktail Collective</h1>
            <h3>
              A place to share your cocktail recipes and see others’ creations
            </h3>
          </div>
          <div className="homepage">
            <div className="left-column">
              <h2 className="cocktail-list-header">Recently Added Cocktails</h2>
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
              <h2>Search Our Non-User-Created Database By Ingredient</h2>
              <h5>
                You will only see cocktails that include ALL selected
                ingredients
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
                              onClick={() =>
                                handleIngredientClick(ingredient, category)
                              }
                              className={`ingredient-button ${
                                selectedIngredients[ingredient]
                                  ? "selected"
                                  : ""
                              }`}
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
        </>
      )}
    </>
  );
};

export default HomePage;
