import React from 'react';
import { View, Text } from 'react-native';
import TrendingMovies from './TrendingMovies'; // Import TrendingMovies component here

const NowShowingScreen = () => {
  return (
    <View>
      <Text>Now Showing Movies</Text>
      {/* Hiển thị danh sách phim đang chiếu */}
      <TrendingMovies /> {/* Add TrendingMovies component here */}
    </View>
  );
};

export default NowShowingScreen;
