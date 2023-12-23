import React, { useState, useEffect } from 'react';
import { View, Text, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const { width, height } = Dimensions.get('window');

const TrendingMovies = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('movies')
      .limit(3)
      .where('id', '==', '4','5',) 
      .onSnapshot(querySnapshot => {
        const moviesData = [];

        querySnapshot.forEach(documentSnapshot => {
          moviesData.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        });

        setMovies(moviesData);
        setLoading(false);
      });

    return () => subscriber();
  }, []);

  const handleClick = (movieId) => {
    navigation.navigate('MovieDetailScreen', { movieId });
  };

  const renderItem = ({ item }) => (
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
  );

  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={{ color: 'white', fontSize: 20, marginLeft: 8, marginBottom: 5 }}>
        Trending
      </Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <Carousel
          data={movies}
          renderItem={renderItem}
          firstItem={1}
          inactiveSlideOpacity={0.6}
          sliderWidth={width}
          itemWidth={width * 0.62}
          slideStyle={{ alignItems: 'center' }}
        />
      )}
    </View>
  );
};

export default TrendingMovies;
