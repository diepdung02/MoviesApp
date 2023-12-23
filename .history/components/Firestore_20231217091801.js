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



import React from 'react';
import { Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const AddMovies = () => {
  const handleAddData = async () => {
    try {
      const moviesRef = firestore().collection('movies');
      await moviesRef.add({
          title: 'Lật mặt 7',
          director: 'Đạo diễn Lí Hải',
          year: 2023,
          images:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfopYSrzvPy_qBZsNYYKVsPpQF4YqNRS_vLQ&usqp=CAU',
          details
        // Thêm các trường dữ liệu khác tại đây
      });
      console.log('Đã thêm dữ liệu phim vào Firestore.');
    } catch (error) {
      console.error('Lỗi khi thêm dữ liệu phim:', error);
    }
  };

  return <Button title="Thêm Dữ Liệu Phim" onPress={handleAddData} />;
};

export default AddMovies;
