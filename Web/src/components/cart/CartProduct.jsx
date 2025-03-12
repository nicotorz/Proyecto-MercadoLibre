import React from 'react';
import './CartProduct.css';

const CartProduct = ({ product, onRemove, onUpdateQuantity }) => {
  const totalPrice = (product.price * product.amount).toFixed(2);

  return (
    <div className="cart-product">   
      <img src={product.images[0]} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{product.title}</h3>
        <p className="product-author">Por {product.owner.name}</p>
        <button className="remove-button" onClick={() => onRemove(product.id)}>
          Eliminar
        </button>
      </div>
      
      <div className="quantity-control">
        <button
          className="quantity-button"
          onClick={() => {
            if (product.amount > 1) {
              onUpdateQuantity(product.id, -1); 
            } else {
              onRemove(product.id); 
            }
          }}
        >
          -
        </button>
        <input
          type="number"
          value={product.amount}
          readOnly
          className="quantity-input"
        />
        <button className="quantity-button" onClick={() => onUpdateQuantity(product.id, 1)}>
          +
        </button>
      </div>
      
      <p className="product-price">${totalPrice}</p>
      
      <div className="shipping-frame">
        <p className="shipping-label">Envío</p>
        <p className="shipping-price">${product.shipping.toFixed(2)}</p> 
      </div>
    </div>
  );
};

export default CartProduct;
