import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

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
              const tickets = [];
              querySnapshot.forEach(doc => {
                tickets.push({ id: doc.id, ...doc.data() });
              });
              // Lưu danh sách vé vào state hoặc làm bất kỳ thứ gì bạn muốn với dữ liệu
              console.log('Danh sách vé:', tickets);
            } catch (error) {
              console.error('Lỗi khi truy vấn tickets:', error);
            }
          } else {
            console.error('Người dùng chưa đăng nhập!');
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
