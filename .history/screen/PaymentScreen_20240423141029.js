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
      </View