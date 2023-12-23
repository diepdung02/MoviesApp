import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import BannerCarousel from 'react-native-banner-carousel'; // Change import for BannerCarousel

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
          const bannerData = [];

          querySnapshot.docs.forEach(documentSnapshot => {
            bannerData.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });

          setBanners(bannerData);
          setLoading(false);

          // Send data to the parent component (Home) through props
          onDataReceived(bannerData);
          
          // Log data after updating state
          console.log(bannerData);
        } else {
          console.log('No data available');
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
    <BannerCarousel autoplay autoplayTimeout={5000} loop index={0} pageSize={width}>
      {banners.map((banner, index) => renderBanner(banner, index))}
    </BannerCarousel>
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
