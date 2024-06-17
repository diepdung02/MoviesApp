import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';

const BookingScreen = () => {
  const [movies, setMovies] = useState([]);
  const [allSeats, setAllSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const route = useRoute();
  const navigation = useNavigation();
  const { movieId, movieTitle, movieIMG, selectedShowtime } = route.params;

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
        const bookedSeats = [];
        querySnapshot.forEach(doc => {
          const bookingData = doc.data();
          bookedSeats.push(bookingData.seat);
        });
        markBookedSeats(bookedSeats);
      });

    return () => unsubscribe();
  }, [movieId, selectedShowtime]);

  function markBookedSeats(bookedSeats) {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
    const seats = [];

    for (let i = 0; i < rows.length; i++) {
      for (let j = 1; j <= 10; j++) {
        const seat = {
          row: rows[i],
          number: j,
          isBooked: bookedSeats.includes(`${rows[i]}${j}`),
        };
        seats.push(seat);
      }
    }
    setAllSeats(seats);
  }

  const handlePayment = () => {
    console.log('Selected showtime:', selectedShowtime);
    setSelectedSeats([]);
    setTotalPrice(0);
    // Lưu trạng thái ghế đã đặt lên Firebase
    selectedSeats.forEach(seat => {
      firestore().collection('bookings').add({
        movieId: movieId,
        showtime: selectedShowtime,
        seat: `${seat.row}${seat.number}`
      }).then(() => {
        console.log('Booking successful for seat:', `${seat.row}${seat.number}`);
      }).catch(error => {
        console.error('Error booking seat:', `${seat.row}${seat.number}`, error);
      });
    });

    // Tiếp tục với các hành động sau khi đã đặt vé thành công
    // Ví dụ: chuyển đến màn hình thanh toán
    // navigation.navigate('PaymentScreen', { ... });
  };

  const handleSeatSelection = seat => {
    if (seat.isBooked) return;
    const index = selectedSeats.findIndex(
      selectedSeat =>
        selectedSeat.row === seat.row && selectedSeat.number === seat.number,
    );
    if (index !== -1) {
      setSelectedSeats(
        selectedSeats.filter(
          selectedSeat =>
            !(
              selectedSeat.row === seat.row &&
              selectedSeat.number === seat.number
            ),
        ),
      );
      setTotalPrice(totalPrice - getPrice(seat.type));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
      setTotalPrice(totalPrice + getPrice(seat.type));
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
    if (!allSeats) {
      return null;
    }
    
    return allSeats.map(seat => (
      <TouchableOpacity
        key={`${seat.row}${seat.number}`}
        style={[
          styles.seat,
          { backgroundColor: seat.isBooked ? 'gray' : 'green' },
        ]}
        onPress={() => handleSeatSelection(seat)}>
        <Text style={styles.seatText}>{`${seat.row}${seat.number}`}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chọn Ghế Ngồi</Text>
      <View style={styles.seatLayout}>{renderSeats()}</View>
      <Text style={styles.totalPrice}>
        Tổng Tiền: {totalPrice.toLocaleString('vi-VN', {
          style: 'currency',
          currency: 'VND',
          minimumFractionDigits: 3,
        })}
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
  seatText: {
    color: 'white',
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
  totalPrice: {
    marginTop: 10,
    fontSize: 18,
    color: 'white',
  },
});

export default BookingScreen;
