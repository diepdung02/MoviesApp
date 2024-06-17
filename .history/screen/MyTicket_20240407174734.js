import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

const MyTicketsScreen = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
          const userEmail = currentUser.email;
          const userTicketsRef = firebase
            .firestore()
            .collection('tickets')
            .where('userEmail', '==', userEmail)
            .orderBy('movieTitle', 'selectedBank''); // Sắp xếp theo trường 'createdAt' giảm dần
          const snapshot = await userTicketsRef.get();
          const ticketData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTickets(ticketData);
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  const renderTicketItem = ({item}) => (
    <View style={styles.ticketItem}>
      <Text style={styles.ticketText}>Movie: {item.movieTitle}</Text>
      <Text style={styles.ticketText}>Date: {item.date}</Text>
      <Text style={styles.ticketText}>Time: {item.time}</Text>
      <Text style={styles.ticketText}>Seat: {item.seat}</Text>
    </View>
  );

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
