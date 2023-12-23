import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const MovieDetailScreen = ({ route }) => {
  const { movieId, movieTitle } = route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieIMG, setMovieIMG] = useState(null);

  const handleBooking = () => {
    navigation.navigate('BookingScreen', { movieId: movieId, movieTitle: movieDetails?.title, movieIMG: });
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieRef = firestore().collection('movies').where('id', '==', movieId);
        const querySnapshot = await movieRef.get();

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            setMovieDetails(doc.data());
          });
        } else {
          console.log('Movie not found');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!movieDetails) {
    return <Text>Movie not found</Text>;
  }
  

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: movieDetails.images }} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movieDetails.title}</Text>
        <Text style={styles.director}>Director: {movieDetails.director}</Text>
        <Text style={styles.year}>Year: {movieDetails.year}</Text>
        <Text style={styles.description}>{movieDetails.description}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={handleBooking}>
  <Text>Đặt vé</Text>
</TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
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
    lineHeight: 24,
  },
});

export default MovieDetailScreen;
