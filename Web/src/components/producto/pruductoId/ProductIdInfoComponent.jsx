import { useNavigate, useParams, Link} from 'react-router-dom'; 
import { useState, useEffect } from "react";
import api from '../../../services/api';
import './ProductIdInfo.css';
import starLogo from '../../../assets/start.svg';
import starllenoLogo from '../../../assets/starLleno.svg';
import defaultImage from "../../../assets/defaultImage.svg"

const ProductIdInfo = ({productFound, userFound,productsLikeds, setProductsLikeds}) => {

const {id} =useParams();
const navigate = useNavigate();
const [actualImage, setActualImage] = useState( null);
const [cantidad, setCantidad] = useState(1);
const [buton, setState] = useState(false);
const isOwner = userFound? userFound.name === productFound.owner.name : false;

useEffect(() => {
   setImageProductFound();
}, [productFound]);


const setImageProductFound = async () => {
    if(productFound.images.length > 0) {
        setActualImage(productFound.images[0]);
    }
}

const handleImageClick = (image) => {
    setActualImage(image);
};

const handleCantidadChange = (event) => {
    setCantidad(event.target.value);
};

const opcionesCantidad = Array.from({ length: productFound.stock }, (_, i) => i + 1);
  
const handleEdit = () => {
    navigate(`/editproduct/${id}`)
}

const handlePurchase = () => {
    api.addToCart({productId: id, amount: cantidad})
    navigate(`/cart`)
}

const handleClick = () => {
    if(localStorage.getItem('token')){
        setState(!buton);
        api.likedProduct(id)
        .then((response) =>{
            setProductsLikeds(response.likedProducts);
        })
        .catch((error) => {
            console.error(error.title);
        })
    }
};

const containsProduct =  (id) =>{
    return productsLikeds.some(product => product.id === id);
};

    return (
        <div className="productid-info-block"> 
            <div className="productid-images-block">
                <div className="productid-images"> 
                    {productFound.images && productFound.images.length > 0 ? (
                        productFound.images.map((image, index) => (
                            <img 
                                key={index} 
                                src={image} 
                                alt={`image-${index}`} 
                                className={`image ${image === actualImage ? 'selected' : ''}`}
                                onClick={() => handleImageClick(image)}
                                onError={(e) => (e.target.src = defaultImage)}
                            />
                        ))
                    ) : (
                        <p>No hay imágenes disponibles</p>
                    )}
                </div>
                <div className="productid-image"> 
                    <img src={actualImage} alt="Producto" onError={(e) => (e.target.src = defaultImage)}/>
                </div>
            </div>
            <div className="productid-details-block"> 
                <div className="productid-details"> 
                    <div className="productid-title-block">
                        <p className="productid-title"> {productFound.title} </p>
                        <p className="productid-owner"> 
                            Por <Link to={`/user/${productFound.owner.id}`} className="productid-owner">{productFound.owner.name}</Link>
                        </p>
                    </div>
                    <div className="productid-price-block">
                        <p className="productid-price"> ${parseFloat(productFound.price).toFixed(2)} </p>
                        <p className="productid-cuotes"> En 12 cuotas de ${(productFound.price / 12).toFixed(2)} </p>  
                    </div>
                    <div className="productid-shipping-block"> 
                        <p className="productid-shipping"> Envio: $ {parseFloat(productFound.shipping.price).toFixed(2)} </p>
                    </div>
                    <div className="productid-stock-block"> 
                        <p className="stock-disponible"> Stock disponible </p>
                        <p className="productid-stock"> +{productFound.stock} disponibles </p>
                    </div>
                    <div className="productid-cantidad-block">
                        <p className="productid-cantidad"> Cantidad: </p> 
                        <select 
                            className="productid-cantidad-select"
                            value={cantidad}
                            onChange={handleCantidadChange}
                        >   
                            {opcionesCantidad.map((opcion) => (
                                <option key={opcion} value={opcion}>
                                    {opcion} unidad{opcion > 1 ? 'es' : ''}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="star-block">
                        <button className="starButon" onClick={handleClick}>
                            <img src={containsProduct(id) ? starllenoLogo : starLogo} className="star" alt="start logo"/>
                        </button>
                    </div>
                </div>
                <button className="addcart-block" 
                        onClick={handlePurchase}
                        disabled = {!userFound}> 
                        Agregar al carrito 
                </button>
                {isOwner && (
                    <button className="addcart-block" onClick={handleEdit}> Editar </button>
                )}
            </div>
        </div>
    );
    
}

export default ProductIdInfo