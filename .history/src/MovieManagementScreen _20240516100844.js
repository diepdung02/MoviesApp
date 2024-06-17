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
import storage from '@react-native-firebase/storage';
import { Picker } from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-picker';

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
      // Kiểm tra xem người dùng đã chọn ảnh chưa
      if (images === '') {
        alert('Vui lòng chọn ảnh cho phim!');
        return;
      }

      const imageUrl = await uploadImage(images, title);
      
      await firestore().collection('movies').doc(id).set({
        id,
        title,
        director,
        details,
        year,
        images: imageUrl,
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

  const uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = storage().ref().child(`movie_images/${imageName}`);
    await ref.put(blob);
    return ref.getDownloadURL();
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

  const selectImage = () => {
    ImagePicker.showImagePicker({}, response => {
      if (response.uri) {
        setImages(response.uri);
      }
    });
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.heading}>Quản lý phim</Text>
        {/* Các input cho thông tin phim */}
        <TextInput
          style={[styles.input, focusedInput === 'images' && styles.focusedInput]}
          placeholder="Chọn ảnh"
          value={images}
          onFocus={() => handleFocus('images')}
          onBlur={handleBlur}
        />
        <Button title="Chọn ảnh" onPress={selectImage} />
        {/* Button thêm/sửa phim */}
        <Button
          title={editMode ? 'Cập nhật phim' : 'Thêm phim'}
          onPress={editMode ? updateMovie : addMovie}
        />
        {/* Button thêm giờ chiếu */}
        <Button title="Thêm giờ chiếu" onPress={addShowtime} />
        {/* Danh sách phim */}
        <ScrollView style={styles.movieList}>
          {movies.map(movie => (
            <View key={movie.id} style={styles.movieItem}>
              <View style={styles.movieDetails}>
                <Image source={{ uri: movie.images }} style={styles.movieImage} />
                {/* Thông tin chi tiết phim */}
                <TouchableOpacity onPress={() => handleEdit(movie)}>
                  <Text style={styles.title}>{movie.title}</Text>
                  <Text>{`Đạo diễn: ${movie.director}`}</Text>
                  <Text>{`Năm sản xuất: ${movie.year}`}</Text>
                </TouchableOpacity>
                <View style={styles.buttonContainer}>
                  {/* Button sửa phim */}
                  <TouchableOpacity style={styles.button} onPress={() => handleEdit(movie)}>
                    <Text style={styles.buttonText}>Sửa thông tin</Text>
                  </TouchableOpacity>
                  {/* Button xóa phim */}
                  <TouchableOpacity style={styles.button} onPress={() => deleteMovie(movie.id)}>
                    <Text style={styles.buttonText}>Xóa phim</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
