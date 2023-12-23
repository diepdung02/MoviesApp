// import React, { useState, useEffect } from 'react';
// import firestore from '@react-native-firebase/firestore';

// const PlaceData = ({ onDataReceived }) => {
//   const [loading, setLoading] = useState(true);
//   const [places, setPlaces] = useState([]);

//   useEffect(() => {
//     const subscriber = firestore()
//       .collection('Place')
//       .limit(5)
//       .onSnapshot(querySnapshot => {
//         if (querySnapshot) {
//           const places = [];

//           querySnapshot.docs.forEach(documentSnapshot => {
//             places.push({
//               ...documentSnapshot.data(),
//               key: documentSnapshot.id,
//             });
//           });

//           setPlaces(places);
//           setLoading(false);

//           // Gửi dữ liệu về Home component thông qua props
//           onDataReceived(places);
          
//           // Log dữ liệu sau khi cập nhật state
//           console.log(places);
//         } else {
//           console.log('Không có dữ liệu');
//         }
//       });

//     return () => subscriber();
//   }, []);

//   return null;
// };

// const Foreign  = ({ onDataReceived }) => {
//      const [foreigns, setForeigns] = useState([]);     
//      const [loading, setLoading] = useState(true);
   
//      useEffect(() => {
//        const subscriber = firestore()
//          .collection('foreign locations')
//          .limit(5)
//          .onSnapshot(querySnapshot => {
//            if (querySnapshot) {
//              const foreigns = [];
   
//              querySnapshot.docs.forEach(documentSnapshot => {
//                foreigns.push({
//                  ...documentSnapshot.data(),
//                  key: documentSnapshot.id,
//                });
//              });
   
//              setForeigns(foreigns);
//              setLoading(false);
   
//              // Gửi dữ liệu về Home component thông qua props
//              onDataReceived(foreigns);
             
//              // Log dữ liệu sau khi cập nhật state
//              console.log(foreigns);
//            } else {
//              console.log('Không có dữ liệu');
//            }
//          });
   
//        return () => subscriber();
//      }, []);
   
//      return null;
//    };

// export  {PlaceData, Foreign};
import firestore from '@react-native-firebase/firestore';

// Thêm dữ liệu vào Firestore
const AddDataComponent = () => {
const addMovie = async (movieData) => {
  try {
    const moviesRef = firestore().collection('movies');

    await moviesRef.add(movieData);
    console.log('Đã thêm dữ liệu phim thành công.');
  } catch (error) {
    console.error('Lỗi khi thêm dữ liệu phim:', error);
  }
};

// Dữ liệu mới của một bộ phim
const newMovie = {
  title: 'Lật mặt 7',
  director: 'Đạo diễn Lí Hải',
  year: 2023,
  ImageURL:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfopYSrzvPy_qBZsNYYKVsPpQF4YqNRS_vLQ&usqp=CAU',
  // Thêm các trường dữ liệu khác tại đây
};

// Thêm dữ liệu phim mới
addMovie(newMovie);
}
