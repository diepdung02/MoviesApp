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
          isBooked: false, // Thêm trường để lưu trạng thái đã đặt chỗ
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
    // Tiếp tục với các hành động sau khi đã đặt vé thành công
    // Ví dụ: chuyển đến màn hình thanh toán
    // navigation.navigate('PaymentScreen', { ... });
  };

  const handleSeatSelection = seat => {
    if (seat.isLocked || seat.isBooked) return; // Kiểm tra nếu ghế đã được đặt chỗ

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

    // Cập nhật trạng thái của ghế thành đã đặt chỗ
    const updatedSeats = allSeats.map(s => {
      if (s.row === seat.row && s.number === seat.number) {
        return { ...s, isBooked: !s.isBooked };
      }
      return s;
    });
    setAllSeats(updatedSeats);
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
          seat.isBooked && styles.bookedSeat, // Kiểm tra trạng thái đã đặt chỗ
        ]}
        onPress={() => handleSeatSelection(seat)}>
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
    backgroundColor: 'orange', // Màu cho ghế đã đặt chỗ
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
