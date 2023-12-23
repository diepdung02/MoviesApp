import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { styles } from '../theme';

const ios = Platform.OS === 'ios';

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
      {/* Search bar */}
      <SafeAreaView style={ios ? { marginBottom: -2 } : { marginBottom: 3 }}>
        <StatusBar style="light" />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16 }}>
          <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white" />
          <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Render static movie data */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
        {/* Trending Movies Carousel */}
        <TrendingMovies data={trending} />

        {/* Upcoming movies row */}
        <MovieList title="Upcoming" data={upcoming} />

        {/* Top rated movies row */}
        <MovieList title="Top Rated" data={topRated} />
      </ScrollView>
    </View>
  );
}
