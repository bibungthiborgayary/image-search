import PropTypes from "prop-types"
import "./ImageList.css"

const ImageList = (props) => {

  const imagesArray = Array.isArray(props.foundImages) ? props.foundImages : [props.foundImages]

    const imgs = imagesArray.map(img => {
        return (
          <img key={img.id} src={img.urls.regular} alt={img.alt_description} onClick={()=> props.onImageClick(img)}/>
        );
    })
  return (
    <div className="image__list">
        {imgs}
    </div>
  )
};
ImageList.propTypes = {
  foundImages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,           // Each image must have an id
      urls: PropTypes.shape({
        regular: PropTypes.string.isRequired,    // The URL for the image must be provided
      }).isRequired,
      alt_description: PropTypes.string,         // Alt text is optional but recommended
    })
  ).isRequired, 
  onImageClick: PropTypes.func.isRequired,                                 // foundImages should be an array and is required
};

export default ImageList