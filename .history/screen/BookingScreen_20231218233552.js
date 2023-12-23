import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BookingScreen = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [allSeats, setAllSeats] = useState(generateSeats());

  function generateSeats() {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
    const seats = [];

    for (let i = 0; i < rows.length; i++) {
      for (let j = 1; j <= 10; j++) {
        const seat = {
          row: rows[i],
          number: j,
          type: i < 3 ? 'VIP' : 'Normal' : 'Economy',
        };
        seats.push(seat);
      }
    }
    return seats;
  }

  const handleSeatSelection = (seat) => {
    const index = selectedSeats.findIndex((selectedSeat) => selectedSeat.row === seat.row && selectedSeat.number === seat.number);
    if (index !== -1) {
      setSelectedSeats(selectedSeats.filter((selectedSeat) => !(selectedSeat.row === seat.row && selectedSeat.number === seat.number)));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const renderSeats = () => {
    return allSeats.map((seat) => (
      <TouchableOpacity
        key={`${seat.row}${seat.number}`}
        style={[
          styles.seat,
          selectedSeats.some((selectedSeat) => selectedSeat.row === seat.row && selectedSeat.number === seat.number) && styles.selectedSeat,
          { backgroundColor: seat.type === 'VIP' ? 'red' : 'blue' },
        ]}
        onPress={() => handleSeatSelection(seat)}
      >
        <Text>{`${seat.row}${seat.number}`}</Text>
      </TouchableOpacity>
    ));
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
