import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PaymentScreen = ({ navigation, route }) => {
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const { selectedSeats } = route.params;

  const calculateTotalPrice = () => {
    return selectedSeats.reduce((acc, seat) => {
      switch (seat.type) {
        case 'VIP':
          return acc + 179000;
        case 'Low':
          return acc + 110000;
        default:
          return acc + 139000;
      }
    }, 0);
  };

  const [totalPrice, setTotalPrice] = useState(calculateTotalPrice());

  const handlePayment = () => {
    // Giả lập quá trình thanh toán
    // Thực tế, đây sẽ là nơi gọi API thanh toán với VNPay và xử lý phản hồi từ VNPay
    // Sau khi thanh toán thành công, cập nhật state và hiển thị thông tin vé
    setTimeout(() => {
      setPaymentCompleted(true);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {paymentCompleted ? (
        <View>
          <Text style={styles.headerText}>Thông tin đặt vé</Text>
          <View style={styles.paymentDetails}>
            <Text style={styles.detailTitle}>Ghế Đã Chọn:</Text>
            {selectedSeats.map((seat, index) => (
              <Text key={index} style={styles.detailText}>{`${seat.row}${seat.number}`}</Text>
            ))}
            <Text style={styles.detailTitle}>Tổng Cộng:</Text>
            <Text style={styles.detailText}>{totalPrice.toLocaleString('en-US')} VND</Text>
            <Text style={styles.detailTitle}>Mã Code:</Text>
            <Text style={styles.detailText}>{Math.random().toString(36).substr(2, 10).toUpperCase()}</Text>
          </View>
        </View>
      ) : (
        <View>
          <Text style={styles.headerText}>Thanh Toán</Text>
          <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
            <Text style={styles.payButtonText}>Thanh Toán Ngay</Text>
          </TouchableOpacity>
        </View>
      )}
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paymentDetails: {
    width: '80%',
  },
  detailTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailText: {
    marginBottom: 5,
  },
  payButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default PaymentScreen;
