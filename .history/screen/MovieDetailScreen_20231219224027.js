import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';

const MovieDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { movieId } = route.params;
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieRef = firestore().collection('movies').doc(movieId);
        const doc = await movieRef.get();
        if (doc.exists) {
          setMovieDetails(doc.data());
        } else {
          console.log('Movie not found');
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleBooking = () => {
    if (movieDetails) {
      navigation.navigate('BookingScreen', { movieId, movieTitle: movieDetails.title });
    }
  };

  return (
    <View style={styles.container}>
      {movieDetails ? (
        <>
          <Text style={styles.title}>{movieDetails.title}</Text>
          {/* Hiển thị các thông tin khác của bộ phim */}
          <TouchableOpacity style={styles.button} onPress={handleBooking}>
            <Text>Đặt vé</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default MovieDetailScreen;
