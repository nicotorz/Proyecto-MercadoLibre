import React from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const cartImage = require('../../assets/images/carro.png'); // Asegúrate de que esta ruta sea correcta

export default function EmptyCartPage({ navigation }) {
  return (
    <View style={styles.container}>
      
      <View style={styles.whiteContainer}>
        <View style={styles.content}>
          
          <Image source={cartImage} style={styles.cartImage} />

          
          <Text style={styles.messageText}>¡Empezá un carrito de compras!</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('home')}
          >
            <Text style={styles.buttonText}>Descubrir Productos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7E7E7', // Fondo gris claro
  },
  navbarText: {
    fontSize: 20, // Tamaño de fuente
    fontWeight: 'bold', // Negrita
    color: 'black', // Color del texto
  },
  whiteContainer: {
    flex: 1,
    backgroundColor: '#ffffff', // Fondo blanco para el contenedor
    borderRadius: 10, // Bordes redondeados
    margin: 10, // Margen alrededor del contenedor
    alignItems: 'center', // Centra el contenido horizontalmente
    justifyContent: 'center', // Centra el contenido verticalmente
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20, // Espaciado interno
  },
  cartImage: {
    width: 100, // Ajuste del tamaño de la imagen
    height: 100,
    marginBottom: 20, // Espacio entre la imagen y el texto
  },
  messageText: {
    fontSize: 16, // Tamaño de fuente del mensaje
    marginBottom: 20, // Espacio entre el mensaje y el botón
  },
  button: {
    backgroundColor: '#0b6ee5', // Color del botón
    paddingVertical: 10, // Espaciado vertical del botón
    paddingHorizontal: 20, // Espaciado horizontal del botón
    borderRadius: 5, // Bordes redondeados
  },
  buttonText: {
    fontSize: 16, // Tamaño de fuente del texto del botón
    color: 'white', // Color del texto del botón
  },
});
