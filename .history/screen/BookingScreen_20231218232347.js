import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BookingScreen = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [vipSeats, setVIPSeats] = useState([1, 2, 3, 4, 5, 6]); // Ghế VIP
  const [normalSeats, setNormalSeats] = useState([7, 8, 9, 10, 11, 15, 16]); // Ghế thường
  const [economySeats, setEconomySeats] = useState([, 17, 18, 19, 20]); // Ghế hạng thấp

  const getSeatLabel = (seatNumber) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const quotient = Math.floor((seatNumber - 1) / 26);
    const remainder = (seatNumber - 1) % 26;
    let letter = '';

    if (quotient > 0) {
      letter += alphabet.charAt(quotient - 1);
    }

    letter += alphabet.charAt(remainder);
    return letter + seatNumber;
  };

  const handleSeatSelection = (seatNumber) => {
    // Kiểm tra xem ghế đã được chọn chưa
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const renderSeats = (seatType, seatArray, color) => {
    const seats = seatArray.map((seatNumber) => (
      <TouchableOpacity
        key={seatNumber}
        style={[
          styles.seat,
          selectedSeats.includes(seatNumber) && styles.selectedSeat,
          { backgroundColor: color },
        ]}
        onPress={() => handleSeatSelection(seatNumber)}
      >
        <Text>{getSeatLabel(seatNumber)}</Text>
      </TouchableOpacity>
    ));

    return seats;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chọn Ghế Ngồi</Text>
      <View style={styles.seatLayout}>
        <View style={styles.seatRow}>{renderSeats('VIP', vipSeats, 'red')}</View>
        <View style={styles.seatRow}>{renderSeats('Normal', normalSeats, 'blue')}</View>
        <View style={styles.seatRow}>{renderSeats('Economy', economySeats, 'green')}</View>
      </View>
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
    backgroundColor: 'yellow',
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
