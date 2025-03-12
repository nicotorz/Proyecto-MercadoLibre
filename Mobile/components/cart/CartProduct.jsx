import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

const CartProduct = ({ product, onRemove, onUpdateQuantity }) => {
  const totalPrice = (product.price * product.amount).toFixed(2);

  return (
    <View style={styles.cartProduct}>
      <Image source={{ uri: product.images[0] }} style={styles.productImage} />

      <View style={styles.infoContainer}>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.tittle}</Text>
          <Text style={styles.productAuthor}>Por {product.owner.name}</Text>
        </View>

        <TouchableOpacity onPress={() => onRemove(product.id)}>
          <Text style={styles.removeButton}>Eliminar</Text>
        </TouchableOpacity>

        <View style={styles.quantityControl}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => {
              if (product.amount > 1) {
                onUpdateQuantity(product.id, -1);
              } else {
                onRemove(product.id);
              }
            }}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <TextInput
            value={String(product.amount)}
            editable={false}
            style={styles.quantityInput}
          />
          <TouchableOpacity style={styles.quantityButton} onPress={() => onUpdateQuantity(product.id, 1)}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Contenedor de precios mejorado */}
        <View style={styles.priceContainer}>
          
          <View style={styles.priceRow}>
            <Text style={styles.productPrice}></Text>
            <Text style={styles.productPrice}>${totalPrice}</Text>
          </View>
            
          <View style={styles.separator} />

          <View style={styles.priceRow}>
            <Text style={styles.shippingPrice}>Envío:</Text>
            <Text style={styles.shippingPrice}>${product.shipping.toFixed(2)}</Text>
          </View>


        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  productImage: {
    width: 100,
    height: 82,
    marginRight: 16,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  productInfo: {
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productAuthor: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  removeButton: {
    color: 'rgb(36, 121, 179)',
    marginBottom: 8,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  quantityInput: {
    width: 50,
    textAlign: 'center',
    marginHorizontal: 8,
    height: 30,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
  },
  quantityButton: {
    backgroundColor: '#e0e0e0',
    borderColor: '#b3b3b3',
    borderWidth: 1,
    borderRadius: 6,
    width: 40,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  priceContainer: {
    marginTop: 12,
    paddingVertical: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  shippingPrice: {
    fontSize: 14,
    color: '#444',
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 8,
  },
});

export default CartProduct;
