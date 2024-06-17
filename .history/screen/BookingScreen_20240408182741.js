const handlePayment = async () => {
  console.log('Selected showtime:', selectedShowtime);
  setSelectedSeats([]);
  setTotalPrice(0);

  // Lưu trạng thái ghế đã đặt lên Firebase
  try {
    const bookingRef = await firestore().collection('bookings').add({
      movieId: movieId,
      showtime: selectedShowtime,
      seats: selectedSeats.map(seat => `${seat.row}${seat.number}`),
    });
    console.log('Booking successful! Booking ID:', bookingRef.id);
  } catch (error) {
    console.error('Error saving booking:', error);
    // Xử lý lỗi khi không thể lưu trạng thái đặt vé
    // Ví dụ: Hiển thị thông báo cho người dùng
    return;
  }

  // Chuyển hướng đến màn hình thanh toán
  navigation.navigate('PaymentScreen', {
    movieId,
    movieTitle,
    selectedSeats,
    totalPrice,
    movieIMG,
    selectedShowtime,
  });
};
