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
  const {movieId, movieTitle, movieIMG} = route.params;

  function getType(row) {
    if (row === 'K') {
      return 'VIP';
    } else if (['A', 'B', 'C'].includes(row)) {
      return 'Low';
    } else {
      return 'Normal';
    }
  }

  function generateSeats() {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
    const seats = [];

    rows.forEach(row => {
      for (let j = 1; j <= 10; j++) {
        const type = getType(row);
        seats.push({row, number: j, type});
      }
    });

    return seats;
  }

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

  const handlePayment = () => {
    navigation.navigate('PaymentScreen', {
      movieId,
      movieTitle,
      selectedSeats,
      totalPrice,
      movieIMG,
    });
  };

  const checkSeatAvailability = async (row, number) => {
    try {
      const seatDoc = await firestore()
        .collection('seats')
        .doc(`${row}_${number}`)
        .get();

      if (seatDoc.exists) {
        const seatData = seatDoc.data();
        return !seatData.booked;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Lỗi khi kiểm tra trạng thái ghế ngồi:', error);
      return false;
    }
  };

  const handleSeatSelection = async (row, number) => {
    const isSeatAvailable = await checkSeatAvailability(row, number);
    if (isSeatAvailable) {
      const seat = {row, number, type: getType(row)};
      setSelectedSeats([...selectedSeats, seat]);
      setTotalPrice(totalPrice + getPrice(seat.type));
    } else {
      console.log('Ghế ngồi đã được đặt.');
    }
  };

  function getPrice(type) {
    switch (type) {
      case 'VIP':
        return 179000;
      case 'Low':
        return 110000;
      default:
        return 139000;
    }
  }

  const renderSeats = () => {
    return allSeats.map(seat => (
      <TouchableOpacity
        key={`${seat.row}${seat.number}`}
        style={[
          styles.seat,
          {backgroundColor: getSeatColor(seat.type)},
          selectedSeats.some(
            selectedSeat =>
              selectedSeat.row === seat.row &&
              selectedSeat.number === seat.number,
          ) && styles.selectedSeat,
        ]}
        onPress={() => handleSeatSelection(seat.row, seat.number)}>
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
          ) && ` - ${getPrice(seat.type).toLocaleString('en-US')} VND`}
        </Text>
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
      <Text style={styles.totalPrice}>
        Tổng Tiền: {totalPrice.toLocaleString('en-US')} VND
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
  xMark: {
    color: 'white',
    fontWeight: 'bold',
  },
  totalPrice: {
    marginTop: 10,
    fontSize: 18,
  },
});

export default BookingScreen;
