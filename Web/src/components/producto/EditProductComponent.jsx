import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import api from '../../services/api';
import { fieldsValidate, priceValidate, validatePriceProduct } from "../../utils/utils";
import ProductDescription from "./ProductDescriptionComponent";
import ProductImages from "./ProductImagesComponent";
import ProductCharacteristics from "./ProductCharacteristicsComponent";
import Template from "../template/Template";
import "./NewProduct.css"

const EditProduct = () => {

const [inputDescription, setInputDescription] = useState({title: '', description: '',stock:'', price: '', shipping:{price:''}, category: {id : '',name:''}});
const [inputImages, setInputImages] = useState([]);
const [inputCharacteristic, setInputCharacteristic] =useState([]);
const [errorMessage, setErrorMessage] = useState('');
const navigate = useNavigate();
const { id } = useParams()

useEffect(() => {
    const fetchProduct = async () => {
        try {
            const product = await api.productId(id);
            setInputDescription({
                title: product.title,
                description: product.description,
                stock: product.stock,
                price: product.price,
                shipping: product.shipping,
                category: { id: product.category.id, name: product.category.name },
            });
            setInputImages(product.images);
            setInputCharacteristic(product.characteristics);
        } catch (error) {
            toast.error("Error al cargar el producto");
            console.error(error);
        }
    };
    fetchProduct();
}, [id]);  

const handleSubmit = (e) => {
    const { title, description, price, stock, shipping, category } = inputDescription;

 
    if(priceValidate(stock)){
        toast.error('El Stock no puede ser menor a 1');
        return;
    }

    if(validatePriceProduct(price)){
        toast.error('El Precio debe ser mayor a 1');
        return;
    }
    
    if(priceValidate(shipping.price)){
        toast.error('El precio del Shipping no puede ser negativo');
        return;
    }
    
    if (fieldsValidate(inputDescription, inputImages, inputCharacteristic)) {
        toast.error("Por favor, completa todos los campos obligatorios.");
        return;
    }
    e.preventDefault(); 
    
    api.editProduct(id, title, description, parseFloat(price), stock, shipping, category, inputImages, inputCharacteristic)
    .then((response) => {
         navigate(`/products/${id}`);
    })
    .catch(error => {
        setErrorMessage(error.title)
    })
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
        <Template>
            <div className="product-container">
                <h1 className="product-title">Edit Product</h1>
                <ProductDescription bodyDescription={inputDescription} onInputChange={setInputDescription}/> 
                <hr className="line2"></hr>
                <ProductImages images={inputImages} setImages={setInputImages}/>
                <hr className="line2"></hr>
                <ProductCharacteristics characteristics={inputCharacteristic} setCharacteristics={setInputCharacteristic}/>
                <hr className="line2"></hr>
                <p className="msg-error">{errorMessage}</p>
                <button className= "buton-imag" onClick={handleSubmit}>Actualizar</button>
            </div>
        </Template>
    </>
);

};

export default EditProduct;