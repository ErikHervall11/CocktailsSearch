import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoriteThunk,
  fetchCocktails,
  fetchFavoritesThunk,
  removeFavoriteThunk,
} from "../../redux/cocktail";
import { fetchUsers } from "../../redux/session";
import { Link } from "react-router-dom";
import "./CocktailList.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const CocktailList = () => {
  const dispatch = useDispatch();
  const cocktails = useSelector((state) => state.cocktails.cocktails);
  const favorites = useSelector((state) => state.cocktails.favorites);
  const users = useSelector((state) => state.session.users.users);
  const user = useSelector((state) => state.session.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCocktails());
      await dispatch(fetchUsers());
      await dispatch(fetchFavoritesThunk());
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const handleFavorite = async (cocktailId) => {
    const isFavorited = favorites.some(
      (favorite) => favorite.cocktail_id === cocktailId
    );
    if (isFavorited) {
      await dispatch(removeFavoriteThunk(cocktailId));
    } else {
      await dispatch(addFavoriteThunk(cocktailId));
    }
  };

  if (!Array.isArray(users)) {
    return null;
  }

  const cocktailsByCreator = cocktails.reduce((acc, cocktail) => {
    const creator = users.find((user) => user.id === cocktail.created_by);
    if (creator) {
      if (!acc[creator.username]) {
        acc[creator.username] = [];
      }
      acc[creator.username].push(cocktail);
    }
    return acc;
  }, {});

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1 className="cocktail-list-header">Cocktail List</h1>
      {Object.keys(cocktailsByCreator).map((creator) => (
        <div key={creator}>
          <h2>{creator}'s Cocktails</h2>
          <div className="cocktail-grid" id="list-grid">
            {cocktailsByCreator[creator].map((cocktail) => {
              const isFavorited = favorites.some(
                (favorite) => favorite.cocktail_id === cocktail.id
              );
              return (
                <div key={cocktail.id} className="cocktail-card" id="list-card">
                  <Link
                    to={`/cocktails/${cocktail.id}`}
                    className="no-underline"
                  >
                    <img src={cocktail.image_url} alt={cocktail.name} />
                    <h2>{cocktail.name}</h2>
                    <p>{cocktail.description}</p>
                  </Link>
                  {user && (
                    <button
                      className={
                        isFavorited ? "favorite-button" : "unfavorite-button"
                      }
                      id={isFavorited ? "fav-button" : "unfav-button"}
                      onClick={() => handleFavorite(cocktail.id)}
                    >
                      {isFavorited ? "Favorited!" : "Favorite"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CocktailList;
