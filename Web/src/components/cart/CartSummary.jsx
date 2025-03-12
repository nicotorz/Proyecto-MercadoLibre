import React from 'react';
import './CartSummary.css'; 
import { useNavigate } from 'react-router-dom';


const CartSummary = ({ totalPrice = 0, shippingCost = 0, cartItems = [], showBuyButton = true }) => {

const navigate = useNavigate(); 


const handleRedirect = () => {
  navigate('/purchase'); 
};


  return (
    <div className="cart-summary">
      <h2>Resumen de compra</h2>
      <hr />
      <div className="summary-details">
        <p>Productos ({cartItems.length})</p>
        <p>${totalPrice.toFixed(2)}</p>
      </div>
      <div className="summary-details">
        <p>Envío</p>
        <p>${shippingCost.toFixed(2)}</p>
      </div>
      
      <h3>Total: ${(totalPrice + shippingCost).toFixed(2)}</h3>
      
      {showBuyButton && (
        <button className="buy-button" onClick={handleRedirect}>Comprar</button>
      )}
    </div>
  );
};

export default CartSummary;
