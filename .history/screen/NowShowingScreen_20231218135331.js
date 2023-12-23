import React, { useState, useEffect } from 'react';
import { View, Text, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const { width, height } = Dimensions.get('window');

const NowShowingScreen = ({onDataReceived}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('movies')
      .limit(5)
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          const movies = [];

          querySnapshot.docs.forEach(documentSnapshot => {
            movies.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });

          setMovies(movies);
          setLoading(false);

          // Gửi dữ liệu về Home component thông qua props
          onDataReceived(movies);
          
          // Log dữ liệu sau khi cập nhật state
          console.log(movies);
        } else {
          console.log('Không có dữ liệu');
        }
      });

    return () => subscriber();
  }, []);

  return null;
};

  const handleClick = (itemId) => {
    // Navigate to MovieDetailScreen with the specific itemId
    navigation.navigate('MovieDetailScreen', { movieId: itemId });
  };

  const renderItem = ({ item }) => (
    <MovieCard item={item} handleClick={handleClick} />
  );
  const MovieCard = ({ item, handleClick }) => (
    <TouchableWithoutFeedback onPress={() => handleClick(item.id)}>
      <Image
        source={{ uri: item.images }}
        style={{
          width: width * 0.6,
          height: height * 0.4,
          borderRadius: 20,
        }}
      />
    </TouchableWithoutFeedback>

 





export default NowShowingScreen;
