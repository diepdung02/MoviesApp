import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

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
            places.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });

          setPlaces(places);
          setLoading(false);

          // Gửi dữ liệu về Home component thông qua props
          onDataReceived(places);
          
          // Log dữ liệu sau khi cập nhật state
          console.log(places);
        } else {
          console.log('Không có dữ liệu');
        }
      });

    return () => subscriber();
  }, []);

  return null;
};

export default BannerData;