import "./DeleteModal.css";

const DeleteConfirmationModal = ({ onDelete, onCancel }) => {
  return (
    <div className="modal-delete-confirm">
      <div className="modal-content-edit">
        <h2>Are you sure you want to delete this cocktail?</h2>
        <div className="delete-modal-buttons">
          <button
            className="cancel-button delete-modal-button"
            onClick={onDelete}
          >
            Delete
          </button>
          <button className="add-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
