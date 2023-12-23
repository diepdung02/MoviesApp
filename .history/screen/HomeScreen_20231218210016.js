import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const BannerScreen = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('banners')
      .onSnapshot(querySnapshot => {
        const fetchedBanners = [];
        querySnapshot.forEach(documentSnapshot => {
          fetchedBanners.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        });
        setBanners(fetchedBanners);
      });

    return () => subscriber();
  }, []);

  const renderBanner = ({ item }) => (
    <View style={styles.bannerContainer}>
      <Image style={styles.bannerImage} source={{ uri: item.images }} />
      <Text style={styles.bannerTitle}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={banners}
        renderItem={renderBanner}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  bannerContainer: {
    marginRight: 20,
    alignItems: 'center',
  },
  bannerImage: {
    width: 150,
    height: 200,
    borderRadius: 10,
  },
  bannerTitle: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BannerScreen;


export default HomeScreen;
