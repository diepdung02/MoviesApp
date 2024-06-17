import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';

const BookingScreen = () => {
  const [availableSeats, setAvailableSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const route = useRoute();
  const navigation = useNavigation();
  const {movieId, movieTitle, movieIMG, selectedShowtime} = route.params;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('bookings')
      .where('movieId', '==', movieId)
      .where('selectedShowtime', '==', selectedShowtime)
      .onSnapshot(querySnapshot => {
        const bookedSeats = [];
        querySnapshot.forEach(doc => {
          const bookingData = doc.data();
          bookedSeats.push(...bookingData.selectedSeats);
        });
        const allSeats = generateSeats();
        const availableSeats = allSeats.filter(
          seat => !bookedSeats.includes(seat),
        );
        setAvailableSeats(availableSeats);
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
        };
        seats.push(seat);
      }
    }
    return seats;
  }

  const handleSeatSelection = seat => {
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
      setTotalPrice(totalPrice - getPrice());
    } else {
      setSelectedSeats([...selectedSeats, seat]);
      setTotalPrice(totalPrice + getPrice());
    }
  };

  function getPrice() {
    // Giả sử giá vé là 100,000 VND
    return 100000;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chọn Ghế Ngồi</Text>
      <View style={styles.seatLayout}>
        {availableSeats.map(seat => (
          <TouchableOpacity
            key={`${seat.row}${seat.number}`}
            style={[
              styles.seat,
              selectedSeats.some(
                selectedSeat =>
                  selectedSeat.row === seat.row &&
                  selectedSeat.number === seat.number,
              ) && styles.selectedSeat,
            ]}
            onPress={() => handleSeatSelection(seat)}>
            <Text>{`${seat.row}${seat.number}`}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.totalPrice}>
        Tổng Tiền: {totalPrice.toLocaleString('vi-VN')} VND
      </Text>
      <TouchableOpacity
        style={styles.bookButton}
        onPress={() =>
          navigation.navigate('PaymentScreen', {
            movieId,
            movieTitle,
            selectedSeats,
            totalPrice,
            movieIMG,
            selectedShowtime,
          })
        }>
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
    backgroundColor: '#ffffff',
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
    backgroundColor: '#ccc',
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
  },
});

export default BookingScreen;
