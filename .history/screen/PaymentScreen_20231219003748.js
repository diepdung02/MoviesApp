// PaymentScreen.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PaymentScreen = ({ navigation }) => {
  const selectedSeats = navigation.getParam('selectedSeats', []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment</Text>
      <Text>Selected Seats: {JSON.stringify(selectedSeats)}</Text>
      {/* Other payment components and functionality */}
      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

// ...styles

export default PaymentScreen;
