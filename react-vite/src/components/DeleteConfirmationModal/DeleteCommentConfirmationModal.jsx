import "./DeleteModal.css";

const DeleteCommentConfirmationModal = ({ onDelete, onCancel }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Are you sure you want to delete this comment?</h2>
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

export default DeleteCommentConfirmationModal;
