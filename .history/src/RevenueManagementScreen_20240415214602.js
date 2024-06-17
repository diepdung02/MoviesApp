const calculateTotalRevenue = async () => {
  try {
    const querySnapshot = await firestore().collectionGroup('tickets').get();
    let dailyRevenue = {};
    let monthlyRevenue = {};

    querySnapshot.forEach(doc => {
      const ticketData = doc.data();
      const totalPrice = ticketData.totalPrice || 0;

      // Kiểm tra giá trị ngày không hợp lệ
      if (!ticketData.selectedDate) {
        console.warn('Ticket document with invalid selectedDate:', doc.id);
        return; // Bỏ qua tài liệu không hợp lệ và tiếp tục với các tài liệu khác
      }

      // Chuyển đổi selectedDate thành đối tượng Date
      const ticketDate = new Date(ticketData.selectedDate);
      if (isNaN(ticketDate.getTime())) {
        console.warn('Invalid date format for ticket:', doc.id);
        return; // Bỏ qua tài liệu không hợp lệ và tiếp tục với các tài liệu khác
      }

      // Lấy ngày (yyyy-mm-dd)
      const dayKey = ticketDate.toISOString().split('T')[0];
      // Lấy tháng (yyyy-mm)
      const monthKey = ticketDate.toISOString().slice(0, 7);

      // Tính tổng doanh thu theo ngày
      dailyRevenue[dayKey] = (dailyRevenue[dayKey] || 0) + totalPrice;
      // Tính tổng doanh thu theo tháng
      monthlyRevenue[monthKey] = (monthlyRevenue[monthKey] || 0) + totalPrice;
    });

    setTotalDailyRevenue(dailyRevenue);
    setTotalMonthlyRevenue(monthlyRevenue);
  } catch (error) {
    console.error('Error calculating total revenue:', error);
  }
};
