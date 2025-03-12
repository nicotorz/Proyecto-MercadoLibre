import React, { useState, useEffect } from 'react';
import CartProduct from './CartProduct';
import CartSummary from './CartSummary';
import EmptyCartPage from './EmptyCartPage';
import './CartPage.css';
import api from '../../services/api';
import Template from "../template/Template";

const CartPage = () => {

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await api.getCart();
        if (response.items && Array.isArray(response.items)) {
          const products = response.items.map(item => ({
            ...item.product,
            amount: item.amount,
          }));
          setCartItems(products);
        } else {
          console.warn('No se encontraron productos en el carrito');
        }
      } catch (error) {
        console.error('Error al cargar los productos del carrito:', error);
      }
    };

    fetchCartItems();
  }, [api]); 






  const handleRemove = async (id) => {
    try {
      await api.removeFromCart(id); 
      setCartItems(cartItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error);
    }
  };

  const handleUpdateQuantity = async (id, change) => {
    try {
      const productToUpdate = cartItems.find(item => item.id === id);
      
      if (!productToUpdate) {
        console.error('Producto no encontrado en el carrito.');
        return;
      }
  
      const newAmount = productToUpdate.amount + change;
  
      if (newAmount < 1) {
        console.error('La cantidad no puede ser menor a 1.');
        return;
      }
  
      const updatedCartItems = cartItems.map(item =>
        item.id === id ? { ...item, amount: newAmount } : item
      );
  
      setCartItems(updatedCartItems);
  
      await api.addToCart({ productId: id, amount: newAmount }); 
  
    } catch (error) {
      console.error('Error al actualizar la cantidad del producto:', error);
    }
  };
  
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.amount, 0);
  const totalShippingCost = cartItems.reduce((acc, item) => acc + item.shipping, 0);

  return (
    <>
    <Template>
    <div className="cart-container">
      {cartItems.length === 0 ? (
        <EmptyCartPage />
      ) : (
        <div className="cart-content">
          <div className="cart-products">
            <h2>Productos</h2>
            <hr />
            <div className="cart-products-list">
              {cartItems.map((product) => (
                <CartProduct
                  key={product.id}
                  product={product}
                  onRemove={handleRemove}
                  onUpdateQuantity={handleUpdateQuantity}
                />
              ))}
            </div>
          </div>

          <CartSummary totalPrice={totalPrice} shippingCost={totalShippingCost} cartItems={cartItems} showBuyButton={true} />
        </div>
      )}
    </div>
    </Template>
    </>
  );
};

export default CartPage;
