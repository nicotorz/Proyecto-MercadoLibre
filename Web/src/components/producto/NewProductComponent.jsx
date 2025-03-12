import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import { fieldsValidate, priceValidate, validatePriceProduct } from "../../utils/utils";
import api from '../../services/api';
import ProductDescription from "./ProductDescriptionComponent";
import ProductImages from "./ProductImagesComponent";
import ProductCharacteristics from "./ProductCharacteristicsComponent";
import Template from "../template/Template";
import 'react-toastify/dist/ReactToastify.css';
import "./NewProduct.css";

const NewProduct = () => {

const navigate = useNavigate();
const [inputDescription, setInputDescription] = useState({title: '', description: '',stock:'', price: '', shipping:{price:''}, category: {id : '',name:''}})
const [inputImages, setInputImages] = useState([])
const [inputCharacteristic, setInputCharacteristic] =useState([])
const [errorMessage, setErrorMessage] = useState('');



const handleSubmit = (e) => {
    e.preventDefault(); 
    const { title, description, price, stock, shipping, category } = inputDescription;
    const images = inputImages;
    const characteristics = inputCharacteristic;
    
    if (fieldsValidate(inputDescription, images, characteristics)) {
        toast.error("Por favor, completa todos los campos obligatorios.");
        return;
    }
    
    if(priceValidate(stock)){
        toast.error('El Stock no puede ser menor a 1');
        return;
    }
    
    if(validatePriceProduct(price)){
        toast.error('El precio debe ser mayor a 1');
        return;
    }
    
    if(priceValidate(shipping.price)){
        toast.error('El precio del Shipping debe ser mayor a 0');
        return;
    }
    
    
    api.newProduct(title, description, price, stock, shipping, category, images, characteristics)
        .then((response) => {
            navigate(`/products/${response.id}`)             
        })
        .catch((error) => { 
            setErrorMessage( error.title);
        });
};

return (
    <>
    <Template>
    <ToastContainer position="bottom-right" 
        autoClose={5000} 
        hideProgressBar 
        newestOnTop 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover />
    <div className="product-container">
            <h1 className="product-title">New Product</h1>
            <ProductDescription bodyDescription = {inputDescription} 
                                onInputChange = {setInputDescription}/> 
            <hr className="line2"></hr>
            <ProductImages images={inputImages}
                           setImages = {setInputImages}/>
            <hr className="line2"></hr> 
            <ProductCharacteristics characteristics= {inputCharacteristic}
                                    setCharacteristics = {setInputCharacteristic}/>
            <hr className="line2"></hr>
            <p className="msg-error">{errorMessage}</p>
            <button className= "buton-imag"onClick={handleSubmit}>Crear</button>
        </div>
    </Template>
    </>
);

};

export default NewProduct;