import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BookingScreen = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [allSeats, setAllSeats] = useState(generateSeats());

  function generateSeats() {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
    const seats = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      let rowSeats = [];

      for (let j = 1; j <= 11; j++) {
        let seatType = 'Normal';

        if (row === 'K' && (j === 10 || j === 11)) {
          seatType = 'VIP';
        } else if (['A', 'B', 'C'].includes(row)) {
          seatType = 'Low';
        }

        rowSeats.push({ row: row, number: j, type: seatType });
      }

      seats.push(...rowSeats);
    }
    return seats;
  }

  const handleSeatSelection = (seat) => {
    let newSelectedSeats = [...selectedSeats];

    if (seat.type === 'VIP') {
      const vipSeats = allSeats.filter((s) => s.row === 'K' && (s.number === 10 || s.number === 11));
      newSelectedSeats = [...newSelectedSeats, ...vipSeats];
    } else {
      const index = newSelectedSeats.findIndex(
        (selectedSeat) => selectedSeat.row === seat.row && selectedSeat.number === seat.number
      );

      if (index !== -1) {
        newSelectedSeats = newSelectedSeats.filter((selectedSeat) => selectedSeat !== newSelectedSeats[index]);
      } else {
        newSelectedSeats = [...newSelectedSeats, seat];
      }
    }

    setSelectedSeats(newSelectedSeats);
  };

  const renderSeats = () => {
    return allSeats.map((seat) => (
      <TouchableOpacity
        key={`${seat.row}${seat.number}`}
        style={[
          styles.seat,
          selectedSeats.some((selectedSeat) => selectedSeat.row === seat.row && selectedSeat.number === seat.number) &&
            styles.selectedSeat,
          { backgroundColor: getSeatColor(seat.type) },
          seat.type === 'VIP' && styles.vipSeat,
        ]}
        onPress={() => handleSeatSelection(seat)}
      >
        <Text>{`${seat.row}${seat.number}`}</Text>
      </TouchableOpacity>
    ));
  };

  function getSeatColor(type) {
    switch (type) {
      case 'VIP':
        return 'red';
      case 'Low':
        return 'blue';
      default:
        return 'green';
    }
  }

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
  vipSeat: {
    width: 70, // Độ rộng ghế VIP
    height: 30, // Chiều cao ghế VIP
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
