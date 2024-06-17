import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import firestore from '@react-native-firebase/firestore';
import { useRoute, useNavigation } from '@react-navigation/native';
import firebase from '@react-native-firebase/app';
import { format, parseISO } from 'date-fns';

const PaymentScreen = () => {
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [qrCodeData, setQRCodeData] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const { movieTitle, selectedSeats, movieIMG, selectedShowtime, selectedDate, totalPrice } = route.params;
  const [selectedBank, setSelectedBank] = useState(null);

  const bookingDate = new Date();
  const formattedBookingDate = format(bookingDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

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
        .doc(formattedBookingDate)
        .set(ticket)
        .then(() => {
          console.log('Dữliệu thanh toán đã được lưu trữ thành công trên Firestore với ID:', formattedBookingDate);
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
        <View style={styles.paymentCompletedContainer}>
          <Image source={{ uri: movieIMG }} style={styles.movieImage} />
          <View style={styles.paymentCompletedContent}>
            <Text style={styles.paymentCompletedTitle}>Thông tin đặt vé</Text>
            <View style={styles.paymentCompletedItem}>
              <Text style={styles.paymentCompletedLabel}>Tên Phim:</Text>
              <Text style={styles.paymentCompletedValue}>{movieTitle}</Text>
            </View>
            <View style={styles.paymentCompletedItem}>
              <Text style={styles.paymentCompletedLabel}>Ngày Chiếu:</Text>
              <Text style={styles.paymentCompletedValue}>{selectedDate}</Text>
            </View>
            <View style={styles.paymentCompletedItem}>
              <Text style={styles.paymentCompletedLabel}>Giờ chiếu:</Text>
              <Text style={styles.paymentCompletedValue}>{selectedShowtime}</Text>
            </View>
            <View style={styles.paymentCompletedItem}>
              <Text style={styles.paymentCompletedLabel}>Ngày Đặt Vé:</Text>
              <Text style={styles.paymentCompletedValue}>{formattedBookingDate}</Text>
            </View>
            <View style={styles.paymentCompletedItem}>
              <Text style={styles.paymentCompletedLabel}>Ghế Đã Chọn:</Text>
              {selectedSeats.length > 0 &&
                selectedSeats.map((seat, index) => (
                  <Text key={index} style={styles.paymentCompletedValue}>
                    {`${seat.row}${seat.number}`}
                  </Text>
                ))}
            </View>
            <View style={styles.paymentCompletedItem}>
              <Text style={styles.paymentCompletedLabel}>Tổng Tiền:</Text>
              <Text style={styles.paymentCompletedValue}>
                {getFormattedPrice(totalPrice)} VND
              </Text>
            </View>
            <View style={styles.qrCodeContainer}>
              <Text style={styles.paymentCompletedLabel}>Mã Code:</Text>
              <QRCode value={qrCodeData} size={200} style={styles.qrCode} />
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.paymentContainer}>
          <Text style={styles.paymentTitle}>Thanh Toán</Text>
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
          <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
            <Text style={styles.payButtonText}>Thanh Toán Ngay</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('HomeScreen')}>
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
    backgroundColor: '#ccc',
  },
  paymentContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '80%',
  },
  paymentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
  movieImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  paymentCompletedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    width: '100%',
  },
  paymentCompletedContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '80%',
  },
  paymentCompletedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  paymentCompletedItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  paymentCompletedLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentCompletedValue: {
    fontSize: 16,
  },
  qrCodeContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  qrCode: {
    marginTop: 10,},
  homeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 8,
    width: '80%',
  },
  homeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PaymentScreen;