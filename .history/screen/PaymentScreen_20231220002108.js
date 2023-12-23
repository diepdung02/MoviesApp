import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const PaymentScreen = () => {
  const route = useRoute();
  const { movieId, movieTitle, selectedSeats, totalPrice, movieIMG } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: movieIMG }} style={styles.image} />
      <Text style={styles.title}>Payment Screen</Text>
      {/* Hiển thị thông tin thanh toán */}
      <Text style={styles.info}>Phim: {movieTitle}</Text>
      <Text style={styles.info}>Ghế đã chọn: {selectedSeats.map((seat) => `${seat.row}${seat.number}`).join(', ')}</Text>
      <Text style={styles.info}>Tổng Tiền: {totalPrice} VND</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default PaymentScreen;
