import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { getMoviesFromAPI } from './api'; // Hàm lấy danh sách phim từ API

const AdminScreen = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Lấy danh sách phim từ API khi màn hình được tải
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      const moviesData = await getMoviesFromAPI(); // Gọi API để lấy danh sách phim
      setMovies(moviesData); // Cập nhật danh sách phim
      setLoading(false); // Đã tải xong
    } catch (error) {
      console.error('Lỗi khi lấy danh sách phim:', error);
    }
  };

  return (
    <Container>
      <Title>Trang Admin - Quản lý phim</Title>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieItem>
              <MovieTitle>{item.title}</MovieTitle>
              <MovieDetails>
                <Text>Đạo diễn: {item.director}</Text>
                <Text>Thể loại: {item.genre}</Text>
                {/* Các thông tin khác về bộ phim */}
              </MovieDetails>
            </MovieItem>
          )}
        />
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const MovieItem = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  padding: 10px;
`;

const MovieTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const MovieDetails = styled.View`
  margin-top: 10px;
`;

export default AdminScreen;
