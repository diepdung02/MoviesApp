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

  // Các hàm khác giữ nguyên

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Các phần input và button giữ nguyên */}
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
    borderColor: 'blue', // Thay đổi màu viền khi input được focus
  },
});

export default MovieManagementScreen;
