// PaymentScreen.js

import React from 'react';
import { View, Text, Image} from 'react-native';
import { useRoute } from '@react-navigation/native';

const PaymentScreen = () => {
  const route = useRoute();
  const { movieId, movieTitle, selectedSeats, totalPrice, movieIMG } = route.params;

  return (
    <View>
      <Image style={styles.image} {movieIMG}/>
      <Text>Payment Screen</Text>
      {/* Hiển thị thông tin thanh toán */}
      <Text>Phim: {movieTitle}</Text>
      <Text>Ghế đã chọn: {selectedSeats.map((seat) => `${seat.row}${seat.number}`).join(', ')}</Text>
      <Text>Tổng Tiền: {totalPrice} VND</Text>
    </View>
  );
};

export default PaymentScreen;
