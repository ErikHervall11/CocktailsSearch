import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCocktailThunk } from "../../redux/cocktail";
import "./Modal.css";

const EditCocktailModal = ({ cocktail, onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(cocktail.name || "");
  const [description, setDescription] = useState(cocktail.description || "");
  const [instructions, setInstructions] = useState(cocktail.instructions || "");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(cocktail.image_url || "");
  const [ingredients, setIngredients] = useState(
    cocktail.ingredients.length > 0
      ? cocktail.ingredients.map((ingredient) => ({
          name: ingredient.ingredient.name,
          amount: ingredient.amount,
          unit: ingredient.unit,
        }))
      : [{ name: "", amount: "", unit: "" }]
  );

  const getCsrfToken = () => {
    const csrfCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrf_token="));
    return csrfCookie ? csrfCookie.split("=")[1] : null;
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("instructions", instructions);
    if (image) {
      formData.append("image", image);
    } else {
      formData.append("existing_image_url", imagePreview);
    }
    ingredients.forEach((ingredient, index) => {
      formData.append(`ingredients-${index}-name`, ingredient.name);
      formData.append(`ingredients-${index}-amount`, ingredient.amount);
      formData.append(`ingredients-${index}-unit`, ingredient.unit);
    });
    formData.append("csrf_token", getCsrfToken());

    await dispatch(updateCocktailThunk(cocktail.id, formData));
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
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
          <input type="file" onChange={handleImageChange} />
          {imagePreview && (
            <div>
              <p>Image Preview:</p>
              <h5>Current image will be used if no new image is uploaded</h5>
              <img
                className="image-preview"
                src={imagePreview}
                alt="Cocktail preview"
              />
            </div>
          )}
          {ingredients.map((ingredient, index) => (
            <div key={index}>
              <input
                type="text"
                name="name"
                placeholder="Ingredient Name"
                value={ingredient.name || ""}
                onChange={(e) =>
                  handleIngredientChange(index, "name", e.target.value)
                }
                required
              />
              <input
                type="text"
                name="amount"
                placeholder="Amount"
                value={ingredient.amount || ""}
                onChange={(e) =>
                  handleIngredientChange(index, "amount", e.target.value)
                }
                required
              />
              <input
                type="text"
                name="unit"
                placeholder="Unit"
                value={ingredient.unit || ""}
                onChange={(e) =>
                  handleIngredientChange(index, "unit", e.target.value)
                }
                required
              />
            </div>
          ))}
          <button type="submit">Update Cocktail</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCocktailModal;
