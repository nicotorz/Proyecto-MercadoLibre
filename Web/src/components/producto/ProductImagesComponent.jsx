import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import "./ProductImage.css";

const ProductImages = ({images, setImages}) => {


const [urlImage, setUrlImage] = useState(''); 

const handleUrlImageChange = (e) => {
  setUrlImage(e.target.value);
};

const addImage = () => { 
  const imagesRegex = /^(www.|http:\/\/|https:\/\/).*(.jpg|.png|.jpeg)$/ 
  if (urlImage.trim() && imagesRegex.test(urlImage) ) {
      setImages([...images, urlImage]);
      setUrlImage('');
  }else{
    toast.error('El link de la imagen no es valido o se encuentra vacio');
    return;
  }
};

const deleteImage = (index) => {
  setImages(images.filter((_, i) => i !== index));
};

return (
  <>
  <ToastContainer position="bottom-right" 
        autoClose={5000} 
        hideProgressBar 
        newestOnTop 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover />
    <div className="image-block">
        <div className="block-image"> 
            <label className="images"> Images </label>
            <div className="add-image">
              <input className="input-image"
                     type="text" 
                     placeholder="Placeholder"
                     value={urlImage}
                     onChange= {handleUrlImageChange} />
              <button className="buton-imag"onClick={() => addImage(urlImage)}> Agregar Imagen </button>
            </div>  
        </div>
        <div className="list-images">
        {images.length > 0 ? (
          images.map((url, index) => (
            <div className="list-image" key={index}>
              <span className="url">{url}</span>
              <button className="buton-delete"onClick={() => deleteImage(index)}> Delete </button>
            </div>
          ))
        ) : (
          <p className="no-text">No agregaste ninguna imagen</p>
        )}
      </div>
    </div>
  </>  
)

}

export default ProductImages