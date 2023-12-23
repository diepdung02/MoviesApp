import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const BookingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { movieId, movieTitle } = route.params;
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatSelection = (seat) => {
    // Logic chọn ghế
    const updatedSeats = [...selectedSeats];
    const index = updatedSeats.findIndex((selectedSeat) => selectedSeat.id === seat.id);

    if (index !== -1) {
      updatedSeats.splice(index, 1); // Bỏ chọn ghế nếu đã được chọn trước đó
    } else {
      updatedSeats.push(seat); // Chọn ghế nếu chưa được chọn
    }

    setSelectedSeats(updatedSeats);
  };

  const handlePayment = () => {
    navigation.navigate('PaymentScreen', { movieId, movieTitle, selectedSeats });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chọn ghế</Text>
      {/* Hiển thị giao diện chọn ghế */}
      {/* Ví dụ: danh sách ghế có thể được hiển thị và chọn ở đây */}
      <TouchableOpacity style={styles.seat} onPress={() => handleSeatSelection({ id: 1, row: 'A', number: 1 })}>
        <Text>Ghế A1</Text>
      </TouchableOpacity>
      {/* Thêm các ghế khác tương tự */}

      {/* Nút thanh toán */}
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
  seat: {
    backgroundColor: '#eee',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
});

export default BookingScreen;
