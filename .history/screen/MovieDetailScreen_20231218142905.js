import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const MovieDetailScreen = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const subscriber = firestore()
      .collection('movies')
      .limit(1)
      .onSnapshot(querySnapshot => {
        if (!querySnapshot.empty) {
          const moviesData = [];

          querySnapshot.forEach(documentSnapshot => {
            moviesData.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });

          setMovies(moviesData);
          setLoading(false);

          // Log data after updating state
          console.log(moviesData);
        } else {
          console.log('No data available');
        }
      });

    return () => subscriber();
  }, []);

  const handleMoviePress = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          {selectedMovie ? (
            <View style={styles.placeContainer}>
              <Image style={styles.placeIMG} source={{ uri: selectedMovie.images }} />
              <Text style={styles.placeTitle}>{selectedMovie.title}</Text>
              <Text style={styles.placePrice}>{selectedMovie.year}</Text>
              <Text style={styles.placePrice}>{selectedMovie.details}</Text>
              <Text style={styles.placePrice}>{selectedMovie.director}</Text>
              <TouchableOpacity onPress={() => setSelectedMovie(null)}>
                <Text style={styles.placePrice}>Go Back</Text>
              </TouchableOpacity>
            </View>
          ) : (
            movies.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => handleMoviePress(item)}>
                <View style={styles.placeContainer}>
                  <Image style={styles.placeIMG} source={{ uri: item.images }} />
                  <Text style={styles.placeTitle}>{item.title}</Text>
                  <Text style={styles.placePrice}>{item.year}</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  placeContainer: {
    margin: 10,
    alignItems: 'center',
  },
  placeIMG: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
  placeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  placePrice: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default MovieDetailScreen;
