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

const styles = StyleSheet.create({
     container: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       padding: 20,
       backgroundColor: '#fff', // Thay đổi màu nền tùy theo thiết kế
     },
     header: {
       fontSize: 24,
       fontWeight: 'bold',
       marginBottom: 20,
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
       backgroundColor: 'blue', // Màu nút thanh toán
       padding: 10,
       borderRadius: 5,
       alignItems: 'center',
     },
     payButtonText: {
       color: 'white',
       fontWeight: 'bold',
     },
   });

export default PaymentScreen;
