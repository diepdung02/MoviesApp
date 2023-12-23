import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import { Auth } from '../components';
import TrendingMovies from '../components/TrendingMovies';
import Icon from 'react-native-vector-icons/Ionicons';


  const handleSearchPress = () => {
    // Xử lý sự kiện khi nhấn vào icon search
    console.log('Search icon pressed');
  };

  const handleMenuPress = () => {
    // Xử lý sự kiện khi nhấn vào icon menu
    console.log('Menu icon pressed');
  };


const android = Platform.OS === 'android';
const HomeScreen = () => {
 

  return (
    <ScrollView style={styles.container}>
       <View style={styles.container}>
       <View style={styles.header}>
      <TouchableOpacity onPress={handleSearchPress}>
        <Icon name="av" size={24} color="black" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleMenuPress}>
        <Icon name="menu" size={24} color="black" style={styles.icon} />
      </TouchableOpacity>
    </View>
      <TrendingMovies />
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
});

export default HomeScreen;
