import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, FlatList, Dimensions} from 'react-native';
import TrendingMovies from './TrendingMovies';
import NowShowingScreen from './NowShowingScreen';
import UpcomingScreen from './UpcomingScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchMoviesData } from '../components/Firestore';
import MovieData from '../components/AddMovies';
import BannerData from '../components/Banner';
import Carousel from 'react-native-snap-carousel';



const HomeScreen = ({ navigation }) => {
  const [selectedScreen, setSelectedScreen] = useState('NowShowing');
  const [movies, setMovies] = useState([]);
  const [banners, setBanners] = useState([]);    
  const { width } = Dimensions.get('window'); 
  const onDataReceived = data => {
    setBanners(data);
  };

  

  const showScreen = (screenName) => {
    setSelectedScreen(screenName);
  };

  return (
    <ScrollView style={styles.ScrollViewcontainer}>
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
       <View>
      
       <Carousel
  autoplay
  autoplayTimeout={3000}
  loop
  index={0}
  pageSize={width}
  // Các props khác của Carousel
  // ...
>
  {banners.length > 0 ? (
    banners.map((banner, index) => (
      <View style={styles.slide} key={index}>
        <Image source={{ uri: banner.images }} style={styles.image} />
        {/* Các phần tử khác trong slide */}
      </View>
    ))
  ) : (
    <Text>No banners available</Text>
  )}
</Carousel>

      
    </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={() => showScreen('TrendingMovies')}>
            <Text style={styles.buttonText}>Phim đang hot</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => showScreen('NowShowing')}>
            <Text style={styles.buttonText}>Đang Chiếu</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => showScreen('Upcoming')}>
            <Text style={styles.buttonText}>Sắp chiếu</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.images}>
          {selectedScreen === 'TrendingMovies' && <TrendingMovies />}
          {selectedScreen === 'NowShowing' && <NowShowingScreen />}
          {selectedScreen === 'Upcoming' && <UpcomingScreen />}
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={()=> navigation.navigate('BookingScreen')}>
          <Text>Đặt vé</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  ScrollViewcontainer: {
    flex: 1,
    backgroundColor: 'rgb(150, 20, 87)',
  },
  container: {
    flex: 1,
   
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

  MovieContainer: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  MovieIMG: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 150,
    borderRadius: 20,
  },
  images:{
    resizeMode:'cover'
  }
});

export default HomeScreen;
