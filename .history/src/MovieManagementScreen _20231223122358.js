import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const MovieManagementScreen = () => {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const unsubscribe = firestore().collection('movies').onSnapshot((snapshot) => {
      const moviesData = [];
      snapshot.forEach((doc) => {
        moviesData.push({ id: doc.id, title: doc.data().title });
      });
      setMovies(moviesData);
    });

    return () => unsubscribe();
  }, []);

  const addMovie = async () => {
    if (title.trim() !== '') {
      await firestore().collection('movies').add({ title });
      setTitle('');
    }
  };

  const deleteMovie = async (movieId) => {
    await firestore().collection('movies').doc(movieId).delete();
  };

  const updateMovie = async () => {
    if (selectedMovie && title.trim() !== '') {
      await firestore().collection('movies').doc(selectedMovie.id).update({ title });
      setTitle('');
      setEditMode(false);
      setSelectedMovie(null);
    }
  };

  const handleEdit = (movie) => {
    setEditMode(true);
    setSelectedMovie(movie);
    setTitle(movie.title);
  };

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 8 }}>
      <Text>{item.title}</Text>
      <View style={{ flexDirection: 'row' }}>
        <Button title="Edit" onPress={() => handleEdit(item)} />
        <Button title="Delete" onPress={() => deleteMovie(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Movie Management Screen</Text>
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <TextInput
          style={{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 1, marginRight: 10, paddingHorizontal: 8 }}
          placeholder="Enter movie title"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <Button
          title={editMode ? 'Update' : 'Add'}
          onPress={editMode ? updateMovie : addMovie}
        />
      </View>
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
