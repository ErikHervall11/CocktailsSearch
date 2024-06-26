// CocktailDetailsPage.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCocktailById,
  fetchCocktails,
  addFavoriteThunk,
  removeFavoriteThunk,
} from "../../redux/cocktail";
import {
  fetchCommentsById,
  createComment,
  updateCommentThunk,
  deleteCommentThunk,
} from "../../redux/comments";
import DeleteCommentConfirmationModal from "../DeleteConfirmationModal/DeleteCommentConfirmationModal";
import "./CocktailDetailsPage.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const CocktailDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cocktail = useSelector((state) =>
    state.cocktails.cocktails.find((cocktail) => cocktail.id === parseInt(id))
  );
  const comments = useSelector((state) => state.comments.comments);
  const user = useSelector((state) => state.session.user);
  const favorites = useSelector((state) => state.cocktails.favorites);

  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editingContent, setEditingContent] = useState("");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCommentId, setCurrentCommentId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isFavorited = favorites.some(
    (favorite) => favorite.cocktail_id === cocktail?.id
  );

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCommentsById(id));
      await dispatch(fetchCocktailById(id));
      await dispatch(fetchCocktails());
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch, id]);

  if (isLoading || !cocktail) return <LoadingSpinner />;

  const handleCreateComment = async () => {
    const formData = new FormData();
    formData.append("content", newComment);
    formData.append(
      "csrf_token",
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("csrf_token="))
        .split("=")[1]
    );

    const result = await dispatch(createComment(cocktail.id, formData));
    if (!result.errors) setNewComment("");
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment.id);
    setEditingContent(comment.content);
  };

  const handleUpdateComment = async (commentId) => {
    const formData = new FormData();
    formData.append("content", editingContent);
    formData.append(
      "csrf_token",
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("csrf_token="))
        .split("=")[1]
    );

    await dispatch(updateCommentThunk(commentId, formData));
    setEditingComment(null);
  };

  const handleDeleteComment = async (commentId) => {
    setCurrentCommentId(commentId);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteComment = async () => {
    await dispatch(deleteCommentThunk(currentCommentId));
    setIsDeleteModalOpen(false);
    setCurrentCommentId(null);
  };

  const handleFavorite = async () => {
    if (isFavorited) {
      await dispatch(removeFavoriteThunk(cocktail.id));
    } else {
      await dispatch(addFavoriteThunk(cocktail.id));
    }
  };

  const hasUserCommented = comments.some(
    (comment) => comment.user_id === user.id
  );

  return (
    <div className="cocktail-details">
      <button
        className={isFavorited ? "favorite-button" : "unfavorite-button"}
        id={isFavorited ? "fav-button-details" : "unfav-button-details"}
        onClick={() => handleFavorite(cocktail.id)}
      >
        {isFavorited ? (
          <img
            src="/shakerr.png"
            alt="Loading..."
            className="shaker"
            id="shake"
          />
        ) : (
          "Favorite"
        )}
      </button>
      <div id="favorite-details">
        {isFavorited && <h2>This Cocktail is One of Your Favorites!</h2>}
      </div>
      <img src={cocktail.image_url} alt={cocktail.name} />
      <h1>{cocktail.name}</h1>
      <p>{cocktail.description}</p>
      <h3>Instructions</h3>
      <p>{cocktail.instructions}</p>
      <h3>Ingredients</h3>
      <ul>
        {cocktail.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.amount} {ingredient.unit} of{" "}
            {ingredient.ingredient.name}
          </li>
        ))}
      </ul>

      <div className="comment-area">
        <h3>Comments</h3>
        {user && user.id !== cocktail.created_by && !hasUserCommented && (
          <div className="comment-space">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment"
              className="details-textarea"
            ></textarea>
            <button onClick={handleCreateComment}>Submit</button>
          </div>
        )}
      </div>
      <ul className="comments-list">
        {comments.map((comment) => (
          <li key={comment.id}>
            {editingComment === comment.id ? (
              <div className="update-canel-buttons">
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  className="comment-textarea"
                ></textarea>
                <div className="update-canel-buttons">
                  <button onClick={() => handleUpdateComment(comment.id)}>
                    Update
                  </button>
                  <button onClick={() => setEditingComment(null)}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="comments-list">
                <div className="comments-list-username-comment">
                  <div className="comment-box">
                    <p>Comment by: {comment.user.username}</p>
                  </div>
                  <div className="comment-box">
                    <p>{comment.content}</p>
                  </div>
                </div>
                {comment.user_id === user.id && (
                  <div className="edit-delete-buttons">
                    <button
                      className="edit-button-next-to-delete"
                      onClick={() => handleEditComment(comment)}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDeleteComment(comment.id)}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      {isDeleteModalOpen && (
        <DeleteCommentConfirmationModal
          onDelete={confirmDeleteComment}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CocktailDetailsPage;
