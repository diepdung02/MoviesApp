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
          const formattedDate = format(date, 'dd-MM-yyyy'); // Định dạng ngày tháng thành "dd-MM-yyyy"
          const key = `${movieId}-${formattedDate}`;

          if (!movieRevenueData[key]) {
            movieRevenueData[key] = { movieId, date: formattedDate, revenue: 0, movieTitle: '' };
          }

          movieRevenueData[key].revenue += totalPrice;
        });

        // Lấy tên phim cho mỗi bộ phim
        getMovieTitles(movieRevenueData)
          .then(updatedMovieRevenueData => {
            const sortedMovieRevenue = Object.values(updatedMovieRevenueData);
            setMovieRevenue(sortedMovieRevenue);
          });
      });

    return () => unsubscribe();
  }, []);

  const renderRevenueItem = ({ item }) => (
    <View style={styles.revenueItem}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.movieName}>{item.movieTitle}</Text>
      <Text style={styles.revenue}>{(item.revenue * 1000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 })}</Text>
    </View>
  );

  const getMovieTitles = async (movieRevenueData) => {
    const updatedMovieRevenueData = { ...movieRevenueData };
    const movieIds = Object.keys(updatedMovieRevenueData).map(key => updatedMovieRevenueData[key].movieId);

    // Truy vấn Firestore để lấy tên phim từ movieId
    const querySnapshot = await firestore()
      .collection('movies')
      .where(firestore.FieldPath.documentId(), 'in', movieIds)
      .get();

    querySnapshot.forEach(doc => {
      const movieId = doc.id;
      const movieTitle = doc.data().movieTitle;
      const key = `${movieId}-${updatedMovieRevenueData[movieId].date}`;
      updatedMovieRevenueData[key].movieTitle = movieTitle;
    });

    return updatedMovieRevenueData;
  };

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
  movieName: {
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
