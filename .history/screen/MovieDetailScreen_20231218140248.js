import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const MovieDetailScreen = ({ onDataReceived }) => {
  
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
  
    useEffect(() => {
      const subscriber = firestore()
        .collection('movies')
        .limit(5)
        .onSnapshot(querySnapshot => {
          if (querySnapshot) {
            const movies = [];
  
            querySnapshot.docs.forEach(documentSnapshot => {
              movies.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
  
            setPlaces(movies);
            setLoading(false);
  
            // Gửi dữ liệu về Home component thông qua props
            onDataReceived(places);
            
            // Log dữ liệu sau khi cập nhật state
            console.log(places);
          } else {
            console.log('Không có dữ liệu');
          }
        });
  
      return () => subscriber();
    }, []);
 

  return (
    <View style={styles.container}>
    <View
            
            data={movies}
            renderItem={({item}) => (
              <View style={styles.PlaceContainer}>
                <Image style={styles.PlaceIMG} source={{uri: item.images}} />
                <Text style={styles.PlaceTitle}>{item.title}</Text>
                <Text style={styles.PlacePrice}>{item.year}</Text>
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