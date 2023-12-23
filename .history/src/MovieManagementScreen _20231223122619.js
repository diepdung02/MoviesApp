import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Image } from 'react-native';
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
      setTitle('');
      setDirector('');
      setDetails('');
      setReleaseYear('');
      setImageURL('');
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
      setTitle('');
      setDirector('');
      setDetails('');
      setReleaseYear('');
      setImageURL('');
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

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 8 }}>
      <View style={{ flex: 1 }}>
        <Image
          source={{ uri: item.imageURL }}
          style={{ width: 50, height: 50, marginRight: 10 }}
        />
        <Text>{item.title}</Text>
        <Text>Director: {item.director}</Text>
        <Text>Year: {item.releaseYear}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Button title="Edit" onPress={() => handleEdit(item)} />
        <Button title="Delete" onPress={() => deleteMovie(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Movie Management Screen</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 8 }}
        placeholder="Enter movie title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 8 }}
        placeholder="Enter director"
        value={director}
        onChangeText={(text) => setDirector(text)}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 8 }}
        placeholder="Enter details"
        value={details}
        onChangeText={(text) => setDetails(text)}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 8 }}
        placeholder="Enter release year"
        value={releaseYear}
        onChangeText={(text) => setReleaseYear(text)}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 8 }}
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
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default MovieManagementScreen;
