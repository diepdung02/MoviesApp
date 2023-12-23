// PaymentScreen.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PaymentScreen = ({ route }) => {
  const { selectedSeats } = route.params;

  // Calculate total price for selected seats
  const totalPrice = selectedSeats.reduce((acc, seat) => {
    switch (seat.type) {
      case 'VIP':
        return acc + 179000;
      case 'Low':
        return acc + 110000;
      default:
        return acc + 139000;
    }
  }, 0);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Thanh Toán</Text>
      </View>

      <View style={styles.paymentDetails}>
        <Text style={styles.detailTitle}>Ghế Đã Chọn:</Text>
        {selectedSeats.map((seat, index) => (
          <Text key={index} style={styles.detailText}>{`${seat.row}${seat.number}`}</Text>
        ))}
        <Text style={styles.detailTitle}>Tổng Cộng:</Text>
        <Text style={styles.detailText}>{totalPrice.toLocaleString('en-US')} VND</Text>
      </View>

      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payButtonText}>Thanh Toán Ngay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  headerContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: '80%',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  paymentDetails: {
    width: '80%',
    marginBottom: 20,
  },
  detailTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailText: {
    marginBottom: 5,
  },
  payButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default PaymentScreen;
