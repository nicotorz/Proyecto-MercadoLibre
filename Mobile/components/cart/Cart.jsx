import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import CartProduct from '../../components/cart/CartProduct';
import EmptyCartPage from '../../components/cart/EmptyCartPage';
import CartSummary from '../../components/cart/CartSummary';
import Template from '../template/Template';
import Api from '../../services/api';
import Loading from '../../components/loading/Loading';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

useFocusEffect(
  React.useCallback(() => {
    // Llama a la función de carga de carrito cuando se enfoque la página
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const response = await Api.getCart();  
        if (response.items && Array.isArray(response.items)) {
          const products = response.items.map(item => ({
            ...item.product, 
            amount: item.amount,  
          }));
          setCartItems(products);  
        } else {
          setCartItems([]);  
        }
      } catch (error) {
        setCartItems([]);  
      } finally {
        setLoading(false);  
      }
    };

    fetchCartItems();  

  }, []),  // Solo se ejecuta cuando el componente es enfocado
);

  





  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.amount, 0);
  const totalShippingCost = cartItems.reduce((acc, item) => acc + item.shipping, 0);

  const handleRemove = async (id) => {
    try {
      await Api.removeFromCart(id);
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
    }
  };

  const handleUpdateQuantity = async (id, change) => {
    try {
      // Buscar el producto en el carrito
      const productToUpdate = cartItems.find(item => item.id === id);
      
      if (!productToUpdate) {
        console.error('Producto no encontrado en el carrito.');
        return;
      }
  
      // Calcular la nueva cantidad
      const newAmount = productToUpdate.amount + change;
  
      // Validar que la cantidad no sea menor a 1
      if (newAmount < 1) {
        console.error('La cantidad no puede ser menor a 1.');
        return;
      }
  
      // Actualizar el estado del carrito
      const updatedCartItems = cartItems.map(item =>
        item.id === id ? { ...item, amount: newAmount } : item
      );
      setCartItems(updatedCartItems);
  
      // Llamar a la API para actualizar la cantidad
      await Api.addToCart({ productId: id, amount: newAmount });
  
    } catch (error) {
      console.error('Error al actualizar la cantidad del producto:', error);
    }
  };
  

  const handleBuyPress = () => {
    navigation.navigate('Purchase');
  };

  return (
    <Template tittle={"Cart"}>
    <View style={styles.main}>
      
      {loading ? (
        <Loading/>
      ) : cartItems.length === 0 ? (
        <EmptyCartPage navigation={navigation} />
      ) : (
        <ScrollView>
          <Text style={styles.title}>Productos</Text>
          {cartItems.map((product) => (
            <CartProduct
              key={product.id}
              product={product}
              onRemove={handleRemove}
              onUpdateQuantity={handleUpdateQuantity}
            />
          ))}
        </ScrollView>
      )}

      {cartItems.length > 0 && (
        <View style={styles.cartSummary}>
          <CartSummary
            totalPrice={totalPrice}
            shippingCost={totalShippingCost}
            cartItems={cartItems}
            showBuyButton={true}
            onBuyPress={handleBuyPress}
          />
        </View>
      )}
    </View>
    </Template>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#FFD700',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  navbarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 25,
    margin: 10,
  },
  main: {
    backgroundColor: '#E7E7E7',
    flex: 1,
    marginTop: 40,
  },
  cartSummary: {
    margin: 10,
    
  },
});

export default CartPage;
