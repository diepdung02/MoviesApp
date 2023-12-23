import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const BannerData = ({ onDataReceived }) => {
  useEffect(() => {
    const [s, setForeigns] = useState([]);   
    const fetchData = async () => {
      try {
        const bannersRef = firestore().collection('banners');
        const querySnapshot = await bannersRef.get();

        const fetchedBanners = [];
        querySnapshot.forEach(documentSnapshot => {
          fetchedBanners.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        });

        onDataReceived(fetchedBanners);
      } catch (error) {
        console.error('Error fetching banner data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <Text>Loading banner data...</Text>
    </View>
  );
};

export default BannerData;
