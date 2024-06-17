import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import NetInfo from '@react-native-community/netinfo';

const MyTicketsScreen = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      const user = firebase.auth().currentUser;
      if (user) {
        const email = user.email;
        try {
          const querySnapshot = await firestore()
            .collection('users')
            .doc(email)
            .collection('tickets')
            .get();
          const ticketsData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTickets(ticketsData);
        } catch (error) {
          console.error('Error fetching tickets:', error);
          Alert.alert('Error', 'An error occurred while fetching your tickets.');
        } finally {
          setIsLoading(false);
        }
      } else {
        console.error('User is not logged in!');
        Alert.alert('Error', 'You must be logged in to view your tickets.');
        setIsLoading(false);
      }
    };

    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        console.error('No internet connection!');
        Alert.alert('Error', 'You must have an internet connection to view your tickets.');
        setIsLoading(false);
      }
    });

    fetchTickets();

    return () => unsubscribe();
  }, []);

  const renderTicketItem = ({ item }) => (
    <View style={styles.ticketItem}>
      <Text style={styles.ticketText}>🎬 Tên phim: {item.movieTitle}</Text>
      <Text style={styles.ticketText}>🎟 Ghế: {renderSeatLabels(item.selectedSeats)}</Text>
      <Text style={styles.ticketText}>⏰ Giờ Chiếu: {item.selectedShowtime}</Text>
      <Text style={styles.ticketText}>💰 Tổng tiền: {getFormattedPrice(item.totalPrice)}</Text>
    </View>
  );
  function renderSeatLabels(seats) {
    const seatLabels = seats.map(seat => `${seat.row}${seat.number}`).join(', ');
    return seatLabels;
  }

  function getFormattedPrice(price) {
    return price.toLocaleString('vi-VN', {
      style: 'currency',
      currency:'VND',
      minimumFractionDigits: 3,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Tickets</Text>
      {isLoading ? (
        <View style={styles.loadingIndicator} />
      ) : tickets.length === 0 ? (
        <Text style={styles.emptyText}>You haven't booked any tickets yet.</Text>
      ) : (
        <FlatList
          data={tickets}
          renderItem={renderTicketItem}
          keyExtractor={item => item.id}
          ListFooterComponent={<View style={styles.separator} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  ticketItem: {
    backgroundColor: '#3399FF',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  ticketText: {
    fontSize: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  loadingIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
    marginVertical: 10,
  },
});

export default MyTicketsScreen;