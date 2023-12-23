import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

const MovieManagementScreen = () => {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const addMovie = () => {
    if (title.trim() !== '') {
      setMovies([...movies, { id: Date.now().toString(), title }]);
      setTitle('');
    }
  };

  const deleteMovie = (movieId) => {
    setMovies(movies.filter((movie) => movie.id !== movieId));
  };

  const updateMovie = () => {
    if (selectedMovie && title.trim() !== '') {
      setMovies(
        movies.map((movie) =>
          movie.id === selectedMovie.id ? { ...movie, title } : movie
        )
      );
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
