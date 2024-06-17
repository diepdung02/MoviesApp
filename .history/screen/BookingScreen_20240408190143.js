import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';

const BookingScreen = () => {
  const [movies, setMovies] = useState([]);
  const [allSeats, setAllSeats] = useState(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [previousBookings, setPreviousBookings] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();
  const { movieId, movieTitle, movieIMG, selectedShowtime } = route.params;

  function generateSeats() {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
    const seats = [];

    for (let i = 0; i < rows.length; i++) {
      for (let j = 1; j <= 10; j++) {
        const seat = {
          row: rows[i],
          number: j,
          type: getType(rows[i]),
          isLocked: false,
        };
        seats.push(seat);
      }
    }
    return seats;
  }

  function getType(row) {
    if (row === 'K') {
      return 'VIP';
    } else if (['A', 'B', 'C'].includes(row)) {
      return 'Low';
    } else {
      return 'Normal';
    }
  }

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('movies')
      .onSnapshot(querySnapshot => {
        const data = [];
        querySnapshot.forEach(doc => {
          const movieData = doc.data();
          data.push({ id: doc.id, ...movieData });
        });
        setMovies(data);
      });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('bookings')
      .where('movieId', '==', movieId)
      .where('showtime', '==', selectedShowtime)
      .onSnapshot(querySnapshot => {
        const data = [];
        querySnapshot.forEach(doc => {
          const bookingData = doc.data();
          data.push({ id: doc.id, ...bookingData });
        });
        setPreviousBookings(data);
      });

    return () => unsubscribe();
  }, [movieId, selectedShowtime]);

  const saveBookingToFirebase = async () => {
    try {
      const bookingRef = await firestore().collection('bookings').add({
        movieId: movieId,
        showtime: selectedShowtime,
        seats: selectedSeats.map(seat => `${seat.row}${seat.number}`),
      });
      console.log('Booking successful! Booking ID:', bookingRef.id);
    } catch (error) {
      console.error('Error saving booking:', error);
    }
  };

  const handlePayment = () => {
    console.log('Selected showtime:', selectedShowtime);
    setSelectedSeats([]);
    setTotalPrice(0);
    saveBookingToFirebase();
    updateSeatStatus();
  };

  const handleSeatSelection = seat => {
    if (seat.isLocked) return;

    const isSeatSelected = selectedSeats.some(
      selectedSeat =>
        selectedSeat.row === seat.row && selectedSeat.number === seat.number,
    );

    if (isSeatSelected) {
      setSelectedSeats(prevSelectedSeats =>
        prevSelectedSeats.filter(
          selectedSeat =>
            !(selectedSeat.row === seat.row && selectedSeat.number === seat.number),
        ),
      );
      setTotalPrice(prevTotalPrice => prevTotalPrice - getPrice(seat.type));
    } else {
      setSelectedSeats(prevSelectedSeats => [...prevSelectedSeats, seat]);
      setTotalPrice(prevTotalPrice => prevTotalPrice + getPrice(seat.type));
    }
  };

  function getPrice(type) {
    const movie = movies.find(movie => movie.id === movieId);
    if (movie) {
      switch (type) {
        case 'VIP':
          return movie.vipPrice ? parseInt(movie.vipPrice) : 0;
        case 'Low':
          return movie.lowPrice ? parseInt(movie.lowPrice) : 0;
        default:
          return movie.normalPrice ? parseInt(movie.normalPrice) : 0;
      }
    }
    return 0;
  }

  const renderSeats = () => {
    return allSeats.map(seat => (
      <TouchableOpacity
        key={`${seat.row}${seat.number}`}
        style={[
          styles.seat,
          { backgroundColor: getSeatColor(seat.type) },
          selectedSeats.some(
            selectedSeat =>
              selectedSeat.row === seat.row &&
              selectedSeat.number === seat.number,
          ) && styles.selectedSeat,
          seat.isLocked && styles.lockedSeat,
          isSeatBooked(seat) && styles.bookedSeat,
        ]}
        onPress={() => handleSeatSelection(seat)}
        disabled={isSeatBooked(seat)}>
        <Text
          style={
            selectedSeats.some(
              selectedSeat =>
                selectedSeat.row === seat.row &&
                selectedSeat.number === seat.number,
            ) && styles.xMark
          }>
          {`${seat.row}${seat.number}`}
          {selectedSeats.some(
            selectedSeat =>
              selectedSeat.row === seat.row &&
              selectedSeat.number === seat.number,
          ) && ` - ${getFormattedPrice(getPrice(seat.type))}`}
        </Text>
      </TouchableOpacity>
    ));
  };

  function getFormattedPrice(price) {
    return price.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 3,
    });
  }

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

  function isSeatBooked(seat) {
    return previousBookings.some(booking =>
      booking.seats.includes(`${seat.row}${seat.number}`)
    );
  }


  
  const updateSeatStatus = async () => {
    try {
      const batch = firestore().batch();
      const bookingsRef = firestore().collection('bookings');
      selectedSeats.forEach(seat => {
        const seatRef = bookingsRef.where('movieId', '==', movieId)
                                    .where('showtime', '==', selectedShowtime)
                                    .where('seats', 'array-contains', `${seat.row}${seat.number}`);
        batch.update(seatRef, { isLocked: true });
      });
      await batch.commit();
      console.log('Seat status updated successfully!');
    } catch (error) {
      console.error('Error updating seat status:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chọn Ghế Ngồi</Text>
      <View style={styles.seatLayout}>{renderSeats()}</View>
      <Text style={styles.totalPrice}>
        Tổng Tiền: {getFormattedPrice(totalPrice)} VND
      </Text>
      <TouchableOpacity style={styles.bookButton} onPress={handlePayment}>
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
    backgroundColor: '#363636',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
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
    backgroundColor: '#ccc',
  },
  lockedSeat: {
    backgroundColor: 'gray',
  },
  bookedSeat: {
    backgroundColor: 'yellow', // Màu cho biết ghế đã được đặt
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
  xMark: {
    color: 'white',
    fontWeight: 'bold',
  },
  totalPrice: {
    marginTop: 10,
    fontSize: 18,
    color: 'white',
  },
});

export default BookingScreen;
