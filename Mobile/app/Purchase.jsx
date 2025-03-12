import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa el hook de navegación
import CartSummary from '../components/cart/CartSummary'
import { AuthContext } from '@/hooks/authContext';
import Api from '../services/api';

const PurchasePage = () => {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {setUser} = useContext(AuthContext);

  const navigation = useNavigation();
  useEffect(() => {

    navigation.setOptions({ headerStyle:{backgroundColor:'#FFE600'},  headerTintColor: '#333' } );
  },[])
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await Api.getCart();
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
  }, []);




  const handleBuyPress = async () => {
    if (!name || !cardNumber || !cvv || !expirationDate) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    const cardNumberRegex = /^[0-9]{16}$/;
    const cvvRegex = /^[0-9]{3}$/;
    const expirationDateRegex = /^(20\d{2})\/(0[1-9]|1[0-2])$/;

    if (!cardNumberRegex.test(cardNumber)) {
      Alert.alert('Error', 'Número de tarjeta inválido. Debe tener 16 dígitos.');
      return;
    }
    if (!cvvRegex.test(cvv)) {
      Alert.alert('Error', 'CVV inválido. Debe tener 3 dígitos.');
      return;
    }
    if (!expirationDateRegex.test(expirationDate)) {
      Alert.alert('Error', 'Fecha de expiración inválida. Debe estar en el formato "yyyy/MM".');
      return;
    }

    setIsLoading(true);

    const paymentBody = {
      cardNumber,
      expirationDate,
      cvv,
      name,
    };

    try {
      const response = await Api.purchaseCart(paymentBody);
      setUser(response)
      Alert.alert('Compra', 'Compra realizada con éxito.');
      setName('');
      setCardNumber('');
      setCvv('');
      setExpirationDate('');
      navigation.navigate('home'); // Redirige al usuario al `home`
    } catch (error) {
      console.error('Error al realizar la compra:', error);
      Alert.alert('Error', 'Error al realizar la compra.');
    } finally {
      setIsLoading(false);
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.amount, 0);
  const totalShippingCost = cartItems.reduce((acc, item) => acc + item.shipping, 0);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Ajusta automáticamente para iOS/Android
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.summaryStyle}>
          <CartSummary
            totalPrice={totalPrice}
            shippingCost={totalShippingCost}
            cartItems={cartItems}
            showBuyButton={false}
          />
        </View>

        <View style={styles.inputsContainer}>
          <Text style={styles.title}>Elegi cómo pagar</Text>
          <View style={styles.divider} />
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Número de tarjeta"
            value={cardNumber}
            keyboardType="numeric"
            onChangeText={setCardNumber}
          />
          <TextInput
            style={styles.input}
            placeholder="CVV"
            value={cvv}
            keyboardType="numeric"
            onChangeText={setCvv}
          />
          <TextInput
            style={styles.input}
            placeholder="Fecha de expiración (yyyy/MM)"
            value={expirationDate}
            onChangeText={setExpirationDate}
          />

          <TouchableOpacity style={styles.buyButton} onPress={handleBuyPress} disabled={isLoading}>
            <Text style={styles.buyButtonText}>{isLoading ? 'Procesando...' : 'Comprar'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7E7E7',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputsContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 10,
  },
  buyButton: {
    backgroundColor: '#3483FA',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  summaryStyle: {
    margin: 10,
  },
  divider: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginBottom: 16,
  },
});

export default PurchasePage;
