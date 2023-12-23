import React, { useEffect, useState } from 'react';
import { firestore } from '@react-native-firebase/firestore';

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

  return null;
};

export default BannerData;
