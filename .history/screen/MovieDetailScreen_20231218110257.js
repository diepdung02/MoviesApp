import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const MovieDetailScreen = ({ route }) => {
  const { title, director, year, image, description } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.director}>Director: {director}</Text>
        <Text style={styles.year}>Year: {year}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  director: {
    fontSize: 18,
    marginBottom: 5,
  },
  year: {
    fontSize: 16,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default MovieDetailScreen;
