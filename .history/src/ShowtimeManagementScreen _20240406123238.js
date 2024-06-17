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
  const [cinema, setCinema] = useState('');
  const [showtime, setShowtime] = useState('');
  const [showtimes, setShowtimes] = useState([]); // Thêm state để lưu trữ danh sách mốc thời gian

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
        cinema,
        showtimes, // Lưu trữ danh sách mốc thời gian vào cơ sở dữ liệu
      });
      setId('');
      setTitle('');
      setDirector('');
      setDetails('');
      setYear('');
      setImages('');
      setSelectedType('');
      setCinema('');
      setShowtime('');
      setShowtimes([]); // Xóa danh sách mốc thời gian sau khi thêm vào cơ sở dữ liệu
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
        cinema,
        showtimes, // Cập nhật danh sách mốc thời gian vào cơ sở dữ liệu khi cập nhật phim
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
      setCinema('');
      setShowtime('');
      setShowtimes([]); // Xóa danh sách mốc thời gian sau khi cập nhật phim
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
    setCinema(movie.cinema);
    setShowtimes(movie.showtimes); // Hiển thị danh sách mốc thời gian khi sửa
  };

  const renderItem = ({ item }) => (
    <View style={styles.movieItem}>
      <View style={styles.movieDetails}>
        <Image source={{ uri: item.images }} style={styles.movieImage} />
        <Text>ID: {item.id}</Text>
        <Text>{item.title}</Text>
        <Text>Đạo diễn: {item.director}</Text>
        <Text>Năm sản xuất: {item.Year}</Text>
        <Text>Danh mục phim: {item.type}</Text>
        <Text>Rạp chiếu phim: {item.cinema}</Text>
        <Text>Ngày giờ chiếu:</Text>
        {/* Hiển thị danh sách mốc thời gian */}
        {item.showtimes.map((time, index) => (
          <Text key={index}>{time}</Text>
        ))}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleEdit(item)}>
            <Text style={styles.buttonText}>Sửa thông tin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => deleteMovie(item.id)}>
            <Text style={styles.buttonText}>Xóa thông tin</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Quản lí phim</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập ID của phim"
        value={id}
        onChangeText={(text) => setId(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập tiêu đề phim "
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập tên đạo diễn"
        value={director}
        onChangeText={(text) => setDirector(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập chi tiết phim"
        value={details}
        onChangeText={(text) => setDetails(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập năm sản xuất phim"
        value={Year}
        onChangeText={(text) => setYear(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập link ảnh của phim"
        value={images}
        onChangeText={(text) => setImages(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập rạp chiếu phim"
        value={cinema}
        onChangeText={(text) => setCinema(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập ngày giờ chiếu"
        value={showtime}
        onChangeText={(text) => setShowtime(text)}
      />
      <Button
        title={editMode ? 'Cập nhật phim' : 'Thêm phim'}
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
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default MovieManagementScreen;
