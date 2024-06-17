import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';

const RevenueManagementScreen = () => {
  const [vipRevenue, setVipRevenue] = useState(0);
  const [normalRevenue, setNormalRevenue] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');

  const calculateTotalRevenue = () => {
    const total = vipRevenue + normalRevenue;
    setTotalRevenue(total);
  };

  const handleDateChange = date => {
    setSelectedDate(date);
    // Perform any additional logic here, such as fetching revenue data for the selected date
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Quản lí doanh thu</Text>
      <TextInput
        style={styles.input}
        placeholder="Doanh thu VIP"
        value={vipRevenue.toString()}
        onChangeText={text => setVipRevenue(parseFloat(text))}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Doanh thu thường"
        value={normalRevenue.toString()}
        onChangeText={text => setNormalRevenue(parseFloat(text))}
        keyboardType="numeric"
      />
      <Button title="Tính toán" onPress={calculateTotalRevenue} />
      <Text style={styles.result}>Tổng doanh thu: {totalRevenue}</Text>
      <TextInput
        style={styles.input}
        placeholder="Chọn ngày (YYYY-MM-DD)"
        value={selectedDate}
        onChangeText={handleDateChange}
      />
      {/* Display revenue data for the selected date */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  result: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default RevenueManagementScreen;
