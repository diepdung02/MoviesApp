import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
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
  <ScrollView style={styles.container}>
   {paymentCompleted ? (
    <View style={styles.ticketContainer}>
     <Image source={{ uri: movieIMG }} style={styles.image} />
     <Text style={styles.headerText}>Thông tin đặt vé</Text>
     <View style={styles.paymentDetails}>
      <Text style={styles.detailTitleLabel}>Tên Phim:</Text>
      <Text style={styles.detailTextLabel}>{movieTitle}</Text>
      <Text style={styles.detailTitleLabel}>Ngày Chiếu:</Text>
      <Text style={styles.detailTextLabel}>{selectedDate}</Text>
      <Text style={styles.selectedShowtime}>Giờ chiếu: {selectedShowtime}</Text>
      <Text style={styles.detailTitleLabel}>Ngày Đặt Vé:</Text>
      <Text style={styles.detailTextLabel}>{formattedBookingDate}</Text>
      <Text style={styles.detailTitleLabel}>Ghế Đã Chọn:</Text>
      <View style={styles.selectedSeatsContainer}>
        {selectedSeats.map((seat, index) => (
         <Text key={index} style={styles.selectedSeatText}>
           {seat.row}{seat.number}
         </Text>
        ))}
      </View<Text style={styles.totalPrice}>Tổng Tiền: {getFormattedPrice(totalPrice)} VND</Text>
<Text style={styles.detailTitleLabel}>Mã Code:</Text>
<Text style={styles.detailTextLabel}>{qrCodeData}</Text>
<QRCode value={qrCodeData} size={200} />
<TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('HomeScreen')}>
<Text style={styles.homeButtonText}>Trở về trang chính</Text>
</TouchableOpacity>
</View>
</View>
) : (
<View style={styles.bankButtonsContainer}>
<TouchableOpacity
style={[styles.bankButton, selectedBank === 'Vietcombank' && styles.selectedBank]}
onPress={() => setSelectedBank('Vietcombank')}>
<Text style={styles.bankButtonText}>Vietcombank</Text>
</TouchableOpacity>
<TouchableOpacity
style={[styles.bankButton, selectedBank === 'BIDV' && styles.selectedBank]}
onPress={() => setSelectedBank('BIDV')}>
<Text style={styles.bankButtonText}>BIDV</Text>
</TouchableOpacity>
<TouchableOpacity
style={[styles.bankButton, selectedBank === 'Techcombank' && styles.selectedBank]}
onPress={() => setSelectedBank('Techcombank')}>
<Text style={styles.bankButtonText}>Techcombank</Text>
</TouchableOpacity>
</View>
<Text style={styles.headerText}>Thanh Toán</Text>
<TouchableOpacity style={styles.payButton} onPress={handlePayment}>
<Text style={styles.payButtonText}>Thanh Toán Ngay</Text>
</TouchableOpacity>
)}
</View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#ccc',
},
headerText: {
fontSize: 24,
fontWeight: 'bold',
marginBottom: 20,
},
paymentDetails: {
width: '90%',
paddingHorizontal: 20,
marginBottom: 20,
backgroundColor: '#fff',
borderRadius: 10,
shadowColor: '#000',
shadowOffset: {
width: 0,
height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,
elevation: 5,
},
detailTitleLabel: {
fontWeight: 'bold',
marginBottom: 5,
},
detailTextLabel: {
marginBottom: 5,
},
image: {
width: 200,
height: 200,
alignSelf: 'center',
marginBottom: 20,
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
bankButtonsContainer: {
flexDirection: 'row',
justifyContent: 'space-around',
marginTop: 20,
width: '90%',
paddingHorizontal: 20,
},
bankButton: {
backgroundColor: '#f0f0f0',
padding: 15,
borderRadius: 8,
alignItems: 'center',
width: '30%',
},
selectedBank: {
backgroundColor: '#e2e2e2',
},
bankButtonText: {
fontWeight: 'bold',
},
payButton: {
backgroundColor: 'blue',
padding: 15,
borderRadius: 8,
alignItems: 'center',
marginTop: 20,
width: '90%',
marginHorizontal: 20,
},
payButtonText: {
color: 'white',
fontWeight: 'bold',
fontSize: 18,
},
homeButton: {
backgroundColor: 'green',
padding: 15,
borderRadius: 8,
alignItems: 'center',
marginTop: 20,
width: '90%',
marginHorizontal: 20,
},
homeButtonText: {
color: 'white',
fontWeight: 'bold',
fontSize: 18,
},
ticketContainer: {
width: '95%',
paddingHorizontal: 20,
marginBottom: 20,
backgroundColor: '#fff',
borderRadius: 10,
shadowColor: '#000',
shadowOffset: {
width: 0,
height: 2,
},
shadowOpacity: