import React from 'react';
import { View, Text, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const data = [
  // Dữ liệu các phim
  // ...
];

const NowShowingScreen= ({navigation.navigate('')}) =>{
  

  const handleClick = (item) => {
    navigation.navigate('MovieDetailScreen', { movieId: item.id });
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
        borderRadius: 20, // Điều chỉnh độ cong viền nếu cần
      }}
    />
  </TouchableWithoutFeedback>
);

export default NowShowingScreen;