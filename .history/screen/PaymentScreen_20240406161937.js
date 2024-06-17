import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';
import firebase from '@react-native-firebase/app';

const PaymentScreen = () => {
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const route = useRoute();
  const {movieTitle, selectedSeats, selectedShowtime} = route.params;
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
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

    setTotalPrice(calculateTotalPrice());
  }, [selectedSeats]);

  const savePaymentToFirestore = () => {
    const user = firebase.auth().currentUser;
    if (user) {
      const email = user.email;
      const ticket = {
        movieTitle: movieTitle,
        selectedSeats: selectedSeats,
        totalPrice: totalPrice,
        selectedShowtime: selectedShowtime,
      };

      firestore()
        .collection('users')
        .doc(email)
        .collection('tickets')
        .add(ticket)
        .then(docRef => {
          console.log(
            'Dữ liệu thanh toán đã được lưu trữ thành công trên Firestore với ID:',
            docRef.id,
          );
          setPaymentCompleted(true);
        })
        .catch(error => {
          console.error(
            'Lỗi khi lưu dữ liệu thanh toán trên Firestore:',
            error,
          );
        });
    } else {
      console.error('Người dùng chưa đăng nhập!');
    }
  };

  useEffect(() => {
    if (selectedShowtime) {
      savePaymentToFirestore();
    }
  }, []);

  return (
    <View style={styles.container}>
      {paymentCompleted ? (
        <View>
          <Text style={styles.headerText}>Thanh toán hoàn thành!</Text>
          <Text style={styles.detailText}>Giờ chiếu: {selectedShowtime}</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.headerText}>Thanh toán</Text>
          <Text style={styles.detailText}>Giờ chiếu: {selectedShowtime}</Text>
          <Text style={styles.detailText}>Tổng cộng: {totalPrice} VND</Text>
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
  detailText: {
    marginBottom: 10,
  },
});

export default PaymentScreen;
