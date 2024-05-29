import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCocktails } from "../../redux/cocktail";

const CocktailList = () => {
  const dispatch = useDispatch();
  const cocktails = useSelector((state) => state.cocktails.cocktails);

  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);

  return (
    <div>
      <h1>Cocktail List</h1>
      <ul>
        {cocktails.map((cocktail) => (
          <li key={cocktail.id}>{cocktail.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CocktailList;
