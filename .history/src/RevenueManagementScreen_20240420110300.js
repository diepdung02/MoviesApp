import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const RevenueManagementScreen = () => {
  const [totalDailyRevenue, setTotalDailyRevenue] = useState({});
  const [totalMonthlyRevenue, setTotalMonthlyRevenue] = useState({});

  useEffect(() => {
    calculateTotalRevenue();
  }, []);

  const calculateTotalRevenue = async () => {
    try {
      const querySnapshot = await firestore().collectionGroup('tickets').get();
      let dailyRevenue = {};
      let monthlyRevenue = {};
  
      querySnapshot.forEach(doc => {
        const ticketData = doc.data();
        const totalPrice = ticketData.totalPrice || 0;
  
        // Kiểm tra giá trị ngày không hợp lệ
        if (!ticketData.selectedDate) {
          console.warn('Ticket document with invalid selectedDate:', doc.id);
          return; // Bỏ qua tài liệu không hợp lệ và tiếp tục với các tài liệu khác
        }
  
        // Chuyển đổi selectedDate thành đối tượng Date
        const ticketDate = new Date(ticketData.selectedDate);
        if (isNaN(ticketDate.getTime())) {
          console.warn('Invalid date format for ticket:', doc.id);
          return; // Bỏ qua tài liệu không hợp lệ và tiếp tục với các tài liệu khác
        }
  
        // Lấy ngày (dd-mm-yyyy)
        const dayKey = `${ticketDate.getDate()}-${ticketDate.getMonth() + 1}-${ticketDate.getFullYear()}`;
        // Lấy tháng (mm-yyyy)
        const monthKey = `${ticketDate.getMonth() + 1}-${ticketDate.getFullYear()}`;
  
        // Tính tổng doanh thu theo ngày
        dailyRevenue[dayKey] = (dailyRevenue[dayKey] || 0) + totalPrice;
        // Tính tổng doanh thu theo tháng
        monthlyRevenue[monthKey] = (monthlyRevenue[monthKey] || 0) + totalPrice;
      });
  
      setTotalDailyRevenue(dailyRevenue);
      setTotalMonthlyRevenue(monthlyRevenue);
    } catch (error) {
      console.error('Error calculating total revenue:', error);
    }
  };
  
  

  function getFormattedPrice(price) {
    return price.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 3,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Quản lí doanh thu</Text>

      <View style={styles.revenueContainer}>
        <Text style={styles.label}>Doanh thu theo ngày:</Text>
        {Object.keys(totalDailyRevenue).map(date => (
          <Text key={date} style={styles.value}>
            {date}: {getFormattedPrice(totalDailyRevenue[date])}
          </Text>
        ))}
      </View>

      <View style={styles.revenueContainer}>
        <Text style={styles.label}>Doanh thu theo tháng:</Text>
        {Object.keys(totalMonthlyRevenue).map(month => (
          <Text key={month} style={styles.value}>
            {month}: {getFormattedPrice(totalMonthlyRevenue[month])}
          </Text>
        ))}
      </View>
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
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  revenueContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  value: {
    fontSize: 16,
  },
});

export default RevenueManagementScreen;
