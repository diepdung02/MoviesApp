// File: Home.js
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import MovieData from './MovieData'; // Đường dẫn đến MovieData component

const Home = () => {
  const [movies, setMovies] = useState([]);

  const onDataReceived = moviesData => {
    setMovies(moviesData);
  };

  return (
    <View>
      <Text>Danh sách phim:</Text>
      <MovieData onDataReceived={onDataReceived} />
      {movies.map(movie => (
        <View key={movie.id}>
          <Text>{movie.title}</Text>
          {/* Hiển thị các thông tin khác của phim */}
        </View>
      ))}
    </View>
  );
};

export default Home;
