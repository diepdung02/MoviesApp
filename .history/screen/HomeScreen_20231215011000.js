import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Auth } from '../components';
import TrendingMovies from '../components/TrendingMovies';

const HomeScreen = () => {
 

  return (
    <ScrollView style={styles.container}>
       <View style={styles.container}>
       <SafeAreaView style={styles.container}>
  <StatusBar style="light" />
  <View style={styles.row}>
    {/* Sửa đổi phần style và text */}
    <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white" />
    <Text style={styles.textTitle}>
      <Text style={styles.text}>M</Text>ovies
    </Text>
    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
      <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
    </TouchableOpacity>
  </View>
</SafeAreaView>
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
});

export default HomeScreen;
