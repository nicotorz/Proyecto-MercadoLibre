import React from 'react';
import './EmptyCartPage.css'; 
import carrito from '../../assets/cart.svg';
import { useNavigate } from 'react-router-dom';
import Template from "../template/Template";

const EmptyCart = () => {

  const navigate = useNavigate(); 

  const handleRedirect = () => {
    navigate('/'); 
  };

  return (
    
    <>
    <Template>
    <div className="empty-cart-container">
      <div className='product-empty-container'> 

      <img src={carrito} alt="Shopping Basket" className="shopping-basket-icon" />
      <p>Empezá un carrito de compras!</p>
      
      <button className="buy-button" onClick={handleRedirect}> Descubrir productos</button>

      </div>

      <div className='product-empty-summary'>
          <h3>Resumen de compra</h3>
          <hr />
          <p>Aquí verás los importes de tu compra una vez que agregues productos.</p>
      </div>

      
    </div>
    </Template>
    </>
  );
};

export default EmptyCart;
