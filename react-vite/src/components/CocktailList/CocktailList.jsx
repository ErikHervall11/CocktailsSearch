import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCocktails } from "../../redux/cocktail";
import { fetchUsers } from "../../redux/session";
import { Link } from "react-router-dom";
import "./CocktailList.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const CocktailList = () => {
  const dispatch = useDispatch();
  const cocktails = useSelector((state) => state.cocktails.cocktails);
  const users = useSelector((state) => state.session.users.users);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCocktails());
      await dispatch(fetchUsers());
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch]);

  if (!Array.isArray(users)) {
    return null;
  }

  const sortedCocktails = [...cocktails].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1 className="cocktail-list-header">Cocktail List</h1>
      <div className="cocktail-grid">
        {sortedCocktails.map((cocktail, index) => {
          const creator = users.find((user) => user.id === cocktail.created_by);
          return (
            <Link
              to={`/cocktails/${cocktail.id}`}
              key={index}
              className="cocktail-card"
            >
              <img src={cocktail.image_url} alt={cocktail.name} />
              <h2>{cocktail.name}</h2>
              <p>{cocktail.description}</p>
              <p>Created by: {creator ? creator.username : "Unknown"}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CocktailList;
