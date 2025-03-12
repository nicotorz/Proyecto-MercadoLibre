import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import CartSummary from '../cart/CartSummary'; 
import api from '../../services/api';
import Template from "../template/Template";
import 'react-toastify/dist/ReactToastify.css';
import './PurchasePage.css';


const PurchasePage = () => {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    
    if (!name || !cardNumber || !cvv || !expirationDate) {
      toast.error('Todos los campos son obligatorios.');
      setIsLoading(false);
      return;
    }

    const cardNumberRegex = /^[0-9]{16}$/;
    if (!cardNumberRegex.test(cardNumber)) {
      toast.error('Número de tarjeta inválido. Debe tener 16 dígitos.');
      setIsLoading(false);
      return;
    }

    const cvvRegex = /^[0-9]{3}$/;
    if (!cvvRegex.test(cvv)) {
      toast.error('CVV inválido. Debe tener 3 dígitos.');
      setIsLoading(false);
      return;
    }

    const expirationDateRegex = /^(20\d{2})\/(0[1-9]|1[0-2])$/;
    if (!expirationDateRegex.test(expirationDate)) {
      toast.error('Fecha de expiración inválida. Debe estar en el formato "yyyy/MM".');
      setIsLoading(false);
      return;
    }

    const paymentBody = {
      cardNumber,
      expirationDate,
      cvv,
      name,
    };
  
    try {
      const response = await api.purchaseCart(paymentBody);
  
      if (response) {
        
        toast.success('Compra realizada con éxito');
        
        setTimeout(() => {
          setIsLoading(false); 
          navigate('/'); 
        }, 2000); 
      } else {
        toast.warn('Algo salió mal al procesar el pago');
        setIsLoading(false); 
      }
    } catch (error) {
      console.error('Error al realizar la compra:', error);
      toast.error('Error al realizar la compra');
      setIsLoading(false); 
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.amount, 0);
  const totalShippingCost = cartItems.reduce((acc, item) => acc + item.shipping, 0);

  return (
    <>
    <Template>
    <div className="main">
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}

      <div className="purchase-inputs">
        <h2>Elegi como pagar</h2>
        
        <hr />

        <form onSubmit={handleSubmit} className="purchase-form">
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input 
              type="text" 
              id="name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="card-number">Número de tarjeta</label>
            <input 
              type="number" 
              id="card-number" 
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input 
              type="number" 
              id="cvv" 
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="expiration-date">Fecha de expiración</label>
            <input 
              type="text" 
              id="expiration-date" 
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="purchase-button">Comprar</button>
        </form>
      </div>

      <div className='cart-summary-purchase'>

      <CartSummary totalPrice={totalPrice} shippingCost={totalShippingCost} cartItems={cartItems} showBuyButton={false} />
      </div>
      
      <ToastContainer 
        position="bottom-right" 
        autoClose={5000} 
        hideProgressBar 
        newestOnTop 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
    </div>
    </Template>
    </>
  );
};

export default PurchasePage;
