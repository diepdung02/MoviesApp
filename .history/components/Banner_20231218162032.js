import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const BannerData = ({ onDataReceived }) => {
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
        onDataReceived(fetchedBanners);
      });

    return () => subscriber();
  }, []);

  return (
    <View>
      <Text>Loading banner data...</Text>
    </View>
  );
};

export default BannerData;
