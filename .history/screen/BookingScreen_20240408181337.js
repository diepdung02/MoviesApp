import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';

const BookingScreen = () => {
  const [movies, setMovies] = useState([]);
  const [allSeats, setAllSeats] = useState(generateSeats());
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

  // Load data from Firestore to check which seats are booked
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

  function generateSeats() {
    // Generate seats as before
  }

  function markBookedSeats(bookedSeats) {
    const updatedSeats = allSeats.map(seat => {
      return {
        ...seat,
        isBooked: bookedSeats.includes(`${seat.row}${seat.number}`),
      };
    });
    setAllSeats(updatedSeats);
  }

  const handleSeatSelection = seat => {
    if (seat.isBooked) return;
    // Your seat selection logic
  };

  const renderSeats = () => {
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

  // Remaining code...
};

const styles = StyleSheet.create({
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
});

export default BookingScreen;
