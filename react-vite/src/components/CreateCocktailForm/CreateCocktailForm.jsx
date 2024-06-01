import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCocktail } from "../../redux/cocktail";

const CreateCocktailForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState([
    { name: "", amount: "", unit: "" },
  ]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const getCsrfToken = () => {
    const csrfCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrf_token="));
    return csrfCookie ? csrfCookie.split("=")[1] : null;
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "", unit: "" }]);
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("instructions", instructions);
    formData.append("image", image);
    formData.append("csrf_token", getCsrfToken());
    formData.append("created_by", user.id);
    ingredients.forEach((ingredient, index) => {
      formData.append(`ingredients-${index}-name`, ingredient.name);
      formData.append(`ingredients-${index}-amount`, ingredient.amount);
      formData.append(`ingredients-${index}-unit`, ingredient.unit);
    });

    const result = await dispatch(createCocktail(formData));

    if (!result.errors) {
      // Clear the form after successful creation
      setName("");
      setDescription("");
      setInstructions("");
      setImage(null);
      setIngredients([{ name: "", amount: "", unit: "" }]);
      // Optional: Display success message or redirect
    } else {
      // Optional: Handle errors (display error messages)
      console.error(result.errors);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
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
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
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
          <button type="button" onClick={() => handleRemoveIngredient(index)}>
            Remove
          </button>
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
