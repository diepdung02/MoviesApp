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



// import React from 'react';
// import { Button } from 'react-native';
// import firestore from '@react-native-firebase/firestore';

// const AddMovies = () => {
//   const handleAddData = async () => {
//     try {
//       const moviesRef = firestore().collection('banners');
//       await moviesRef.add({
//           id:'7',
//           title: 'THANH GƯƠM TRỪ TÀ',
//           director: 'Đạo diễn Kim Seong-sik',
//           year: 2023,
//           images:'https://i.mpcdn.top/c/dA6LAx9/thanh-guom-tru-ta.jpg?1701443857',
//           details:'Lật Mặt là một bộ phim hành động Việt Nam do đạo diễn Lý Hải thực hiện và được công chiếu vào năm 2015. Phim xoay quanh câu chuyện về một nhóm cảnh sát đặc nhiệm được giao nhiệm vụ bí mật để điều tra một tổ chức tội phạm đa quốc gia. Họ phải xâm nhập vào tổ chức này thông qua việc tham gia vào cuộc thi võ thuật được tổ chức bởi tổ chức tội phạm này.'+
//           'Trong quá trình điều tra các nhân vật chính phải đối mặt với những thử thách nguy hiểm, đồng thời phải đối phó với những mưu mô, âm mưu của tổ chức tội phạm. Phim mang đến cho khán giả những pha hành động gay cấn, đấu võ đỉnh cao và những tình huống căng thẳng',
//         // Thêm các trường dữ liệu khác tại đây
//       });
//       await moviesRef.add({
//           id:'8',
//           title: 'BÃO TRẮNG 3: THIÊN ĐÀNG HAY ĐỊA NGỤC',
//           director: 'Đạo diễn Khâu Lễ Đào',
//           year: 2023,
//           images:'https://i.mpcdn.top/c/2a75Vw3/bao-trang-3-thien-dang-hay-dia-nguc.jpg?1693501469',
//           details:'Lật Mặt là một bộ phim hành động Việt Nam do đạo diễn Lý Hải thực hiện và được công chiếu vào năm 2015. Phim xoay quanh câu chuyện về một nhóm cảnh sát đặc nhiệm được giao nhiệm vụ bí mật để điều tra một tổ chức tội phạm đa quốc gia. Họ phải xâm nhập vào tổ chức này thông qua việc tham gia vào cuộc thi võ thuật được tổ chức bởi tổ chức tội phạm này.'+
//           'Trong quá trình điều tra các nhân vật chính phải đối mặt với những thử thách nguy hiểm, đồng thời phải đối phó với những mưu mô, âm mưu của tổ chức tội phạm. Phim mang đến cho khán giả những pha hành động gay cấn, đấu võ đỉnh cao và những tình huống căng thẳng',
//         // Thêm các trường dữ liệu khác tại đây
//       });

//       await moviesRef.add({
//           id:'9',
//           title: 'TIẾNG GỌI ÂM BINH',
//           director: 'Đạo diễn Anggy Umbara',
//           year: 2023,
//           images:'https://i.mpcdn.top/c/g2NJxr2/tieng-goi-am-binh.jpg?1694932162',
//           details:'Lật Mặt là một bộ phim hành động Việt Nam do đạo diễn Lý Hải thực hiện và được công chiếu vào năm 2015. Phim xoay quanh câu chuyện về một nhóm cảnh sát đặc nhiệm được giao nhiệm vụ bí mật để điều tra một tổ chức tội phạm đa quốc gia. Họ phải xâm nhập vào tổ chức này thông qua việc tham gia vào cuộc thi võ thuật được tổ chức bởi tổ chức tội phạm này.'+
//           'Trong quá trình điều tra các nhân vật chính phải đối mặt với những thử thách nguy hiểm, đồng thời phải đối phó với những mưu mô, âm mưu của tổ chức tội phạm. Phim mang đến cho khán giả những pha hành động gay cấn, đấu võ đỉnh cao và những tình huống căng thẳng',
//         // Thêm các trường dữ liệu khác tại đây
//       });
//       console.log('Đã thêm dữ liệu phim vào Firestore.');
//     } catch (error) {
//       console.error('Lỗi khi thêm dữ liệu phim:', error);
//     }
//   };

//   return <Button title="Thêm Dữ Liệu Phim" onPress={handleAddData} />;
// };

// export default AddMovies;


