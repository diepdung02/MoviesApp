import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { format, toDate, isValid } from 'date-fns';

const RevenueScreen = () => {
  const [movieRevenue, setMovieRevenue] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('ticket')
      .orderBy('bookingdate', 'desc')
      .onSnapshot(querySnapshot => {
        const movieRevenueData = {};

        querySnapshot.forEach(doc => {
          const { movieId, totalPrice } = doc.data();

          // Lấy tên phim từ movieId
          firestore()
            .collection('movies')
            .doc(movieId)
            .get()
            .then(movieDoc => {
              const movieTitle = movieDoc.exists ? movieDoc.data().title : 'Unknown Movie';

              // Tính tổng doanh thu cho từng bộ phim
              if (!movieRevenueData[movieId]) {
                movieRevenueData[movieId] = { movieId, movieTitle, revenue: 0 };
              }
              movieRevenueData[movieId].revenue += totalPrice;

              // Cập nhật state với dữ liệu doanh thu mới
              setMovieRevenue(Object.values(movieRevenueData));
            });
        });
      });

    return () => unsubscribe();
  }, []);

  const renderRevenueItem = ({ item }) => (
    <View style={styles.revenueItem}>
      <Text style={styles.movieTitle}>{item.movieTitle}</Text>
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
  movieTitle: {
    fontSize: 16,
    color: 'white',
    flex: 1,
    marginLeft: 10,
  },
  revenue: {
    fontSize: 16,
    color: 'white',
  },
});

export default RevenueScreen;
