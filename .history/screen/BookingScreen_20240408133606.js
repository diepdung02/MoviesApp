// Define getFormattedPrice function
const getFormattedPrice = (price) => {
  const formattedPrice = price.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  });

  // Remove trailing 'đ' character
  return formattedPrice.replace('đ', '');
};
