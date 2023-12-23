import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const MovieManagementScreen = () => {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [details, setDetails] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const unsubscribe = firestore().collection('movies').onSnapshot((snapshot) => {
      const moviesData = [];
      snapshot.forEach((doc) => {
        const movie = doc.data();
        moviesData.push({ id: doc.id, ...movie });
      });
      setMovies(moviesData);
    });

    return () => unsubscribe();
  }, []);

  const addMovie = async () => {
    if (title.trim() !== '') {
      await firestore().collection('movies').add({
        title,
        director,
        details,
        releaseYear,
        imageURL,
      });
      clearInputs();
    }
  };

  const deleteMovie = async (movieId) => {
    await firestore().collection('movies').doc(movieId).delete();
  };

  const updateMovie = async () => {
    if (selectedMovie && title.trim() !== '') {
      await firestore().collection('movies').doc(selectedMovie.id).update({
        title,
        director,
        details,
        releaseYear,
        imageURL,
      });
      clearInputs();
      setEditMode(false);
      setSelectedMovie(null);
    }
  };

  const handleEdit = (movie) => {
    setEditMode(true);
    setSelectedMovie(movie);
    setTitle(movie.title);
    setDirector(movie.director);
    setDetails(movie.details);
    setReleaseYear(movie.releaseYear);
    setImageURL(movie.imageURL);
  };

  const clearInputs = () => {
    setTitle('');
    setDirector('');
    setDetails('');
    setReleaseYear('');
    setImageURL('');
  };

  const renderItem = ({ item }) => (
    <View style={styles.movieItem}>
      <View style={styles.movieDetails}>
        <Image
          source={{ uri: item.imageURL }}
          style={styles.movieImage}
        />
        <View style={styles.movieText}>
          <Text style={styles.movieTitle}>{item.title}</Text>
          <Text style={styles.movieInfo}>Director: {item.director}</Text>
          <Text style={styles.movieInfo}>Year: {item.releaseYear}</Text>
        </View>
      </View>
      <View style={styles.movieButtons}>
        <Button title="Edit" onPress={() => handleEdit(item)} />
        <Button title="Delete" onPress={() => deleteMovie(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Movie Management Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter movie title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter director"
        value={director}
        onChangeText={(text) => setDirector(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter details"
        value={details}
        onChangeText={(text) => setDetails(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter release year"
        value={releaseYear}
        onChangeText={(text) => setReleaseYear(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter image URL"
        value={imageURL}
        onChangeText={(text) => setImageURL(text)}
      />
      <Button
        title={editMode ? 'Update' : 'Add'}
        onPress={editMode ? updateMovie : addMovie}
      />
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.movieList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  movieItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  movieDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  movieImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  movieText: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  movieInfo: {
    fontSize: 14,
    color: '#666666',
  },
  movieButtons: {
    flexDirection: 'column-reverse',
  },
  movieList: {
    flex: 1,
  },
});

export default MovieManagementScreen;
