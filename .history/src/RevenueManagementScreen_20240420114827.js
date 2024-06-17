import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { format, toDate, isValid } from 'date-fns';

const RevenueScreen = () => {
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  useEffect(() => {
    const unsubscribeDaily = firestore()
      .collection('ticket')
      .orderBy('selectedDate', 'desc')
      .onSnapshot(querySnapshot => {
        const dailyRevenueData = querySnapshot.docs.reduce((acc, doc) => {
          const { bookingdate, totalPrice } = doc.data();
          console.log("Selected Date:", bookingdate); // Log ngày được chọn
          console.log("Total Price:", totalPrice); // Log tổng giá trị
        
          const date = toDate(bookingdate);
          if (isValid(date)) {
            const formattedDate = format(date, 'yyyy-MM-dd'); // Định dạng ngày tháng thành "yyyy-MM-dd"
            acc[formattedDate] = (acc[formattedDate] || 0) + totalPrice;
          }
          return acc;
        }, {});

        const sortedDailyRevenue = Object.entries(dailyRevenueData).map(([date, revenue]) => ({ date, revenue }));
        setDailyRevenue(sortedDailyRevenue);
        console.log("Daily Revenue Data:", sortedDailyRevenue); // Log dữ liệu doanh thu hàng ngày
      });

    const unsubscribeMonthly = firestore()
      .collection('ticket')
      .orderBy('selectedDate', 'desc')
      .onSnapshot(querySnapshot => {
        const monthlyRevenueData = querySnapshot.docs.reduce((acc, doc) => {
          const { bookingdate, totalPrice } = doc.data();
          console.log("Selected Date:", bookingdate); // Log ngày được chọn
          console.log("Total Price:", totalPrice); // Log tổng giá trị
          
          const date = toDate(selectedDate);
          if (isValid(date)) {
            const formattedMonth = format(date, 'yyyy-MM');
            acc[formattedMonth] = (acc[formattedMonth] || 0) + totalPrice;
          }
          return acc;
        }, {});

        const sortedMonthlyRevenue = Object.entries(monthlyRevenueData).map(([date, revenue]) => ({ date, revenue }));
        setMonthlyRevenue(sortedMonthlyRevenue);
        console.log("Monthly Revenue Data:", sortedMonthlyRevenue); // Log dữ liệu doanh thu hàng tháng
      });

    return () => {
      unsubscribeDaily();
      unsubscribeMonthly();
    };
  }, []);

  const renderRevenueItem = ({ item }) => (
    <View style={styles.revenueItem}>
      <Text style={styles.date}>{item.date}</Text>
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
