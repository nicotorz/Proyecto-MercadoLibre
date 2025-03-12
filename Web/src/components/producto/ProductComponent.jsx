import React, {useEffect,useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import starLogo from "../../assets/start.svg"
import starllenoLogo from "../../assets/starLleno.svg"
import defaultImage from "../../assets/defaultImage.svg"
import "./Producto.css";
import api from '../../services/api';

const Producto = ({isLogedIn, descriptionProduct, productLogo, precio, owner, id, productsLiked, setProductLiked}) =>{
    
    const [buton, setState] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const containsProduct = async () => {
            const idProducts = productsLiked.map((producto) => (producto.id));
            setState(idProducts.includes(id));
        };
        containsProduct();
}), [productsLiked, id];

    const handleClick = () => {
        if(isLogedIn){
            setState(!buton);
            api.likedProduct(id)
            .then(response => {
                setProductLiked(response.likedProducts);
            })
            .catch((error) => {
                console.error(error);
            })
        }
    };

    const handleClickProduct = () => {
        navigate(`/products/${id}`)
    }

    
return(
        <div className="producto" >

            <div className="starLogo">
                <button className="starButon" onClick={handleClick}>
                    <img src={buton ? starllenoLogo : starLogo} className="star" alt="start logo"/>
                </button>
            </div>

            <div className="productLogo" onClick={handleClickProduct}>
                <img src={productLogo}  
                     alt="Producto" 
                     onError={(e) => (e.target.src = defaultImage)}/>
            </div>

            <hr className="line"></hr>

            <div className="description">
                <div className="descriptionProduct">
                    <p className="descripcion">{descriptionProduct}</p>
                    <p className="owner"> 
                        <Link to={`/user/${owner.id}`} className="productid-owner">{owner.name}</Link>
                    </p>
                </div>
                <div className="precioYcuotas">
                    <p className="precio">${precio.toFixed(2)}</p>
                    <p className="cuotas">En 12 cuotas de ${(precio / 12).toFixed(2)}</p> 
                </div>
            </div>
        </div>
    )
};

export default Producto; 