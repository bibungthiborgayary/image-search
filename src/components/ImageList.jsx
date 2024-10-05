import PropTypes from 'prop-types';
import "./ImageList.css";

const ImageList = ({ foundImages, onImageClick }) => {
  return (
    <div className="image__list">
      {foundImages.map((image) => (
        <div key={image.id.toString()} className="image__item" onClick={() => onImageClick(image)}>
          <img src={image.src.large} alt={image.alt || "image"} />
        </div>
      ))}
    </div>
  );
};

ImageList.propTypes = {
  foundImages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      src: PropTypes.shape({
        large: PropTypes.string.isRequired,
      }).isRequired,
      alt: PropTypes.string,
    })
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageList;
