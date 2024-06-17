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

  // Khai báo bookingDate ở đây để có thể truy cập từ JSX
  const bookingDate = new Date();
const formattedBookingDate = format(bookingDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
 // Lấy ngày đặt vé hiện tại

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
  
      // Sử dụng bookingDate đã khai báo ở đây
      firestore()
        .collection('users')
        .doc(email)
        .collection('tickets')
        .doc(formattedBookingDate) // Sử dụng ngày đặt vé làm ID cho tài liệu
        .set(ticket)
        .then(() => {
          console.log('Dữ liệu thanh toán đã được lưu trữ thành công trên Firestore với ID:', formattedBookingDate);
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
         <View style={styles.container}>
         <View style={styles.header}>
           <Text style={styles.title}>Vé của tôi</Text>
           <Text style={styles.time}>10:01</Text>
         </View>
         <View style={styles.movieInfo}>
           <Text style={styles.movieTitle}>Avengers: Infinity War</Text>
           <Text style={styles.movieDuration}>2 tiếng 29 phút</Text>
           <Text style={styles.movieGenres}>Hành động, phiêu lưu, khoa học viễn tưởng</Text>
         </View>
         <View style={styles.cinemaInfo}>
           <Text style={styles.cinemaName}>AVENDERS</Text>
           <Text style={styles.showTime}>14h15'</Text>
           <Text style={styles.seat}>Ghế H7, H8</Text>
           <Text style={styles.price}>210.000 VND</Text>
         </View>
         <View style={styles.locationInfo}>
           <Text style={styles.locationName}>Vincom Ocean Park Cov</Text>
           <Text style={styles.address}>Tầng 4, Vincom Ocean Park, Da Ton, Gia Lam, Hà Nội</Text>
         </View>
         <View style={styles.qrCodeContainer}>
           <Image source={require('./qrCode.png')} style={styles.qrCode} />
           <Text style={styles.qrCodeInstruction}>Quét mã QR này tại quầy vé để nhận vé</Text>
         </View>
         <View style={styles.orderIdContainer}>
           <Text style={styles.orderIdLabel}>Mã đơn hàng:</Text>
           <Text style={styles.orderId}>78889377726</Text>
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
