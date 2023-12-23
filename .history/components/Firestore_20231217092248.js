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
          details:"Lật Mặt là một bộ phim hành động Việt Nam do đạo diễn Lý Hải thực hiện và được công chiếu vào năm 2015. Phim xoay quanh câu chuyện về một nhóm cảnh sát đặc nhiệm được giao nhiệm vụ bí mật để điều tra một tổ chức tội phạm đa quốc gia. Họ phải xâm nhập vào tổ chức này thông qua việc tham gia vào cuộc thi võ thuật được tổ chức bởi tổ chức tội phạm này."
          Trong quá trình điều tra, các nhân vật chính phải đối mặt với những thử thách nguy hiểm, đồng thời phải đối phó với những mưu mô, âm mưu của tổ chức tội phạm. Phim mang đến cho khán giả những pha hành động gay cấn, đấu võ đỉnh cao và những tình huống căng thẳng.
          Ngoài ra, "Lật Mặt" cũng có sự tham gia của các diễn viên nổi tiếng như Lý Hải, Hồng Ánh, Huỳnh Đông, Kim Hương, Thái Hoà... Được đánh giá là một trong những bộ phim hành động nổi bật của điện ảnh Việt Nam vào thời điểm ra mắt, "Lật Mặt" đã thu hút được sự chú ý và có được sự ủng hộ từ phần lớn khán giả.",
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
