import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import QRCode from 'react-native-qrcode-svg'; // Import thư viện QRCode
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';

const PaymentScreen = () => {
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [qrCodeData, setQRCodeData] = useState('');
  const route = useRoute();
  const [movieDetails, setMovieDetails] = useState(null);
  const {movieId, movieTitle, selectedSeats, movieIMG} = route.params;
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Tính tổng giá vé khi selectedSeats thay đổi
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
    return `${randomNumber}`;
  };

  const handlePayment = () => {
    const generatedQRCodeData = generateQRCodeData();
    setQRCodeData(generatedQRCodeData);
    setPaymentCompleted(true);
    // Thực hiện các hành động thanh toán khác ở đây nếu cần
  };

  return (
    <View style={styles.container}>
      {paymentCompleted ? (
        <View>
          {/* Hiển thị thông tin vé và mã QR code */}
          <Image source={{uri: movieIMG}} style={styles.image} />
          <Text style={styles.headerText}>Thông tin đặt vé</Text>
          <View style={styles.paymentDetails}>
            <Text style={styles.detailTitle}>Tên Phim:</Text>
            <Text style={styles.detailText}>{movieTitle}</Text>
            {/* Các thông tin khác */}
            <Text style={styles.detailTitle}>Ghế Đã Chọn:</Text>
            {selectedSeats.map((seat, index) => (
              <Text
                key={index}
                style={styles.detailText}>{`${seat.row}${seat.number}`}</Text>
            ))}
            <Text style={styles.detailTitle}>Tổng Cộng:</Text>
            <Text style={styles.detailText}>
              {totalPrice.toLocaleString('en-US')} VND
            </Text>
            <Text style={styles.detailTitle}>Mã Code:</Text>
            <Text style={styles.detailText}>{qrCodeData}</Text>
            <QRCode value={qrCodeData} size={200} />
          </View>
        </View>
      ) : (
        
        <View>
           <View style={styles.bankButtonsContainer}>
            {/* Vietcombank */}
            <TouchableOpacity
              style={styles.bankButton}
              onPress={() => handleBankPayment('Vietcombank')}>
              <Text style={styles.bankButtonText}>Vietcombank</Text>
            </TouchableOpacity>

            {/* BIDV */}
            <TouchableOpacity
              style={styles.bankButton}
              onPress={() => handleBankPayment('BIDV')}>
              <Text style={styles.bankButtonText}>BIDV</Text>
            </TouchableOpacity>

            {/* Techcombank */}
            <TouchableOpacity
              style={styles.bankButton}
              onPress={() => handleBankPayment('Techcombank')}>
              <Text style={styles.bankButtonText}>Techcombank</Text>
            </TouchableOpacity>

            {/* You can add more bank buttons as needed */}
          </View>
          {/* Màn hình thanh toán */}
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
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  bankButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '80%',
  },
  bankButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '30%', // Adjust width as needed based on the number of buttons
  },
  bankButtonText: {
    fontWeight: 'bold',
  },
  selectedBank: {
    backgroundColor: 'blue', // Change the color when selected
    // You can adjust this to the desired color
  },
});

export default PaymentScreen;
