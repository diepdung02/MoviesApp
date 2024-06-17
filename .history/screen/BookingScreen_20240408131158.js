import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Picker} from '@react-native-picker/picker';

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
  const [showtimes, setShowtimes] = useState([]);
  const [vipPrice, setVipPrice] = useState('');
  const [lowPrice, setLowPrice] = useState('');
  const [normalPrice, setNormalPrice] = useState('');

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('movies')
      .onSnapshot(snapshot => {
        const moviesData = [];
        snapshot.forEach(doc => {
          const movie = doc.data();
          moviesData.push({id: doc.id, ...movie});
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
        showtimes,
        vipPrice,
        lowPrice,
        normalPrice,
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
        Year,
        images,
        type: selectedType,
        showtimes,
        vipPrice,
        lowPrice,
        normalPrice,
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
    setYear(movie.Year);
    setImages(movie.images);
    setSelectedType(movie.type);
    setShowtimes(movie.showtimes || []);
    setVipPrice(movie.vipPrice || '');
    setLowPrice(movie.lowPrice || '');
    setNormalPrice(movie.normalPrice || '');
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
  };

  const getPrice = type => {
    switch (type) {
      case 'VIP':
        return vipPrice ? parseInt(vipPrice) : 0;
      case 'Low':
        return lowPrice ? parseInt(lowPrice) : 0;
      default:
        return normalPrice ? parseInt(normalPrice) : 0;
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.movieItem}>
      <View style={styles.movieDetails}>
        <Image source={{uri: item.images}} style={styles.movieImage} />
        <Text>ID: {item.id}</Text>
        <Text>{item.title}</Text>
        <Text>Đạo diễn: {item.director}</Text>
        <Text>Năm sản xuất: {item.Year}</Text>
        <Text>Danh mục phim: {item.type}</Text>
        <Text>Giờ chiếu:</Text>
        {item.showtimes &&
          item.showtimes.map((time, index) => <Text key={index}>{time}</Text>)}
        <Text>Giá vé:</Text>
        <Text>VIP: {getPrice('VIP')}</Text>
        <Text>Low: {getPrice('Low')}</Text>
        <Text>Normal: {getPrice('Normal')}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleEdit(item)}>
            <Text style={styles.buttonText}>Sửa thông tin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => deleteMovie(item.id)}>
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
        onChangeText={text => setId(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập tiêu đề phim "
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập tên đạo diễn"
        value={director}
        onChangeText={text => setDirector(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập chi tiết phim"
        value={details}
        onChangeText={text => setDetails(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập năm sản xuất phim"
        value={Year}
        onChangeText={text => setYear(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập link ảnh của phim"
        value={images}
        onChangeText={text => setImages(text)}
      />
      <Picker
        selectedValue={selectedType}
        onValueChange={(itemValue, itemIndex) => setSelectedType(itemValue)}
        style={styles.input}>
        <Picker.Item label="Chọn danh mục phim" value="" />
        <Picker.Item label="Trending" value="Trending" />
        <Picker.Item label="Upcoming" value="Upcoming" />
        <Picker.Item label="Now Showing" value="Now Showing" />
      </Picker>
      <View style={styles.showtimesContainer}>
        {showtimes.map((time, index) => (
          <TextInput
            key={index}
            style={styles.input}
            placeholder={`Nhập giờ chiếu ${index + 1}`}
            value={time}
            onChangeText={text => handleChangeShowtime(text, index)}
          />
        ))}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Nhập giá vé VIP"
        value={vipPrice}
        onChangeText={text => setVipPrice(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập giá vé Low"
        value={lowPrice}
        onChangeText={text => setLowPrice(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập giá vé Normal"
        value={normalPrice}
        onChangeText={text => setNormalPrice(text)}
      />
      <Button
        title={editMode ? 'Cập nhật phim' : 'Thêm phim'}
        onPress={editMode ? updateMovie : addMovie}
      />
      <Button title="Thêm giờ chiếu" onPress={addShowtime} />
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
  showtimesContainer: {
    marginBottom: 10,
  },
});

export default MovieManagementScreen;
