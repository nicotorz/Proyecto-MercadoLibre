import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CartSummary = ({ totalPrice = 0, shippingCost = 0, cartItems = [], showBuyButton = true, onBuyPress }) => {
  return (
    <View style={styles.cartSummaryContainer}>
      <Text style={styles.heading}>Resumen de compra</Text>
      <View style={styles.divider} />

      <View style={styles.summaryDetail}>
        <Text style={styles.label}>Envío ({cartItems.length})</Text>
        <Text style={styles.value}>${shippingCost.toFixed(2)}</Text>
      </View>

      <View style={styles.summaryDetail}>
        <Text style={styles.label}>Total</Text>
        <Text style={styles.total}>${(totalPrice + shippingCost).toFixed(2)}</Text>
      </View>

      {showBuyButton && (
        <TouchableOpacity style={styles.buyButton} onPress={onBuyPress}>
          <Text style={styles.buyButtonText}>Comprar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cartSummaryContainer: {
    marginTop: 20,
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  divider: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  summaryDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buyButton: {
    marginTop: 16,
    backgroundColor: '#3483FA',
    paddingVertical: 12,
    borderRadius: 8,
  },
  buyButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartSummary;
