// Màn hình chi tiết bộ phim (MovieDetailScreen.js)
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const MovieDetailScreen = ({ route }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // Lấy thông tin chi tiết của bộ phim từ Firestore dựa trên movieId
    const fetchMovieDetail = async () => {
      try {
        const movieDoc = await firestore().collection('movies').doc(movieId).get();
        if (movieDoc.exists) {
          setMovie(movieDoc.data());
        } else {
          console.log('Không tìm thấy bộ phim');
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin bộ phim:', error);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  if (!movie) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: movie.posterUrl }} style={styles.posterImage} />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.director}>Director: {movie.director}</Text>
      <Text style={styles.year}>Year: {movie.year}</Text>
      <Text style={styles.description}>{movie.description}</Text>
      {/* Hiển thị các thông tin khác của bộ phim */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  posterImage: {
    width: 200,
    height: 300,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  director: {
    fontSize: 18,
    marginBottom: 5,
  },
  year: {
    fontSize: 16,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default MovieDetailScreen;
