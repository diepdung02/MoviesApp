import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const MovieDetailScreen = ({ route }) => {
  const [movie, setMovie] = useState(null);
  const { id } = route.params;

  useEffect(() => {
    const unsubscribe = firestore().collection('movies')
      .doc(id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setMovie(doc.data());
        } else {
          console.log('No such document!');
        }
      });

    return () => unsubscribe();
  }, [id]);

 

  return (
    <View style={styles.container}>
    <FlatList
            horizontal
            data={mo}
            renderItem={({item}) => (
              <View style={styles.PlaceContainer}>
                <Image style={styles.PlaceIMG} source={{uri: item.ImageURL}} />
                <Text style={styles.PlaceTitle}>{item.Title}</Text>
                <Text style={styles.PlacePrice}>{item.Price}</Text>
              </View>
            )}
            showsHorizontalScrollIndicator={false}
            />
    </View>
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
