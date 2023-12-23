import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { BannerCarousel } from 'react-native-banner-carousel';

const BannerAds = () => {
  const banners = [
    {
      image: 'URL_IMAGE_1',
      title: 'Ad Title 1',
      description: 'Description 1',
    },
    {
      image: 'URL_IMAGE_2',
      title: 'Ad Title 2',
      description: 'Description 2',
    },
    // Add more banner data as needed
  ];

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

export default BannerAds;
