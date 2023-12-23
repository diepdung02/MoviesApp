import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';

const MovieManagementScreen = () => {
  const [movies, setMovies] = useState([]);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [details, setDetails] = useState('');
  const [Year, setYear] = useState('');
  const [images, setImages] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedType, setSelectedType] = useState('');

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
      await firestore().collection('movies').doc(id).set({
        id,
        title,
        director,
        details,
        Year,
        images,
        type: selectedType,
      });
      setId('');
      setTitle('');
      setDirector('');
      setDetails('');
      setYear('');
      setImages('');
      setSelectedType('');
    }
  };

  const deleteMovie = async (movieId) => {
    try {
      await firestore().collection('movies').doc(movieId).delete();
      console.log('Document successfully deleted!');
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };
  

  const updateMovie = async () => {
    if (selectedMovie && title.trim() !== '') {
      await firestore().collection('movies').doc(selectedMovie.id).update({
        id,
        title,
        director,
        details,
        Year,
        images,
        type: selectedType,
      });
      setId('');
      setTitle('');
      setDirector('');
      setDetails('');
      setYear('');
      setImages('');
      setEditMode(false);
      setSelectedMovie(null);
      setSelectedType('');
    }
  };

  const handleEdit = (movie) => {
    setEditMode(true);
    setSelectedMovie(movie);
    setId(movie.id);
    setTitle(movie.title);
    setDirector(movie.director);
    setDetails(movie.details);
    setYear(movie.Year);
    setImages(movie.images);
    setSelectedType(movie.type);
  };

  const renderItem = ({ item }) => (
    <View style={styles.movieItem}>
      <View style={styles.movieDetails}>
        <Image source={{ uri: item.images }} style={styles.movieImage} />
        <Text>ID: {item.id}</Text>
        <Text>{item.title}</Text>
        <Text>Director: {item.director}</Text>
        <Text>Year: {item.Year}</Text>
        <Text>Type: {item.type}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleEdit(item)}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => deleteMovie(item.id)}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Movie Management Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter movie ID"
        value={id}
        onChangeText={(text) => setId(text)}
      />
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
        value={Year}
        onChangeText={(text) => setYear(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter image URL"
        value={images}
        onChangeText={(text) => setImages(text)}
      />
      <Picker
        selectedValue={selectedType}
        onValueChange={(itemValue, itemIndex) => setSelectedType(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Select movie type" value="" />
        <Picker.Item label="Trending" value="Trending" />
        <Picker.Item label="Upcoming" value="Upcoming" />
        <Picker.Item label="Now Showing" value="Now Showing" />
      </Picker>
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
    marginBottom: 20,
  },
  movieDetails: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
  },
  movieImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  movieTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 8,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  movieList: {
    flex: 1,
  },
});

export default MovieManagementScreen;
