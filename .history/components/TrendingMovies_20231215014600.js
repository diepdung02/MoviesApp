import React from 'react';
import { View, Text, Image, Dimensions, TouchableWithoutFeedback , F} from 'react-native';
import Carousel from 'react-native-snap-carousel';



const { width, height } = Dimensions.get('window');

const data = [
  {
    id: 1,
    title: 'Movie 1',
    poster_path: 'https://www.hoteljob.vn/files/quang-ba-khach-san.jpg',
  },
  {
    id: 2,
    title: 'Movie 2',
    poster_path: 'https://www.hoteljob.vn/files/quang-ba-khach-san.jpg',
  },
  {
    id: 1,
    title: 'Movie 1',
    poster_path: 'https://www.hoteljob.vn/files/quang-ba-khach-san.jpg',
  },
  {
    id: 1,
    title: 'Movie 1',
    poster_path: 'https://www.hoteljob.vn/files/quang-ba-khach-san.jpg',
  },
  {
    id: 1,
    title: 'Movie 1',
    poster_path: 'https://www.hoteljob.vn/files/quang-ba-khach-san.jpg',
  },
  {
    id: 1,
    title: 'Movie 1',
    poster_path: 'https://www.hoteljob.vn/files/quang-ba-khach-san.jpg',
  },
  // Add more movie objects as needed
];

export default function TrendingMovies() {
  const handleClick = (item) => {
    console.log('Clicked movie:', item.title);
   
  };

  const renderItem = ({ item }) => (
    <MovieCard item={item} handleClick={handleClick} />
  );

  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={{ color: 'white', fontSize: 20, marginLeft: 8, marginBottom: 5 }}>
        Trending
      </Text>
      <Fa
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
