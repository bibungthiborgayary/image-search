import PropTypes from "prop-types";
import "./Modal.css";

const Modal = ({ selectedImage, closeModal }) => {
  console.log("Selected Image: ", selectedImage);
  if (!selectedImage) return null; // Don't render anything if no image is selected

  return (
    <div className="modal" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={selectedImage.src.large} alt={selectedImage.alt || "Image"} />
        <span className="close-button" onClick={closeModal}>&times;</span>
      </div>
    </div>
  );
};

Modal.propTypes = {
    selectedImage: PropTypes.shape({
      src: PropTypes.shape({
        large: PropTypes.string.isRequired, // The URL for the image must be provided
      }).isRequired,
      alt: PropTypes.string, // Alt text is optional
    }),
    closeModal: PropTypes.func.isRequired, // closeModal must be a function
  };

export default Modal;
