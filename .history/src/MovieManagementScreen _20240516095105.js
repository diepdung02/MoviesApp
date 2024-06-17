import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firestore from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';

const MovieManagementScreen = () => {
  const [movies, setMovies] = useState([]);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [details, setDetails] = useState('');
  const [year, setYear] = useState('');
  const [images, setImages] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedType, setSelectedType] = useState('');
  const [showtimes, setShowtimes] = useState([]);
  const [vipPrice, setVipPrice] = useState('');
  const [lowPrice, setLowPrice] = useState('');
  const [normalPrice, setNormalPrice] = useState('');
  const [releaseDates, setReleaseDates] = useState([]);
  const [focusedInput, setFocusedInput] = useState(null);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('movies')
      .onSnapshot(snapshot => {
        const moviesData = [];
        snapshot.forEach(doc => {
          const movie = doc.data();
          moviesData.push({ id: doc.id, ...movie });
        });
        setMovies(moviesData);
      });

    return () => unsubscribe();
  }, []);

  const handleFocus = input => {
    setFocusedInput(input);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const addMovie = async () => {
    if (title.trim() !== '') {
      await firestore().collection('movies').doc(id).set({
        id,
        title,
        director,
        details,
        year,
        images,
        type: selectedType,
        showtimes,
        vipPrice,
        lowPrice,
        normalPrice,
        releaseDates,
      });
      clearInputs();
    }
  };

  const deleteMovie = async movieId => {
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
        year,
        images,
        type: selectedType,
        showtimes,
        vipPrice,
        lowPrice,
        normalPrice,
        releaseDates,
      });
      clearInputs();
    }
  };

  const handleEdit = movie => {
    setEditMode(true);
    setSelectedMovie(movie);
    setId(movie.id);
    setTitle(movie.title);
    setDirector(movie.director);
    setDetails(movie.details);
    setYear(movie.year);
    setImages(movie.images);
    setSelectedType(movie.type);
    setShowtimes(movie.showtimes || []);
    setVipPrice(movie.vipPrice || '');
    setLowPrice(movie.lowPrice || '');
    setNormalPrice(movie.normalPrice || '');
    setReleaseDates(movie.releaseDates || []);
  };

  const addShowtime = () => {
    setShowtimes([...showtimes, '']);
  };

  const handleChangeShowtime = (text, index) => {
    const newShowtimes = [...showtimes];
    newShowtimes[index] = text;
    setShowtimes(newShowtimes);
  };

  const clearInputs = () => {
    setId('');
    setTitle('');
    setDirector('');
    setDetails('');
    setYear('');
    setImages('');
    setEditMode(false);
    setSelectedMovie(null);
    setSelectedType('');
    setShowtimes([]);
    setVipPrice('');
    setLowPrice('');
    setNormalPrice('');
    setReleaseDates([]);
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.heading}>Quản lí phim</Text>
        <TextInput
          style={[styles.input, focusedInput === 'id' && styles.focusedInput]}
          placeholder="Nhập ID của phim"
          value={id}
          onChangeText={text => setId(text)}
          onFocus={() => handleFocus('id')}
          onBlur={handleBlur}
        />
        <TextInput
          style={[styles.input, focusedInput === 'title' && styles.focusedInput]}
          placeholder="Nhập tiêu đề phim "
          value={title}
          onChangeText={text => setTitle(text)}
          onFocus={() => handleFocus('title')}
          onBlur={handleBlur}
        />
        <TextInput
          style={[styles.input, focusedInput === 'director' && styles.focusedInput]}
          placeholder="Nhập tên đạo diễn"
          value={director}
          onChangeText={text => setDirector(text)}
          onFocus={() => handleFocus('director')}
          onBlur={handleBlur}
        />
        <TextInput
          style={[styles.input, focusedInput === 'details' && styles.focusedInput]}
          placeholder="Nhập chi tiết phim"
          value={details}
          onChangeText={text => setDetails(text)}
          onFocus={() => handleFocus('details')}
          onBlur={handleBlur}
        />
        <TextInput
          style={[styles.input, focusedInput === 'year' && styles.focusedInput]}
          placeholder="Nhập năm sản xuất phim"
          value={year}
          onChangeText={text => setYear(text)}
          onFocus={() => handleFocus('year')}
          onBlur={handleBlur}
        />
        <TextInput
          style={[styles.input, focusedInput === 'images' && styles.focusedInput]}
          placeholder="Nhập link ảnh của phim"
          value={images}
          onChangeText={text => setImages(text)}
          onFocus={() => handleFocus('images')}
          onBlur={handleBlur}
        />
        <Picker
          selectedValue={selectedType}
          onValueChange={(itemValue, itemIndex) => setSelectedType(itemValue)}
          style={[styles.input, focusedInput === 'selectedType' && styles.focusedInput]}
        >
          <Picker.Item label="Chọn danh mục phim" value="" />
          <Picker.Item label="Trending" value="Trending" />
          <Picker.Item label="Upcoming" value="Upcoming" />
          <Picker.Item label="Now Showing" value="Now Showing" />
        </Picker>
        <View style={styles.showtimesContainer}>
          {showtimes.map((time, index) => (
            <TextInput
              key={index}
              style={[styles.input, focusedInput === `showtimes-${index}` && styles.focusedInput]}
              placeholder={`Nhập giờ chiếu ${index + 1}`}
              value={time}
              onChangeText={text => handleChangeShowtime(text, index)}
              onFocus={() => handleFocus(`showtimes-${index}`)}
              onBlur={handleBlur}
            />
          ))}
        </View>
        <TextInput
          style={[styles.input, focusedInput === 'vipPrice' && styles.focusedInput]}
          placeholder="Nhập giá vé VIP"
          value={vipPrice}
          onChangeText={text => setVipPrice(text)}
          onFocus={() => handleFocus('vipPrice')}
          onBlur={handleBlur}
        />
        <TextInput
          style={[styles.input, focusedInput === 'lowPrice' && styles.focusedInput]}
          placeholder="Nhập giá vé Low"
          value={lowPrice}
          onChangeText={text => setLowPrice(text)}
          onFocus={() => handleFocus('lowPrice')}
          onBlur={handleBlur}
        />
        <TextInput
          style={[styles.input, focusedInput === 'normalPrice' && styles.focusedInput]}
          placeholder="Nhập giá vé Normal"
          value={normalPrice}
          onChangeText={text => setNormalPrice(text)}
          onFocus={() => handleFocus('normalPrice')}
          onBlur={handleBlur}
        />
        <TextInput
          style={[styles.input, focusedInput === 'releaseDates' && styles.focusedInput]}
          placeholder="Nhập ngày chiếu (phân tách bằng dấu phẩy)"
          value={releaseDates.join(', ')}
          onChangeText={text => setReleaseDates(text.split(',').map(date => date.trim()))}
          onFocus={() => handleFocus('releaseDates')}
          onBlur={handleBlur}
        />
        <Button
          title={editMode ? 'Cập nhật phim' : 'Thêm phim'}
          onPress={editMode ? updateMovie : addMovie}
        />
        <Button title="Thêm giờ chiếu" onPress={addShowtime} />
        <ScrollView style={styles.movieList}>
          {movies.map(movie => (
            <View key={movie.id} style={styles.movieItem}>
              <View style={styles.movieDetails}>
                <Image source={{ uri: movie.images }} style={styles.movieImage} />
                <Text>ID: {movie.id}</Text>
                <Text>{movie.title}</Text>
                <Text>Đạo diễn: {movie.director}</Text>
                <Text>Năm sản xuất: {movie.year}</Text>
                <Text>Danh mục phim: {movie.type}</Text>
                <Text>Giờ chiếu:</Text>
                {movie.showtimes &&
                  movie.showtimes.map((time, index) => <Text key={index}>{time}</Text>)}
                <Text>Giá vé:</Text>
                <Text>VIP: {movie.vipPrice}</Text>
                <Text>Low: {movie.lowPrice}</Text>
                <Text>Normal: {movie.normalPrice}</Text>
                <Text>Ngày chiếu:</Text>
                {movie.releaseDates &&
                  movie.releaseDates.map((date, index) => <Text key={index}>{date}</Text>)}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleEdit(movie)}
                  >
                    <Text style={styles.buttonText}>Sửa thông tin</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => deleteMovie(movie.id)}
                  >
                    <Text style={styles.buttonText}>Xóa thông tin</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </KeyboardAwareScrollView>
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
  showtimesContainer: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  focusedInput: {
    borderColor: 'blue', // Change border color when input is focused
  },
});

export default MovieManagementScreen;
