import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import firestore from '@react-native-firebase/firestore';

const PaymentScreen = ({ route }) => {
  const { movieId, selectedSeats } = route.params;
  const [loading, setLoading] = useState(true);
  const [movieDetails, setMovieDetails] = useState(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [qrCodeData, setQRCodeData] = useState('');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieRef = firestore().collection('movies').doc(movieId);
        const documentSnapshot = await movieRef.get();

        if (documentSnapshot.exists) {
          const movieData = documentSnapshot.data();
          setMovieDetails(movieData);
          setLoading(false);
        } else {
          console.log('Movie not found');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

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

  const generateQRCodeData = () => {
    const randomNumber = Math.floor(Math.random() * 1000000) + 1;
    const qrCodeData = `${randomNumber}`;
    return qrCodeData;
  };

  const handlePayment = () => {
    setTimeout(() => {
      const generatedQRCodeData = generateQRCodeData();
      setQRCodeData(generatedQRCodeData);
      setPaymentCompleted(true);
    }, 2000);
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!movieDetails) {
    return <Text>Movie not found</Text>;
  }

  return (
    <View style={styles.container}>
      {paymentCompleted ? (
        // Hiển thị thông tin vé và mã QR code
        <View>
          <Text style={styles.headerText}>Thông tin đặt vé</Text>
          <View style={styles.paymentDetails}>
            <Text style={styles.detailTitle}>Tên Phim:</Text>
            <Text style={styles.detailText}>{movieDetails.title}</Text>
            <Text style={styles.detailTitle}>Ghế Đã Chọn:</Text>
            {selectedSeats.map((seat, index) => (
              <Text key={index} style={styles.detailText}>{`${seat.row}${seat.number}`}</Text>
            ))}
            <Text style={styles.detailTitle}>Tổng Cộng:</Text>
            <Text style={styles.detailText}>{totalPrice.toLocaleString('en-US')} VND</Text>
            <Text style={styles.detailTitle}>Mã Code:</Text>
            <Text style={styles.detailText}>{qrCodeData}</Text>
            <QRCode value={qrCodeData} size={200} />
          </View>
        </View>
      ) : (
        // Màn hình thanh toán
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
  //...Styles
});

export default PaymentScreen;

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
