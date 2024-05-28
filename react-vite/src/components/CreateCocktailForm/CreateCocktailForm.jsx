import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCocktail } from "../../redux/cocktail";

const CreateCocktailForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredients, setIngredients] = useState([
    { name: "", amount: "", unit: "" },
  ]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "", unit: "" }]);
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = ingredients.map((ingredient, i) => {
      if (i === index) {
        return { ...ingredient, [field]: value };
      }
      return ingredient;
    });
    setIngredients(newIngredients);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCocktail = {
      name,
      description,
      instructions,
      ingredients,
    };
    dispatch(createCocktail(newCocktail, user.id));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Cocktail Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <textarea
        placeholder="Instructions"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        required
      />
      {ingredients.map((ingredient, index) => (
        <div key={index}>
          <input
            type="text"
            name="name"
            placeholder="Ingredient Name"
            value={ingredient.name}
            onChange={(e) =>
              handleIngredientChange(index, "name", e.target.value)
            }
            required
          />
          <input
            type="text"
            name="amount"
            placeholder="Amount"
            value={ingredient.amount}
            onChange={(e) =>
              handleIngredientChange(index, "amount", e.target.value)
            }
            required
          />
          <input
            type="text"
            name="unit"
            placeholder="Unit"
            value={ingredient.unit}
            onChange={(e) =>
              handleIngredientChange(index, "unit", e.target.value)
            }
            required
          />
        </div>
      ))}
      <button type="button" onClick={handleAddIngredient}>
        Add Ingredient
      </button>
      <button type="submit">Create Cocktail</button>
    </form>
  );
};

export default CreateCocktailForm;
