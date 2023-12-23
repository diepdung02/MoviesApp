import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ShowtimeScreen = () => {
  const [showtimes, setShowtimes] = useState([]);

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const showtimesSnapshot = await firestore().collection('showtimes').get();
        const showtimesData = showtimesSnapshot.docs.map(doc => doc.data());
        setShowtimes(showtimesData);
      } catch (error) {
        console.error('Error fetching showtimes:', error);
      }
    };

    fetchShowtimes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Danh sách suất chiếu</Text>
      <FlatList
        data={showtimes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.showtimeItem}>
            <Text style={styles.showtimeText}>{`Rạp: ${item.cinema}`}</Text>
            <Text style={styles.showtimeText}>{`Ngày: ${item.date}`}</Text>
            <Text style={styles.showtimeText}>{`Giờ: ${item.time}`}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  showtimeItem: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  showtimeText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ShowtimeScreen;
