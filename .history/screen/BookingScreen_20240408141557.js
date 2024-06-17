import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';

const BookingScreen = () => {
  const [movies, setMovies] = useState([]);
  const [allSeats, setAllSeats] = useState(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const route = useRoute();
  const navigation = useNavigation();
  const {movieId, movieTitle, movieIMG, selectedShowtime} = route.params;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('movies')
      .onSnapshot(querySnapshot => {
        const data = [];
        querySnapshot.forEach(doc => {
          const movieData = doc.data();
          data.push({id: doc.id, ...movieData});
        });
        setMovies(data);
      });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Load reserved seats from Firestore and update allSeats
    const unsubscribe = firestore()
      .collection('tickets')
      .where('movieId', '==', movieId)
      .where('selectedShowtime', '==', selectedShowtime)
      .onSnapshot(querySnapshot => {
        const reservedSeats = [];
        querySnapshot.forEach(doc => {
          const ticketData = doc.data();
          reservedSeats.push(...ticketData.selectedSeats);
        });

        const updatedSeats = allSeats.map(seat => {
          if (
            reservedSeats.some(
              reservedSeat =>
                reservedSeat.row === seat.row &&
                reservedSeat.number === seat.number,
            )
          ) {
            return {...seat, isReserved: true};
          } else {
            return seat;
          }
        });

        setAllSeats(updatedSeats);
      });

    return () => unsubscribe();
  }, [movieId, selectedShowtime]);
  function generateSeats() {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
    const seats = [];

    for (let i = 0; i < rows.length; i++) {
      for (let j = 1; j <= 10; j++) {
        const seat = {
          row: rows[i],
          number: j,
          type: getType(rows[i]),
          isReserved: false, // Thêm trạng thái isReserved để kiểm tra ghế đã được đặt hay chưa
        };
        seats.push(seat);
      }
    }
    return seats;
  }

  const handlePayment = () => {
    // Save ticket information to Firestore
    firestore()
      .collection('tickets')
      .add({
        movieId,
        movieTitle,
        selectedSeats,
        totalPrice,
        selectedShowtime,
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log('Ticket saved successfully!');
        navigation.navigate('PaymentScreen', {
          movieId,
          movieTitle,
          selectedSeats,
          totalPrice,
          movieIMG,
          selectedShowtime,
        });
      })
      .catch(error => {
        console.error('Error saving ticket: ', error);
      });
  };

  const handleSeatSelection = seat => {
    if (!seat.isReserved) {
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
          {backgroundColor: getSeatColor(seat.type)},
          seat.isReserved && styles.reservedSeat,
          selectedSeats.some(
            selectedSeat =>
              selectedSeat.row === seat.row &&
              selectedSeat.number === seat.number,
          ) && styles.selectedSeat,
        ]}
        onPress={() => handleSeatSelection(seat)}>
        <Text style={styles.seatText}>{`${seat.row}${seat.number}`}</Text>
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
      <Text style={styles.totalPrice}>Tổng Tiền: {totalPrice} VND</Text>
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
    backgroundColor: '#f0f0f0',
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
  },
  seat: {
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  seatText: {
    fontSize: 16,
  },
  reservedSeat: {
    backgroundColor: '#999',
  },
  selectedSeat: {
    backgroundColor: 'green',
  },
  totalPrice: {
    marginVertical: 20,
    fontSize: 20,
  },
  bookButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default BookingScreen;
