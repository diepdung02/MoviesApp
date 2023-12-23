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
          seatType = 'SweetBox';
        } else if (['A', 'B', 'C'].includes(row)) {
          seatType = 'Low';
        }

        rowSeats.push({ row: row, number: j, type: seatType, selected: false });
      }

      seats.push(...rowSeats);
    }
    return seats;
  }

  const handleSeatSelection = (seat) => {
    const updatedSeats = allSeats.map((s) => {
      if (s.row === seat.row && s.number === seat.number) {
        return { ...s, selected: !s.selected };
      }
      return s;
    });

    setSelectedSeats(updatedSeats.filter((s) => s.selected));
    setAllSeats(updatedSeats);
  };

  const renderSeats = () => {
    return allSeats.map((seat) => (
      <TouchableOpacity
        key={`${seat.row}${seat.number}`}
        style={[
          styles.seat,
          seat.selected && styles.selectedSeat,
          { backgroundColor: getSeatColor(seat.type) },
          seat.type === 'SweetBox' && styles.sweetBoxSeat,
        ]}
        onPress={() => handleSeatSelection(seat)}
      >
        <Text>{`${seat.row}${seat.number}`}</Text>
      </TouchableOpacity>
    ));
  };

  function getSeatColor(type) {
    switch (type) {
      case 'SweetBox':
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
        sweetBoxSeat: {
          width: 70, // Kích thước ghế Sweet Box
          height: 30, // Kích thước ghế Sweet Box
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
});

export default BookingScreen;
