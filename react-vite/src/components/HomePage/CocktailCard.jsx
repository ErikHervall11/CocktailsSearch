import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./CocktailCard.css";

const CocktailCard = ({ cocktail }) => {
  return (
    <Link to={`/cocktails/${cocktail.id}`} className="cocktail-card">
      {cocktail.image_url && (
        <img src={cocktail.image_url} alt={cocktail.name} />
      )}
      <h3>{cocktail.name}</h3>
      <p>{cocktail.description}</p>
    </Link>
  );
};

CocktailCard.propTypes = {
  cocktail: PropTypes.shape({
    name: PropTypes.string.isRequired,
    instructions: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    image_url: PropTypes.string,
  }).isRequired,
};

export default CocktailCard;
