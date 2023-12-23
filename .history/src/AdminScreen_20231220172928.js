import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import auth from '@react-native-firebase/auth';

const AdminScreen = () => {
  const [movies, setMovies] = useState([]);

  // Giả sử danh sách phim ban đầu được khai báo tại đây
  const initialMovies = [
    { id: 1, title: 'Phim 1' },
    { id: 2, title: 'Phim 2' },
    { id: 3, title: 'Phim 3' },
    // Thêm các bộ phim khác tại đây
  ];

  useEffect(() => {
    // Simulate fetching movie data from an API
    setTimeout(() => {
      setMovies(initialMovies); // Đặt danh sách phim vào state
    }, 1000); // Giả sử 1 giây để lấy dữ liệu từ API
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Quản lý phim
      </Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default AdminScreen;
