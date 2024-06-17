import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { format, toDate, isValid } from 'date-fns';

const RevenueScreen = () => {
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  useEffect(() => {
    const unsubscribeDaily = firestore()
      .collection('tickets')
      .orderBy('selectedDate', 'desc')
      .onSnapshot(querySnapshot => {
        const revenueData = {};
        querySnapshot.forEach(doc => {
          const { selectedDate, totalPrice } = doc.data();
          console.log("Selected Date:", selectedDate); // Ghi log dữ liệu ngày
          console.log("Total Price:", totalPrice); // Ghi log dữ liệu tổng giá trị
          const date = toDate(selectedDate);
          if (isValid(date)) {
            const formattedDate = format(date, 'yyyy-MM-dd');
            if (!revenueData[formattedDate]) {
              revenueData[formattedDate] = 0;
            }
            revenueData[formattedDate] += totalPrice;
          }
        });
        const sortedDailyRevenue = Object.entries(revenueData).map(([date, revenue]) => ({ date, revenue }));
        setDailyRevenue(sortedDailyRevenue);
        console.log("Daily Revenue Data:", sortedDailyRevenue); // Ghi log dữ liệu doanh thu hàng ngày
      });
  
    const unsubscribeMonthly = firestore()
      .collection('tickets')
      .orderBy('selectedDate', 'desc')
      .onSnapshot(querySnapshot => {
        const revenueData = {};
        querySnapshot.forEach(doc => {
          const { selectedDate, totalPrice } = doc.data();
          console.log("Selected Date:", selectedDate); // Ghi log dữ liệu ngày
          console.log("Total Price:", totalPrice); // Ghi log dữ liệu tổng giá trị
          const date = toDate(selectedDate);
          if (isValid(date)) {
            const formattedDate = format(date, 'yyyy-MM');
            if (!revenueData[formattedDate]) {
              revenueData[formattedDate] = 0;
            }
            revenueData[formattedDate] += totalPrice;
          }
        });
        const sortedMonthlyRevenue = Object.entries(revenueData).map(([date, revenue]) => ({ date, revenue }));
        setMonthlyRevenue(sortedMonthlyRevenue);
        console.log("Monthly Revenue Data:", sortedMonthlyRevenue); // Ghi log dữ liệu doanh thu hàng tháng
      });
  
    return () => {
      unsubscribeDaily();
      unsubscribeMonthly();
    };
  }, []);
  

  const renderRevenueItem = ({ item }) => (
    <View style={styles.revenueItem}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.revenue}>{item.revenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
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
