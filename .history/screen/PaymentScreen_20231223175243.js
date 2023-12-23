import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PaymentScreen = () => {
  const [selectedBank, setSelectedBank] = useState(null); // State to track selected bank

  const handleBankPayment = (bankName) => {
    // Implement bank payment functionality here based on bankName
    // This function will be triggered when a bank button is pressed
    setSelectedBank(bankName); // Set the selected bank when a button is pressed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Select Payment Method</Text>

      {/* Bank payment buttons */}
      <View style={styles.bankButtonsContainer}>
        {/* Vietcombank */}
        <TouchableOpacity
          style={[
            styles.bankButton,
            selectedBank === 'Vietcombank' && styles.selectedBank,
          ]}
          onPress={() => handleBankPayment('Vietcombank')}>
          <Text style={styles.bankButtonText}>Vietcombank</Text>
        </TouchableOpacity>

        {/* BIDV */}
        <TouchableOpacity
          style={[
            styles.bankButton,
            selectedBank === 'BIDV' && styles.selectedBank,
          ]}
          onPress={() => handleBankPayment('BIDV')}>
          <Text style={styles.bankButtonText}>BIDV</Text>
        </TouchableOpacity>

        {/* Techcombank */}
        <TouchableOpacity
          style={[
            styles.bankButton,
            selectedBank === 'Techcombank' && styles.selectedBank,
          ]}
          onPress={() => handleBankPayment('Techcombank')}>
          <Text style={styles.bankButtonText}>Techcombank</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bankButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '80%',
  },
  bankButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '30%', // Adjust width as needed based on the number of buttons
  },
  bankButtonText: {
    fontWeight: 'bold',
  },
  selectedBank: {
    backgroundColor: 'blue', // Change the color when selected
    // You can adjust this to the desired color
  },
});

export default PaymentScreen;
