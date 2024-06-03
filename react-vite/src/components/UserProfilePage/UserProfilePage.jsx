import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCocktails, deleteCocktailThunk } from "../../redux/cocktail";
import { fetchComments } from "../../redux/comments";
import { Link } from "react-router-dom";
import EditCocktailModal from "../EditCocktailModal/EditCocktailModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import "./UserProfilePage.css";

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const cocktails = useSelector((state) =>
    state.cocktails.cocktails.filter(
      (cocktail) => cocktail.created_by === user.id
    )
  );
  const comments = useSelector((state) => state.comments.comments);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCocktail, setCurrentCocktail] = useState(null);

  useEffect(() => {
    dispatch(fetchCocktails());
    dispatch(fetchComments());
  }, [dispatch]);

  const handleDelete = (cocktailId) => {
    dispatch(deleteCocktailThunk(cocktailId));
    setIsDeleteModalOpen(false);
  };

  const openDeleteModal = (cocktail) => {
    setCurrentCocktail(cocktail);
    setIsDeleteModalOpen(true);
  };

  const handleEdit = (cocktail) => {
    setCurrentCocktail(cocktail);
    setIsEditModalOpen(true);
  };

  const commentedCocktails = comments
    .filter((comment) => comment.user_id === user.id)
    .map((comment) => comment.cocktail_id);

  const commentedCocktailsSet = new Set(commentedCocktails);
  const uniqueCommentedCocktails = useSelector((state) =>
    state.cocktails.cocktails.filter((cocktail) =>
      commentedCocktailsSet.has(cocktail.id)
    )
  );

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img
          src={user.profile_image}
          alt="Profile Image"
          className="profile-image"
        />
        <h1>{user.username}&apos;s Profile</h1>
      </div>
      <h2>My Cocktails</h2>
      <div className="cocktail-grid">
        {cocktails.map((cocktail) => (
          <div key={cocktail.id} className="cocktail-card">
            <img src={cocktail.image_url} alt={cocktail.name} />
            <h2>{cocktail.name}</h2>
            <p>{cocktail.description}</p>
            <p>{cocktail.instructions}</p>
            <ul>
              {cocktail.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.amount} {ingredient.unit} of{" "}
                  {ingredient.ingredient.name}
                </li>
              ))}
            </ul>
            <button className="edit" onClick={() => handleEdit(cocktail)}>
              Edit
            </button>
            <button
              className="delete"
              onClick={() => openDeleteModal(cocktail)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <h2>Commented Cocktails</h2>
      <div className="cocktail-grid">
        {uniqueCommentedCocktails.map((cocktail) => (
          <Link
            to={`/cocktails/${cocktail.id}`}
            key={cocktail.id}
            className="cocktail-card"
          >
            <img src={cocktail.image_url} alt={cocktail.name} />
            <h2>{cocktail.name}</h2>
            <p>{cocktail.description}</p>
            <div>
              <div>Your Comment:</div>
              <p>
                {
                  comments.find(
                    (comment) =>
                      comment.cocktail_id === cocktail.id &&
                      comment.user_id === user.id
                  )?.content
                }
              </p>
            </div>
          </Link>
        ))}
      </div>
      {isEditModalOpen && (
        <EditCocktailModal
          cocktail={currentCocktail}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          onDelete={() => handleDelete(currentCocktail.id)}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};

export default UserProfilePage;
