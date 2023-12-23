import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const BannerData = ({ onDataReceived, navigation }) => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = firestore()
      .collection('banners')
      .limit(5)
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          const banners = [];

          querySnapshot.docs.forEach(documentSnapshot => {
            banners.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });

          setBanners(banners);
          setLoading(false);

          // Gửi dữ liệu về Home component thông qua props
          onDataReceived(banners);

          // Log dữ liệu sau khi cập nhật state
          console.log(banners);
        } else {
          console.log('Không có dữ liệu');
        }
      });

    return () => subscriber();
  }, []);

  const navigateToDetail = (banner) => {
    // Điều hướng đến màn hình chi tiết khi người dùng nhấn vào banner
    navigation.navigate('DetailScreen', { banner }); // Thay 'DetailScreen' bằng tên màn hình chi tiết thực tế của bạn
  };

  return (
    <View>
      {banners.map((banner, index) => (
        <TouchableOpacity key={index} onPress={() => navigateToDetail(banner)}>
          {/* Hiển thị thông tin của banner */}
          <Text>{banner.title}</Text>
          {/* ... */}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BannerData;
