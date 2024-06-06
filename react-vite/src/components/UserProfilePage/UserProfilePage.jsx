import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCocktails, deleteCocktailThunk } from "../../redux/cocktail";
import { fetchComments } from "../../redux/comments";
import { Link, useParams } from "react-router-dom";
import EditCocktailModal from "../EditCocktailModal/EditCocktailModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import "./UserProfilePage.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const UserProfilePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const profileUserId = parseInt(id, 10);
  const cocktails = useSelector((state) =>
    state.cocktails.cocktails.filter(
      (cocktail) => cocktail.created_by === profileUserId
    )
  );
  const comments = useSelector((state) => state.comments.comments);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCocktail, setCurrentCocktail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCocktails());
      await dispatch(fetchComments());
      setIsLoading(false);
    };
    fetchData();
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
    .filter((comment) => comment.user_id === profileUserId)
    .map((comment) => comment.cocktail_id);

  const commentedCocktailsSet = new Set(commentedCocktails);
  const uniqueCommentedCocktails = useSelector((state) =>
    state.cocktails.cocktails.filter((cocktail) =>
      commentedCocktailsSet.has(cocktail.id)
    )
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img
          src={user.profile_image}
          alt="Profile Image"
          className="profile-image"
        />
        <h1>{user.username}&apos;s Bar</h1>
      </div>
      <div className="my-cocktails">
        <h2 className="my-cocktails-header">My Cocktails</h2>
        {user.id === profileUserId && (
          <Link to="/cocktails/new" className="add-new-cocktail-button">
            Add New Cocktail
          </Link>
        )}
      </div>
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
            {user.id === profileUserId && (
              <>
                <button className="edit" onClick={() => handleEdit(cocktail)}>
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() => openDeleteModal(cocktail)}
                >
                  Delete
                </button>
              </>
            )}
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
                      comment.user_id === profileUserId
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
