import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  // Hardcoded movie data for demonstration
  const trending = [
    { id: 1, title: 'Movie 1', /* ... */ },
    { id: 2, title: 'Movie 2', /* ... */ },
    // ... More trending movies
  ];

  const upcoming = [
    { id: 1, title: 'Upcoming Movie 1', /* ... */ },
    { id: 2, title: 'Upcoming Movie 2', /* ... */ },
    // ... More upcoming movies
  ];

  const topRated = [
    { id: 1, title: 'Top Rated Movie 1', /* ... */ },
    { id: 2, title: 'Top Rated Movie 2', /* ... */ },
    // ... More top rated movies
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#222' }}>
      {/* Render static movie data */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
        {/* Trending Movies Carousel */}
        {/* { trending.length > 0 && <TrendingMovies data={trending} /> } */}

        {/* Upcoming movies row */}
        {/* { upcoming.length > 0 && <MovieList title="Upcoming" data={upcoming} /> } */}

        {/* Top rated movies row */}
        {/* { topRated.length > 0 && <MovieList title="Top Rated" data={topRated} /> } */}
      </ScrollView>
    </View>
  );
}
