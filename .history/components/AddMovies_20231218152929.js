// File: MovieData.js
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

const MovieData = ({ onDataReceived }) => {
  useEffect(() => {
    const fetchMoviesData = async (moviesData) => {
      try {
        const moviesCollection = firestore().collection('movies');
        const querySnapshot = await moviesCollection.limit(5).get();
        const movies = [];

        querySnapshot.forEach(documentSnapshot => {
          movies.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        });

        onDataReceived(movies);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu phim:', error);
        onDataReceived([]);
      }
    };

    fetchMoviesData();
  }, [onDataReceived]);

  return null;
};

export default MovieData;
