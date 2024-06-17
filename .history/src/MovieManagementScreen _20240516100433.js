const selectImage = () => {
  if (!title.trim()) {
    alert('Vui lòng nhập tên phim trước khi chọn ảnh');
    return;
  }

  launchImageLibrary({ mediaType: 'photo' }, response => {
    if (response.assets && response.assets.length > 0) {
      const source = response.assets[0].uri;
      uploadImage(source, title);
    }
  });
};
=> setYear(text)}
          onFocus={() => handleFocus('year')}
          onBlur={handleBlur}
        />
        <TextInput
          style={[styles.input, focusedInput === 'images' && styles.focusedInput]}
          placeholder="Link hình ảnh"
          value={images}
          onChangeText={text => setImages(text)}
          onFocus={() => handleFocus('images')}
          onBlur={handleBlur}
        />
        <Picker
          selectedValue={selectedType}
          onValueChange={(itemValue, itemIndex) => setSelectedType(itemValue)}
          style={[styles.input, focusedInput === 'selectedType' && styles.focusedInput]}
        >
          <Picker.Item label="Chọn danh mục phim" value="" />
          <Picker.Item label="Trending" value="Trending" />
          <Picker.Item label="Upcoming" value="Upcoming" />
          <Picker.Item label="Now Showing" value="Now Showing" />
        </Picker>
        <View style={styles.showtimesContainer}>
          {showtimes.map((time, index) => (
            <TextInput
              key={index}
              style={[styles.input, focusedInput === `showtimes-${index}` && styles.focusedInput]}
              placeholder={`Nhập giờ chiếu ${index + 1}`}
              value={time}
              onChangeText={text => handleChangeShowtime(text, index)}
              onFocus={() => handleFocus(`showtimes-${index}`)}
              onBlur={handleBlur}
            />
          ))}
        </View>
        <TextInput
          style={[styles.input, focusedInput === 'vipPrice' && styles.focusedInput]}
          placeholder="Giá vé VIP"
          value={vipPrice}
          onChangeText={text => setVipPrice(text)}
          onFocus={() => handleFocus('vipPrice')}
          onBlur={handleBlur}
        />
        <TextInput
          style={[styles.input, focusedInput === 'lowPrice' && styles.focusedInput]}
          placeholder="Giá vé thường"
          value={lowPrice}
          onChangeText={text => setLowPrice(text)}
          onFocus={() => handleFocus('lowPrice')}
          onBlur={handleBlur}
        />
        <TextInput
          style={[styles.input, focusedInput === 'normalPrice' && styles.focusedInput]}
          placeholder="Giá vé thấp nhất"
          value={normalPrice}
          onChangeText={text => setNormalPrice(text)}
          onFocus={() => handleFocus('normalPrice')}
          onBlur={handleBlur}
        />
        <TextInput
          style={[styles.input, focusedInput === 'releaseDates' && styles.focusedInput]}
          placeholder="Ngày chiếu (phân tách bằng dấu phẩy)"
          value={releaseDates.join(', ')}
          onChangeText={text => setReleaseDates(text.split(',').map(date => date.trim()))}
          onFocus={() => handleFocus('releaseDates')}
          onBlur={handleBlur}
        />
        <Button
          title={editMode ? 'Cập nhật phim' : 'Thêm phim'}
          onPress={editMode ? updateMovie : addMovie}
        />
        <Button title="Thêm giờ chiếu" onPress={addShowtime} />
        <Button title="Chọn ảnh" onPress={selectImage} />
        <ScrollView style={styles.movieList}>
          {movies.map(movie => (
            <View key={movie.id} style={styles.movieItem}>
              <View style={styles.movieDetails}>
                <Image source={{ uri: movie.images }} style={styles.movieImage} />
                <Text>ID: {movie.id}</Text>
                <Text>{movie.title}</Text>
                <Text>Đạo diễn: {movie.director}</Text>
                <Text>Năm sản xuất: {movie.year}</Text>
                <Text>Danh mục phim: {movie.type}</Text>
                <Text>Giờ chiếu:</Text>
                {movie.showtimes &&
                  movie.showtimes.map((time, index) => <Text key={index}>{time}</Text>)}
                <Text>Giá vé:</Text>
                <Text>VIP: {movie.vipPrice}</Text>
                <Text>Low: {movie.lowPrice}</Text>
                <Text>Normal: {movie.normalPrice}</Text>
                <Text>Ngày chiếu:</Text>
                {movie.releaseDates &&
                  movie.releaseDates.map((date, index) => <Text key={index}>{date}</Text>)}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleEdit(movie)}
                  >
                    <Text style={styles.buttonText}>Sửa thông tin</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => deleteMovie(movie.id)}
                  >
                    <Text style={styles.buttonText}>Xóa thông tin</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  movieItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  movieDetails: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
  },
  movieImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 8,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  movieList: {
    flex: 1,
  },
  showtimesContainer: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  focusedInput: {
    borderColor: 'blue', // Thay đổi màu viền khi input được focus
  },
});

export default MovieManagementScreen;
