const DeleteCommentConfirmationModal = ({ onDelete, onCancel }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Are you sure you want to delete this comment?</h2>
        <button onClick={onDelete}>Yes, delete</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteCommentConfirmationModal;
