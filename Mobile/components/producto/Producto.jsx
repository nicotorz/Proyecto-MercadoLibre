import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import api from '@/services/api';
import { useContext } from 'react';
import { AuthContext } from '@/hooks/authContext';
import { router, useRouter } from 'expo-router';

const ProductComponent = ({id, productLogo,  descriptionProduct, owner, precio, productsLiked, setProductLiked, isLogged }) => {

    const {setUser} = useContext(AuthContext);
    const buton = productsLiked.map((producto) => (producto.id)).includes(id);
    const router = useRouter();
 
  const handleClick = () => {
    api.likeProduct(id)
    .then(response => {
      setUser(response);
    setProductLiked(response.likedProducts);
    })
    .catch((error) => {
    console.error(error);
    })
  };


const handleProductClick = () => {
  router.navigate(`/product/${id}`)
  router.setParams({productName: descriptionProduct})
}

  return (
    <View style={styles.card}>
      <View style={styles.favoriteIcon}>
        <Pressable onPress={handleClick} hitSlop={20} disabled={!isLogged}>
          {buton ? 
            <FontAwesome style={styles.icon} name="star" size={24} color="black" /> 
            :
            <FontAwesome style={styles.icon} name="star-o" size={24} color="black" />
          }
        </Pressable>
      </View>
        <Image
          source={{uri: productLogo}} 
          style={styles.image}
        />
      <Pressable onPress={handleProductClick}>
        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{descriptionProduct}</Text>
          <Text style={styles.author}>{owner.name}</Text>
          <Text style={styles.price}>${precio.toFixed(2)}</Text>
          <Text style={styles.installments}>En 12 cuotas de ${(precio / 12).toFixed(2)}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 284,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  favoriteIcon: {
    position: 'absolute',
    zIndex: 2,
    width: 30,
    height: 30,
    top: 10,
    right: 10,
    borderRadius: 15,
    borderColor: '#000',
    borderWidth: 2
  },
  icon:{
    width: 22,
    height: 22,
    left: 2
  },
  image: {
    width: '93%',
    height: 106,
    resizeMode: 'contain',
    alaignSelf: 'center'
  },
  infoContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',

  },
  author: {
    fontSize: 12,
    color: '#777',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  installments: {
    fontSize: 12,
    color: 'green',
  },
});

export default ProductComponent;