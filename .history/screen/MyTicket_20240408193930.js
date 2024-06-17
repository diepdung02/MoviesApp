import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore'; // Import firestore

const MyTicketsScreen = () => {
  const [tickets, setTickets] = useState([]);

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
        }
      } else {
        console.error('User is not logged in!');
      }
    };

    fetchTickets(); // Call fetchTickets inside useEffect
  }, []);

  const renderTicketItem = ({item}) => (
    <View style={styles.ticketItem}>
      <Text style={styles.ticketText}>Movie: {item.movieTitle}</Text>
      <Text style={styles.ticketText}>Bank: {item.selectedBank}</Text>
      <Text style={styles.ticketText}>
        Seats: {JSON.stringify(item.selectedSeats)}
      </Text>
      <Text style={styles.ticketText}>Showtime: {item.selectedShowtime}</Text>
      <Text style={styles.ticketText}>
        Total Price: {getFormattedPrice(item.totalPrice)}
      </Text>
    </View>
  );

  function getFormattedPrice(price) {
    return price.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 3,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Tickets</Text>
      {tickets.length === 0 ? (
        <Text style={styles.emptyText}>
          You haven't booked any tickets yet.
        </Text>
      ) : (
        <FlatList
          data={tickets}
          renderItem={renderTicketItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  ticketItem: {
    backgroundColor: '#F5F5DC',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  ticketText: {
    fontSize: 16,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default MyTicketsScreen;
