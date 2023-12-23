import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Auth } from '../components';

const HomeScreen = () => {
  const nowShowingMovies = [
    { id: 1, title: 'Movie 1', image: require('../assets/ảnh/Bangkok.jpg') },
    { id: 2, title: 'Movie 2', image: require('../assets/ảnh/BT.jpg') },
    // Add more movies
  ];

  const upcomingMovies = [
    { id: 1, title: 'Upcoming Movie 1', image: require('../assets/ảnh/DL.jpg') },
    { id: 2, title: 'Upcoming Movie 2', image: require('../assets/ảnh/Italia.jpg') },
    // Add more upcoming movies
  ];

  return (
    <ScrollView style={styles.container}>
       <TouchableOpacity style={styles.logout} onPress={() => Auth.signOut()}>
        <Text style={styles.logoutText}>Đăng Xuất</Text>
      </TouchableOpacity>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>CGV Cinema</Text>
        

      {/* Upcoming Movies */}
     
      

      {/* Add more sections for offers, news, etc. */}

    </ScrollView>
  
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
});

export default HomeScreen;
