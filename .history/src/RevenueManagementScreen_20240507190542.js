import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { format, toDate, isValid } from 'date-fns';

const RevenueScreen = () => {
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [movieRevenue, setMovieRevenue] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('ticket')
      .orderBy('bookingdate', 'desc')
      .onSnapshot(querySnapshot => {
        const dailyRevenueData = {};
        const monthlyRevenueData = {};
        const movieRevenueData = {};

        querySnapshot.forEach(async doc => {
          const { movieId, totalPrice, bookingdate } = doc.data();
          const date = toDate(bookingdate);
          const formattedDate = format(date, 'dd-MM-yyyy'); // Định dạng ngày tháng thành "dd-MM-yyyy"
          const formattedMonth = format(date, 'MM-yyyy'); // Định dạng ngày tháng thành "MM-yyyy"

          // Tính toán doanh thu hàng ngày
          if (isValid(date)) {
            dailyRevenueData[formattedDate] = (dailyRevenueData[formattedDate] || 0) + totalPrice;
          }

          // Tính toán doanh thu hàng tháng
          if (isValid(date)) {
            monthlyRevenueData[formattedMonth] = (monthlyRevenueData[formattedMonth] || 0) + totalPrice;
          }

          const ticketRef = firestore().collection('ticket').doc(doc.id);
          const movieDoc = await ticketRef.collection('movieId').doc(movieTitle).get();
          let movieTitle = 'Unknown Movie';
          if (movieDoc.exists) {
            movieTitle = movieDoc.data().movieTitle;
          }
          // Tính toán doanh thu theo bộ phim
          const key = `${movieId}-${formattedDate}`;
          if (!movieRevenueData[key]) {
            movieRevenueData[key] = { movieId, movieTitle, date: formattedDate, revenue: 0 };
          }
          movieRevenueData[key].revenue += totalPrice;
        });

        const sortedDailyRevenue = Object.entries(dailyRevenueData).map(([date, revenue]) => ({ date, revenue }));
        setDailyRevenue(sortedDailyRevenue);

        const sortedMonthlyRevenue = Object.entries(monthlyRevenueData).map(([date, revenue]) => ({ date, revenue }));
        setMonthlyRevenue(sortedMonthlyRevenue);

        const sortedMovieRevenue = Object.values(movieRevenueData);
        setMovieRevenue(sortedMovieRevenue);
      });

    return () => unsubscribe();
  }, []);

  const renderRevenueItem = ({ item }) => (
    <View style={styles.revenueItem}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.movieTitle}>{item.movieTitle}</Text>
      <Text style={styles.revenue}>{(item.revenue * 1000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 })}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Doanh Thu Hàng Ngày</Text>
      <FlatList
        data={dailyRevenue}
        renderItem={renderRevenueItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Text style={styles.header}>Doanh Thu Hàng Tháng</Text>
      <FlatList
        data={monthlyRevenue}
        renderItem={renderRevenueItem}
        keyExtractor={(item, index) => index.toString()}
      />
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
