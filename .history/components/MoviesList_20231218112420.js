import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const MoviesList = () => {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Lấy danh sách các bộ phim từ Firestore khi component được mount
    const fetchMovies = async () => {
      try {
        const moviesSnapshot = await firestore().collection('movies').get();
        const moviesData = moviesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMovies(moviesData);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu phim:', error);
      }
    };

    fetchMovies();
  }, []);

  const handlePress = (movieId) => {
    navigation.navigate('MovieDetailScreen', { movieId });
  };

  return (
    <View>
      {movies.map((movie) => (
        <Button
          key={movie.id}
          title={movie.title}
          onPress={() => handlePress(movie.id)}
        />
      ))}
    </View>
  );
};

export default MoviesList;
