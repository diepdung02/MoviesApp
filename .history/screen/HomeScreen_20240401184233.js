const HomeScreen = ({ navigation }) => {
  const [selectedScreen, setSelectedScreen] = useState('NowShowing');
  const [movies, setMovies] = useState([]);
  const [banners, setBanners] = useState([]);    
  const { width, height } = Dimensions.get('window'); 
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const onDataReceived = data => {
    setBanners(data);
  };
  const [selectedButton, setSelectedButton] = useState('TrendingMovies'); // Tạo state cho nút được chọn

  useEffect(() => {
    const autoplayInterval = setInterval(() => {
      if (carouselRef.current && activeIndex < banners.length - 1) {
        carouselRef.current.snapToNext();
      } else {
        clearInterval(autoplayInterval);
        // After the last slide, move to the first slide
        carouselRef.current.snapToItem(0);
        setActiveIndex(0);
      }
    }, 3000); // 3000 milliseconds, change this value as needed

    return () => clearInterval(autoplayInterval);
  }, [activeIndex, banners.length]);

  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('MovieDetail', { item })}>
      <Image
        source={{ uri: item.images }}
        style={{
          width: 250,
          height: 150,
          borderRadius: 20,
          margin: 5,
          resizeMode: 'cover'
        }}
      />
    </TouchableWithoutFeedback>
  );

  const showScreen = (screenName) => {
    setSelectedScreen(screenName);
    setSelectedButton(screenName); // Cập nhật nút được chọn
  };

  return (
    <ScrollView style={styles.ScrollViewcontainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Account')}>
            <Icon name="person" size={24} color="black" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Account')}>
            <Icon name="menu" size={24} color="black" style={styles.icon} />
          </TouchableOpacity>
        </View>
       <BannerData onDataReceived={onDataReceived} />
       <View>
       <Carousel
        ref={carouselRef}
        data={banners}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width * 0.62}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
      <Pagination
        dotsLength={banners.length}
        activeDotIndex={activeIndex}
        containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)',
        paddingHorizontal: 10, 
        paddingVertical: 5, 
  }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
      
    </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, selectedButton === 'TrendingMovies' && styles.selectedButton]} // Sử dụng điều kiện để cung cấp màu khác nhau cho nút được chọn
            onPress={() => showScreen('TrendingMovies')}>
            <Text style={styles.buttonText}>Phim đang hot</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, selectedButton === 'NowShowing' && styles.selectedButton]}
            onPress={() => showScreen('NowShowing')}>
            <Text style={styles.buttonText}>Đang Chiếu</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, selectedButton === 'Upcoming' && styles.selectedButton]}
            onPress={() => showScreen('Upcoming')}>
            <Text style={styles.buttonText}>Sắp chiếu</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.images}>
          {selectedScreen === 'TrendingMovies' && <TrendingMovies />}
          {selectedScreen === 'NowShowing' && <NowShowingScreen />}
          {selectedScreen === 'Upcoming' && <UpcomingScreen />}
        </View>
      </View>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  ScrollViewcontainer: {
    flex: 1,
    backgroundColor: 'rgb(150, 20, 87)',
  },
  container: {
    flex: 1,
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
  icon: {
    marginHorizontal: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'lightblue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: 'orange', // Màu cho nút được chọn
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default HomeScreen;
