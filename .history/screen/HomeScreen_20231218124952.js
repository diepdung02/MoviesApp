import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import TrendingMovies from '../components/TrendingMovies';
import NowShowingScreen from '../components/NowShowingScreen';
import UpcomingScreen from '../components/UpcomingScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchMoviesData } from '../components/Firestore';
import MovieData from '../components/AddMovies';



const HomeScreen = ({ navigation }) => {
  const [selectedScreen, setSelectedScreen] = useState('NowShowing');
  const [movies, setMovies] = useState([]);

  const onDataReceived = moviesData => {
    setMovies(moviesData);
  };

  useEffect(() => {
    const fetchData = async () => {
      const moviesData = await fetchMoviesData();
      setMovies(moviesData);
    };

    fetchData();
  }, []);

  const showScreen = (screenName) => {
    setSelectedScreen(screenName);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Account')}>
            <Icon name="person" size={24} color="black" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Account')}>
            <Icon name="menu" size={24} color="black" style={styles.icon} />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={() => showScreen('TrendingMovies')}>
            <Text style={styles.buttonText}>Phim đang hot</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => showScreen('NowShowing'), }>
            <Text style={styles.buttonText}>Đang Chiếu</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => showScreen('Upcoming')}>
            <Text style={styles.buttonText}>Sắp chiếu</Text>
          </TouchableOpacity>
        </View>

        <View>
          {selectedScreen === 'TrendingMovies' && <TrendingMovies />}
          {selectedScreen === 'NowShowing' && <NowShowingScreen />}
          {selectedScreen === 'Upcoming' && <UpcomingScreen />}
        </View>
      </View>
      <View>
  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Danh sách phim:</Text>
  <MovieData onDataReceived={onDataReceived} />
  {movies.map(movie => (
    <View key={movie.id} style={{ marginVertical: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{movie.title}</Text>
      <Text>Đạo diễn: {movie.director}</Text>
      <Text>Năm sản xuất: {movie.year}</Text>
      <Text>Mô tả: {movie.details}</Text>
      {/* Thêm các thành phần khác tại đây như hình ảnh, nút xem chi tiết, v.v. */}
    </View>
  ))}
</View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    marginHorizontal: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'lightblue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default HomeScreen;
