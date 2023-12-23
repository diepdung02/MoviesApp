import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg'; // Import thư viện QRCode

const PaymentScreen = ({ route }) => {
  const { selectedSeats,  } = route.params;
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [qrCodeData, setQRCodeData] = useState('');
  

  const getMovieTitle = async () => {
    try {
      const movieRef = firestore().collection('movies').doc(movieId);
      const documentSnapshot = await movieRef.get();
      if (documentSnapshot.exists) {
        const movieData = documentSnapshot.data();
        setMovieTitle(movieData.title);
      }
    } catch (error) {
      console.error('Error getting movie title:', error);
    }
  };

  useEffect(() => {
    getMovieTitle();
  }, [movieId]);

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
    // Tạo dữ liệu mã QR code từ thông tin vé hoặc mã code
    // Ví dụ: mã code có thể là mã ngẫu nhiên hoặc thông tin vé được mã hóa
    const randomNumber = Math.floor(Math.random() * 1000000) + 1; // Tạo số ngẫu nhiên từ 1 đến 1,000,000
    const qrCodeData = `${randomNumber}`; // Chuỗi dữ liệu ngẫu nhiên cho mã QR code
    return qrCodeData;
  };
  
  // Khi thanh toán thành công, gọi hàm handlePayment để tạo và hiển thị mã QR code
  const handlePayment = () => {
    // Giả lập quá trình thanh toán
    // Sau khi thanh toán thành công, cập nhật state và hiển thị thông tin vé
    setTimeout(() => {
      const generatedQRCodeData = generateQRCodeData();
      setQRCodeData(generatedQRCodeData);
      setPaymentCompleted(true);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {paymentCompleted ? (
        <View>
          {/* Hiển thị thông tin vé và mã QR code */}
          <Text style={styles.headerText}>Thông tin đặt vé</Text>
          <View style={styles.paymentDetails}>
            <Text style={styles.detailTitle}>Tên Phim:</Text>
            <Text style={styles.detailText}>{movieTitle}</Text>
            {/* Các phần thông tin khác */}
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
        <View>
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
});

export default PaymentScreen;
