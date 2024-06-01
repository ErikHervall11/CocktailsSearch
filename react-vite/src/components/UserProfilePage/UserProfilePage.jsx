import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCocktails, deleteCocktailThunk } from "../../redux/cocktail";
import EditCocktailModal from "../EditCocktailModal/EditCocktailModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const cocktails = useSelector((state) => state.cocktails.cocktails);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCocktail, setCurrentCocktail] = useState(null);

  useEffect(() => {
    dispatch(fetchCocktails());
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

  return (
    <div>
      <h1>{user.username}&apos;s Profile</h1>
      <div>
        {cocktails
          .filter((cocktail) => cocktail.created_by === user.id)
          .map((cocktail) => (
            <div key={cocktail.id}>
              <h2>{cocktail.name}</h2>
              <p>{cocktail.description}</p>
              <p>{cocktail.instructions}</p>
              {/* <p>{cocktail.ingredients}</p> */}
              {/* <p>{cocktail.instructions}</p> */}
              <button onClick={() => handleEdit(cocktail)}>Edit</button>
              <button onClick={() => openDeleteModal(cocktail)}>Delete</button>
            </div>
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
