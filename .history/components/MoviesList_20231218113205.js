import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const MovieList = ({ navigation }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore().collection('movies')
      .where('id', 'in', ['1', '2']) // Lọc theo id là 1 hoặc 2
      .onSnapshot(snapshot => {
        const moviesData = [];
        snapshot.forEach(doc => {
          moviesData.push({ id: doc.id, ...doc.data() });
        });
        setMovies(moviesData);
      });

    return () => unsubscribe();
  }, []);

  const handleMoviePress = (movieId) => {
    navigation.navigate('MovieDetail', { movieId });
  };

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleMoviePress(item.id)}>
      <View>
        <Text>{item.title}</Text>
        {/* Hiển thị thông tin khác về bộ phim tại đây nếu cần */}
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={movies}
      renderItem={renderMovieItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default MovieList;
