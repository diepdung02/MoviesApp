import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import TrendingMovies from '../components/TrendingMovies';
import NowShowingScreen from './NowShowingScreen';
import UpcomingScreen from './UpcomingScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {fetchMoviesData} from '../components/Firestore';
import MovieData from '../components/AddMovies';

const HomeScreen = ({navigation}) => {
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

  const showScreen = screenName => {
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

        <Stack.Navigator initialRouteName="NowShowing">
      <Stack.Screen
        name="TrendingMovies"
        component={TrendingMovies}
        options={{
          title: 'Phim đang hot',
        }}
      />
      <Stack.Screen
        name="NowShowing"
        component={NowShowingScreen}
        options={{
          title: 'Đang Chiếu',
        }}
      />
      <Stack.Screen
        name="Upcoming"
        component={UpcomingScreen}
        options={{
          title: 'Sắp chiếu',
        }}
      />
    </Stack.Navigator>

        
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
