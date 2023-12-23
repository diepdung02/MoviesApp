import React from 'react';
import { View, Text, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';







const { width, height } = Dimensions.get('window');

const data = [
  {
    id: 1,
    title: 'Movie 1',
    poster_path: 'https://images.squarespace-cdn.com/content/v1/5aadf482aa49a1d810879b88/1626698419120-J7CH9BPMB2YI728SLFPN/1.jpg',
  },
  {
    id: 2,
    title: 'Movie 2',
    poster_path: 'https://images.squarespace-cdn.com/content/v1/5aadf482aa49a1d810879b88/1626698419120-J7CH9BPMB2YI728SLFPN/1.jpg',
  },
  {
    id: 1,
    title: 'Movie 1',
    poster_path: 'https://images.squarespace-cdn.com/content/v1/5aadf482aa49a1d810879b88/1626698419120-J7CH9BPMB2YI728SLFPN/1.jpg',
  },
  {
    id: 1,
    title: 'Movie 1',
    poster_path: 'https://images.squarespace-cdn.com/content/v1/5aadf482aa49a1d810879b88/1626698419120-J7CH9BPMB2YI728SLFPN/1.jpg',
  },
  {
    id: 1,
    title: 'Movie 1',
    poster_path: 'https://images.squarespace-cdn.com/content/v1/5aadf482aa49a1d810879b88/1626698419120-J7CH9BPMB2YI728SLFPN/1.jpg',
  },
   {
    id: 1,
    title: 'Movie 1',
    poster_path: 'https://images.squarespace-cdn.com/content/v1/5aadf482aa49a1d810879b88/1626698419120-J7CH9BPMB2YI728SLFPN/1.jpg',
  },
  // Add more movie objects as needed
];

export default function NowShowingScreen() {
  const navigation = useNavigation();
  
  const handleClick = (item) => {
    navigation.navigate('MovieDetail', { movieId: item.id });
   
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
