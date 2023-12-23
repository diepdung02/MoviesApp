
import { View, Text, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';







const { width, height } = Dimensions.get('window');



const PlaceData = ({ onDataReceived }) => {
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Place')
      .limit(5)
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          const places = [];

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

export default function NowShowingScreen() {
  const navigation = useNavigation();
  
  const handleClick = (item) => {
    navigation.navigate('MovieDetailScreen', item.id);
   
  };

  const renderItem = ({ item }) => (
    <MovieCard item={item} handleClick={handleClick} />
  );

  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={{ color: 'white', fontSize: 20, marginLeft: 8, marginBottom: 5 }}>
        Trending
      </Text>
      <Carousel
        data={data}
        renderItem={renderItem}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ alignItems: 'center' }}
      />
    </View>
  );
}

const MovieCard = ({ item, handleClick }) => (
  <TouchableWithoutFeedback onPress={() => handleClick(item)}>
    <Image
      source={{ uri: item.poster_path }}
      style={{
        width: width * 0.6,
        height: height * 0.4,
        borderRadius: 20, // Adjust the border radius as needed
      }}
    />
  </TouchableWithoutFeedback>
);
