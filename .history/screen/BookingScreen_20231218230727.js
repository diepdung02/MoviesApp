import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BookingScreen = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatSelection = (seatNumber) => {
    // Kiểm tra nếu ghế đã được chọn, hủy chọn nếu đã chọn trước đó hoặc thêm vào danh sách chọn nếu chưa chọn
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const renderSeats = () => {
    const seats = [];
    const totalSeatsPerRow = 7; // Số ghế mỗi hàng

    for (let row = 0; row < 10; row++) { // Số hàng
      const rowSeats = [];

      for (let seatNumber = 1; seatNumber <= totalSeatsPerRow; seatNumber++) {
        const seatId = row * totalSeatsPerRow + seatNumber;
        rowSeats.push(
          <TouchableOpacity
            key={seatId}
            style={[
              styles.seat,
              selectedSeats.includes(seatId) && styles.selectedSeat,
            ]}
            onPress={() => handleSeatSelection(seatId)}
          >
            <Text>{seatId}</Text>
          </TouchableOpacity>
        );
      }

      seats.push(
        <View key={row} style={styles.seatRow}>
          {rowSeats}
        </View>
      );
    }
    return seats;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chọn Ghế Ngồi</Text>
      <View style={styles.seatLayout}>{renderSeats()}</View>
      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Đặt Vé</Text>
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
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  seatLayout: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  seatRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  seat: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    margin: 3,
  },
  selectedSeat: {
    backgroundColor: 'green',
  },
  bookButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  bookButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default BookingScreen;
