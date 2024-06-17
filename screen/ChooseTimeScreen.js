import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';  // Đảm bảo cài đặt moment.js

const ChooseTimeScreen = ({ navigation, route }) => {
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [cinemas] = useState(['CGV Bình Dương Square', 'CGV Aeon Canary']);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [showtimesForCinema, setShowtimesForCinema] = useState([]);
  const [datesForCinema, setDatesForCinema] = useState([]);
  const { movieId, movieTitle, movieIMG } = route.params;

  useEffect(() => {
    const fetchShowtimesAndDates = async () => {
      if (!selectedCinema) return;

      try {
        const movieData = await firestore().collection('movies').doc(movieId).get();
        const { showtimes, releaseDates } = movieData.data() || {};

        const filteredDates = (releaseDates || []).filter(date =>
          moment(date, 'YYYY-MM-DD').isSameOrAfter(moment(), 'day')
        );

        setShowtimesForCinema(showtimes || []);
        setDatesForCinema(filteredDates);
      } catch (error) {
        console.error('Lỗi khi lấy showtimes và dates: ', error);
      }
    };

    fetchShowtimesAndDates();
  }, [movieId, selectedCinema]);

  const handleSelectCinema = cinema => {
    if (selectedCinema === cinema) {
      setSelectedCinema(null);
      setShowtimesForCinema([]);
      setDatesForCinema([]);
    } else {
      setSelectedCinema(cinema);
    }
  };

  const filterPastShowtimes = (showtimes, date) => {
    const currentDateTime = moment();
    return showtimes.filter(showtime => {
      const showtimeDateTime = moment(`${date} ${showtime}`, 'YYYY-MM-DD HH:mm');
      return showtimeDateTime.isAfter(currentDateTime);
    });
  };

  const navigateToMovieDetail = (showtime) => {
    navigation.navigate('BookingScreen', {
      movieId,
      movieTitle,
      movieIMG,
      selectedShowtime: showtime,
      selectedDate: selectedDate,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.movieHeader}>
        <Image source={{ uri: movieIMG }} style={styles.movieImage} />
        <Text style={styles.movieTitle}>{movieTitle}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {cinemas.map(cinema => (
          <View key={cinema} style={styles.cinemaContainer}>
            <TouchableOpacity
              style={styles.cinemaButton}
              onPress={() => handleSelectCinema(cinema)}>
              <Text style={styles.buttonText}>{cinema}</Text>
            </TouchableOpacity>
            {selectedCinema === cinema && (
              <>
                <ScrollView
                  contentContainerStyle={styles.scrollDates}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {datesForCinema.map(date => (
                    <TouchableOpacity
                      key={date}
                      style={[
                        styles.button,
                        selectedDate === date && styles.selectedButton,
                      ]}
                      onPress={() => setSelectedDate(date)}>
                      <Text style={styles.buttonText}>{moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY')}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                {selectedDate && (
                  <ScrollView
                    contentContainerStyle={styles.scrollShowtimes}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {filterPastShowtimes(showtimesForCinema, selectedDate).map(showtime => (
                      <TouchableOpacity
                        key={showtime}
                        style={[
                          styles.button,
                          selectedShowtime === showtime && styles.selectedButton,
                        ]}
                        onPress={() => {
                          setSelectedShowtime(showtime);
                          navigateToMovieDetail(showtime);
                        }}>
                        <Text style={styles.buttonText}>{showtime}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                )}
              </>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  movieHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  movieImage: {
    width: 200,
    height: 200,
    marginTop: 70,
    resizeMode: 'cover',
  },
  button: {
    backgroundColor: '#F5F5DC',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    elevation: 4,
  },
  selectedButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  cinemaButton: {
    backgroundColor: 'lightgray',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    elevation: 4,
  },
  scrollShowtimes: {
    flexDirection: 'row',
    height: 70,
  },
  scrollDates: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});

export default ChooseTimeScreen;
