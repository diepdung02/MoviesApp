import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const BookingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { movieId, movieTitle } = route.params;
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handlePayment = () => {
    navigation.navigate('PaymentScreen', { movieId, movieTitle, selectedSeats });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chọn ghế</Text>
      {/* Hiển thị giao diện chọn ghế và xác nhận */}
      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text>Thanh toán</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default BookingScreen;
