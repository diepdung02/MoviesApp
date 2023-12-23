import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import { Auth } from '../components';
import TrendingMovies from '../components/TrendingMovies';
import Icon from 'react-native-vector-icons/Ionicons';
import NowShowingScreen from '../components/NowShowingScreen';
import UpcomingScreen from '../components/UpcomingScreen';
import  { useState, useEffect } from 'react';


const HomeScreen = ({navigation}) => {
  const [selectedScreen, setSelectedScreen] = useState('NowShowing'); // Di chuyển useState vào đây

  const showScreen = (screenName) => {
    setSelectedScreen(screenName);
  };

  const handleSearchPress = () => {
    console.log('Search icon pressed');
  };

  const handleMenuPress = () => {
    console.log('Menu icon pressed');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Account')}>
            <Icon name="person" size={24} color="black" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Account', { user })}>
            <Icon name="menu" size={24} color="black" style={styles.icon} />
          </TouchableOpacity>
        </View>

        
        <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => showScreen('TrendingMovies')}>
          <Text style={styles.buttonText}>Phim đang hot</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => setSelectedScreen('NowShowing')}>
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  movieContainer: {
    marginRight: 16,
  },
  movieImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
  movieTitle: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
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
