import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const RevenueManagementScreen = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    calculateTotalRevenue();
  }, []);

  const calculateTotalRevenue = async () => {
    try {
      const querySnapshot = await firestore().collectionGroup('tickets').get();
      let total = 0;

      querySnapshot.forEach(doc => {
        const ticketData = doc.data();
        const totalPrice = ticketData.totalPrice || 0; // Giả sử totalPrice là số, nếu không có thì mặc định là 0
        total += totalPrice;
      });

      setTotalRevenue(total);
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
        <Text style={styles.label}>Doanh thu tổng cộng:</Text>
        <Text style={styles.value}>{getFormattedPrice(totalRevenue)}</Text>
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
