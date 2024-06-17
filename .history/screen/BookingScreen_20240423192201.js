import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';

const BookingScreen = () => {
  const [movies, setMovies] = useState([]);
  const [allSeats, setAllSeats] = useState(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const route = useRoute();
  const navigation = useNavigation();
  const { movieId, movieTitle, movieIMG, selectedShowtime, selectedDate } = route.params;

  function generateSeats() {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
    const seats = [];

    for (let i = 0; i < rows.length; i++) {
      for (let j = 1; j <= 7; j++) {
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
    const user = firebase.auth().currentUser;
    if (!user) {
      console.error('User is not logged in!');
      return;
    }

    const email = user.email;

    const unsubscribe = firestore()
      .collection('ticket')
      .where('movieId', '==', movieId)
      .where('showtime', '==', selectedShowtime)
      .onSnapshot(querySnapshot => {
        const bookedSeats = [];
        querySnapshot.forEach(doc => {
          const { seat } = doc.data();
          bookedSeats.push(seat);
        });

        const updatedSeats = allSeats.map(seat => ({
          ...seat,
          isLocked: bookedSeats.includes(`${seat.row}${seat.number}`),
        }));

        setAllSeats(updatedSeats);
      });

    return () => unsubscribe();
  }, [movieId, selectedShowtime]);

  const handlePayment = () => {
    setSelectedSeats([]);
    setTotalPrice(0);
    const updatedSeats = allSeats.map(seat => {
      if (
        selectedSeats.some(
          selectedSeat =>
            selectedSeat.row === seat.row &&
            selectedSeat.number === seat.number,
        )
      ) {
        return { ...seat, isLocked: true };
      }
      return seat;
    });
    setAllSeats(updatedSeats);

    selectedSeats.forEach(seat => {
      const formattedBookingDate = format(new Date(), 'yyyy-MM-dd');
      firestore()
        .collection('ticket')
        .add({
          movieTitle: movieTitle,
          movieId,
          showtime: selectedShowtime,
          bookingdate: formattedBookingDate,
          totalPrice: totalPrice,
          seat: `${seat.row}${seat.number}`,
        })
        .then(() => console.log('Seat booked successfully!'))
        .catch(error => console.error('Error booking seat:', error));
    });

    navigation.navigate('PaymentScreen', {
      movieId,
      movieTitle,
      selectedSeats,
      totalPrice,
      movieIMG,
      selectedShowtime,
      selectedDate,
    });
  };

  const handleSeatSelection = seat => {
    if (seat.isLocked) return;
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
        ]}
        onPress={() => handleSeatSelection(seat)}>
        <Text style={styles.seatText}>
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
        return '#FF5733';
      case 'Low':
        return '#4CAF50';
      default:
        return '#2196F3';
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
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 5,
  },
  selectedSeat: {
    backgroundColor: '#FFD700',
  },
  lockedSeat: {
    backgroundColor: '#CCCCCC',
  },
  seatText: {
    color: 'white',
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: '#FF5733',
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
