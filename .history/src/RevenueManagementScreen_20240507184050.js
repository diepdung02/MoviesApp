import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { format, toDate, isValid } from 'date-fns';

const RevenueScreen = () => {
  const [movieRevenue, setMovieRevenue] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('ticket')
      .onSnapshot(querySnapshot => {
        const movieRevenueData = {};

        querySnapshot.forEach(doc => {
          const { movieId, totalPrice, bookingdate } = doc.data();
          const date = toDate(bookingdate);

          if (isValid(date)) {
            const formattedMonth = format(date, 'MM-yyyy');
            const key = `${movieId}-${formattedMonth}`;

            if (!movieRevenueData[key]) {
              movieRevenueData[key] = { movieId, month: formattedMonth, revenue: 0 };
            }

            movieRevenueData[key].revenue += totalPrice;
          }
        });

        const sortedMovieRevenue = Object.values(movieRevenueData);
        setMovieRevenue(sortedMovieRevenue);
      });

    return () => unsubscribe();
  }, []);

  const renderRevenueItem = ({ item }) => (
    <View style={styles.revenueItem}>
      <Text style={styles.date}>{item.month}</Text>
      <Text style={styles.revenue}>{(item.revenue * 1000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 })}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Doanh Thu Theo Bộ Phim</Text>
      <FlatList
        data={movieRevenue}
        renderItem={renderRevenueItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#363636',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  revenueItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
    color: 'white',
  },
  revenue: {
    fontSize: 16,
    color: 'white',
  },
});

export default RevenueScreen;
