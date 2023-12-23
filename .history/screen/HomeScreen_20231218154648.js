import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import BannerCarousel from 'path/to/BannerCarousel'; // Import BannerCarousel component

const { width } = Dimensions.get('window');

const BannerData = ({ onDataReceived }) => {
  const [loading, setLoading] = useState(true);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('banner')
      .limit(5)
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          const banner = [];

          querySnapshot.docs.forEach(documentSnapshot => {
            banner.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });

          setBanners(banner);
          setLoading(false);

          // Gửi dữ liệu về Home component thông qua props
          onDataReceived(banner);

          // Log dữ liệu sau khi cập nhật state
          console.log(banner);
        } else {
          console.log('Không có dữ liệu');
        }
      });

    return () => subscriber();
  }, []);

  const renderBanner = (banner, index) => (
    <View key={index} style={styles.bannerContainer}>
      <Image source={{ uri: banner.image }} style={styles.bannerImage} />
      <View style={styles.bannerTextContainer}>
        <Text style={styles.bannerTitle}>{banner.title}</Text>
        <Text style={styles.bannerDescription}>{banner.description}</Text>
      </View>
    </View>
  );

  return (
    <View>
      {/* Sử dụng BannerCarousel để hiển thị banner */}
      <BannerCarousel autoplay autoplayTimeout={5000} loop index={0} pageSize={width}>
        {banners.map((banner, index) => renderBanner(banner, index))}
      </BannerCarousel>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  bannerImage: {
    width: '40%',
    aspectRatio: 2,
    borderRadius: 10,
    marginRight: 10,
  },
  bannerTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bannerDescription: {
    fontSize: 14,
    color: 'gray',
  },
});

export default BannerData;
