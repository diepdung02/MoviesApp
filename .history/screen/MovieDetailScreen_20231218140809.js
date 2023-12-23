import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const MovieDetailScreen = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('movies')
      .limit(5)
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

  const renderMovieItem = ({ item }) => (
    <View style={styles.placeContainer}>
      <Image style={styles.placeIMG} source={{ uri: item.images }} />
      <Text style={styles.placeTitle}>{item.title}</Text>
      <Text style={styles.placePrice}>{item.year}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={movies}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
        />
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
