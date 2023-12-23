// PaymentScreen.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PaymentScreen = ({ route }) => {
  const { selectedSeats } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment</Text>
      
      {/* Display selected seats and payment details */}
      <Text>Selected Seats: {JSON.stringify(selectedSeats)}</Text>

      {/* Add payment components and functionality */}
      
      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

// Your styles...

export default PaymentScreen;
