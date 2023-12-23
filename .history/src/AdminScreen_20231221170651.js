import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity,  StyleSheet,} from 'react-native';
import auth from '@react-native-firebase/auth';
import { Auth } from '../components';
import firestore from '@react-native-firebase/firestore';
import AddMovies from '../components/Firestore';
import { NavigationContainer } from '@react-navigation/native';
import { ViewPropTypes } from 'react-native';
const AdminScreen = () => {
  const [movies, setMovies] = useState([]);
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const fetchFullName = async () => {
      const currentUser = auth().currentUser;
      if (currentUser) {
        const userDoc = await firestore().collection('users').doc(currentUser.uid).get();
        if (userDoc.exists) {
          const { fullName } = userDoc.data();
          setFullName(fullName);
        }
      }
    };

    fetchFullName();
  }, []);

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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Sử dụng component thêm dữ liệu */}
      <AddMovies />
      <N
    </View>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>{item.title}</Text>
          </View>
        )}
      />
        <TouchableOpacity style={styles.logout} onPress={() => Auth.signOut()}>
        <Text style={styles.logoutText}>Đăng Xuất</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
     container: {
       flex: 1,
       backgroundColor: '#fff',
       padding: 20,
     },
     accountWelcome: {
       flexDirection: 'row',
       alignItems: 'center',
       marginBottom: 20,
     },
     avatar: {
       width: 40,
       height: 40,
       borderRadius: 20,
       marginRight: 10,
     },
     welcomeText: {
       fontSize: 18,
     },
     accountItem: {
       paddingVertical: 15,
       borderBottomWidth: 1,
       borderBottomColor: '#ccc',
     },
     itemText: {
       fontSize: 16,
     },
     logout: {
       position: 'absolute',
       bottom: 20,
       left: 20,
       right: 20,
       backgroundColor: '#ff6347',
       paddingVertical: 15,
       borderRadius: 8,
       alignItems: 'center',
     },
     logoutText: {
       color: '#fff',
       fontSize: 18,
     },
   });
   

export default AdminScreen;
