import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const BannerScreen = () => {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % banners.length;
      setCurrentIndex(nextIndex);
    }, 5000); // Timeout sau mỗi 5 giây

    return () => clearTimeout(timeout);
  }, [currentIndex, banners]);

  const renderBanner = ({ item, index }) => (
    <View style={[styles.bannerContainer, index === currentIndex ? styles.activeBanner : null]}>
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
        pagingEnabled
        initialScrollIndex={0}
        getItemLayout={(data, index) => ({
          length: 200,
          offset: 200 * index,
          index,
        })}
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
    opacity: 0.7,
  },
  activeBanner: {
    opacity: 1,
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

