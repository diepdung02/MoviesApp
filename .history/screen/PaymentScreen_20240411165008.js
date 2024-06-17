import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import firestore from '@react-native-firebase/firestore';
import { useRoute, useNavigation } from '@react-navigation/native';
import firebase from '@react-native-firebase/app';

const PaymentScreen = () => {
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [qrCodeData, setQRCodeData] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const { movieTitle, selectedSeats, movieIMG, selectedShowtime, selectedDate, totalPrice } = route.params;
  const [selectedBank, setSelectedBank] = useState(null);

  const generateQRCodeData = () => {
    const randomNumber = Math.floor(Math.random() * 1000000) + 1;
    return `${randomNumber}`;
  };

  const savePaymentToFirestore = () => {
    const user = firebase.auth().currentUser;
    if (user) {
      const email = user.email;
      const ticket = {
        movieTitle: movieTitle,
        selectedSeats: selectedSeats,
        totalPrice: totalPrice,
        selectedBank: selectedBank,
        selectedShowtime: selectedShowtime,
        selectedDate: selectedDate,
      };

      firestore()
        .collection('users')
        .doc(email)
        .collection('tickets')
        .add(ticket)
        .then(docRef => {
          console.log('Dữ liệu thanh toán đã được lưu trữ thành công trên Firestore với ID:', docRef.id);
          setPaymentCompleted(true);
        })
        .catch(error => {
          console.error('Lỗi khi lưu dữ liệu thanh toán trên Firestore:', error);
        });
    } else {
      console.error('Người dùng chưa đăng nhập!');
    }
  };

  const handlePayment = () => {
    const generatedQRCodeData = generateQRCodeData();
    setQRCodeData(generatedQRCodeData);
    savePaymentToFirestore();
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
      {paymentCompleted ? (
        <View>
          <Image source={{ uri: movieIMG }} style={styles.image} />
          <Text style={styles.headerText}>Thông tin đặt vé</Text>
          <View style={styles.paymentDetails}>
            <Text style={styles.detailTitle}>Tên Phim:</Text>
            <Text style={styles.detailText}>{movieTitle}</Text>
            <Text style={styles.detailTitle}>Ngày Đặt:</Text>
            <Text style={styles.detailText}>{selectedDate}</Text>
            <Text style={styles.selectedShowtime}>Giờ chiếu: {selectedShowtime}</Text>
            <Text style={styles.detailTitle}>Ghế Đã Chọn:</Text>
            {selectedSeats.length > 0 &&
              selectedSeats.map((seat, index) => (
                <Text key={index} style={styles.detailText}>{`${seat.row}${seat.number}`}</Text>
              ))}
            <Text style={styles.totalPrice}>Tổng Tiền: {getFormattedPrice(totalPrice)} VND</Text>
            <Text style={styles.detailTitle}>Mã Code:</Text>
            <Text style={styles.detailText}>{qrCodeData}</Text>
            <QRCode value={qrCodeData} size={200} />
          </View>
        </View>
      ) : (
        <View>
          <View style={styles.bankButtonsContainer}>
            <TouchableOpacity
              style={[
                styles.bankButton,
                selectedBank === 'Vietcombank' && styles.selectedBank,
              ]}
              onPress={() => setSelectedBank('Vietcombank')}>
              <Text style={styles.bankButtonText}>Vietcombank</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.bankButton,
                selectedBank === 'BIDV' && styles.selectedBank,
              ]}
              onPress={() => setSelectedBank('BIDV')}>
              <Text style={styles.bankButtonText}>BIDV</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.bankButton,
                selectedBank === 'Techcombank' && styles.selectedBank,
              ]}
              onPress={() => setSelectedBank('Techcombank')}>
              <Text style={styles.bankButtonText}>Techcombank</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.headerText}>Thanh Toán</Text>
          <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
            <Text style={styles.payButtonText}>Thanh Toán Ngay</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.homeButtonText}>Trở về trang chính</Text>
      </TouchableOpacity>
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
    marginTop: 20,
  },
  payButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  bankButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
  bankButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '30%',
  },
  bankButtonText: {
    fontWeight: 'bold',
  },
  selectedBank: {
    backgroundColor: 'gray',
  },
  selectedShowtime: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
  },
  homeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 8,
  },
  homeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
