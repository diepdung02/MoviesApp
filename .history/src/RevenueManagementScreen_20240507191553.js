import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { format, toDate, isValid } from 'date-fns';

const RevenueScreen = () => {
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [movieRevenue, setMovieRevenue] = useState([]);

  useEffect(() => {
    const unsubscribeDaily = firestore()
      .collection('ticket')
      .orderBy('bookingdate', 'desc')
      .onSnapshot(querySnapshot => {
        const dailyRevenueData = querySnapshot.docs.reduce((acc, doc) => {
          const { bookingdate, totalPrice } = doc.data();
          const date = toDate(bookingdate);
          if (isValid(date)) {
            const formattedDate = format(date, 'dd-MM-yyyy');
            acc[formattedDate] = (acc[formattedDate] || 0) + totalPrice;
          }
          return acc;
        }, {});

        const sortedDailyRevenue = Object.entries(dailyRevenueData).map(([date, revenue]) => ({ date, revenue }));
        setDailyRevenue(sortedDailyRevenue);
      });

    const unsubscribeMonthly = firestore()
      .collection('ticket')
      .orderBy('bookingdate', 'desc')
      .onSnapshot(querySnapshot => {
        const monthlyRevenueData = querySnapshot.docs.reduce((acc, doc) => {
          const { bookingdate, totalPrice } = doc.data();
          const date = toDate(bookingdate);
          if (isValid(date)) {
            const formattedMonth = format(date, 'MM-yyyy');
            acc[formattedMonth] = (acc[formattedMonth] || 0) + totalPrice;
          }
          return acc;
        }, {});

        const sortedMonthlyRevenue = Object.entries(monthlyRevenueData).map(([date, revenue]) => ({ date, revenue }));
        setMonthlyRevenue(sortedMonthlyRevenue);
      });

    const unsubscribeMovie = firestore()
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

    return () => {
      unsubscribeDaily();
      unsubscribeMonthly();
      unsubscribeMovie();
    };
  }, []);

  const renderRevenueItem = ({ item }) => (
    <View style={styles.revenueItem}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.revenue}>{(item.revenue * 1000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 })}</Text>
    </View>
  );

  const renderMovieRevenueItem = ({ item }) => (
    <View style={styles.revenueItem}>
      <Text style={styles.movieTitle}>{item.movieTitle}</Text>
      <Text style={styles.revenue}>{(item.revenue * 1000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 })}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Doanh Thu Hàng Ngày</Text>
        <FlatList
          data={dailyRevenue}
          renderItem={renderRevenueItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View>
        <Text style={styles.header}>Doanh Thu Hàng Tháng</Text>
        <FlatList
          data={monthlyRevenue}
          renderItem={renderRevenueItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View>
        <Text style={styles.header}>Doanh Thu Theo Bộ Phim</Text>
        <FlatList
          data={movieRevenue}
          renderItem={renderMovieRevenueItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
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
