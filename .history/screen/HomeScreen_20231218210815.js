import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BannerData from '../components/Banner';

const HomeScreen = ({ navigation }) => {
  const [selectedScreen, setSelectedScreen] = useState('NowShowing');
  const [banners, setBanners] = useState([]);
  const [bannerIndex, setBannerIndex] = useState(0);

  const onDataReceived = data => {
    setBanners(data);
  };

  const showScreen = (screenName) => {
    setSelectedScreen(screenName);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000); // Thời gian timeout 5 giây, bạn có thể thay đổi thời gian tại đây

    return () => clearTimeout(timeout); // Clear timeout khi component unmount
  }, [bannerIndex]); // Chạy useEffect khi bannerIndex thay đổi

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
        <BannerData onDataReceived={onDataReceived} />
        <FlatList
          horizontal
          data={banners}
          renderItem={({ item }) => (
            <View style={styles.MovieContainer}>
              <Image style={styles.MovieIMG} source={{ uri: item.images }} />
              <Text style={styles.MovieTitle}>{item.title}</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          initialScrollIndex={bannerIndex}
        />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={() => showScreen('TrendingMovies')}>
            <Text style={styles.buttonText}>Phim đang hot</Text>
          </TouchableOpacity>
          {/* Các button khác */}
        </View>
        <View style={styles.images}>
          {selectedScreen === 'TrendingMovies' && <TrendingMovies />}
          {/* Các màn hình khác */}
        </View>
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
  placeTou: {
    backgroundColor: '#33CCFF',
    width: 150,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#33CC00',
  },
  placeText: {
    color: '#fff',
    fontSize: 20,
    paddingLeft: 15,
  },
  MovieContainer: {
    margin: 10,
  },
  MovieIMG: {
    width: 150,
    height: 150,
    borderRadius: 20,
  },
  images:{
    resizeMode:'cover'
  }
});

export default HomeScreen;
