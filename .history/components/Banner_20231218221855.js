import React, { useEffect,useState } from 'react';
import { View, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const BannerData = ({ onDataReceived }) => {
  const [banners, setBanners] = useState([]);     
       const [loading, setLoading] = useState(true);

       
     
       useEffect(() => {
         const subscriber = firestore()
           .collection('banners')
           .limit(5)
           .onSnapshot(querySnapshot => {
             if (querySnapshot) {
               const banners = [];
     
               querySnapshot.docs.forEach(documentSnapshot => {
                banners.push({
                   ...documentSnapshot.data(),
                   key: documentSnapshot.id,
                 });
               });
     
               setBanners(banners);
               setLoading(false);
     
               // Gửi dữ liệu về Home component thông qua props
               onDataReceived(banners);
               
               // Log dữ liệu sau khi cập nhật state
               console.log(banners);
             } else {
               console.log('Không có dữ liệu');
             }
           });
     
         return () => subscriber();
       }, []);
     
       return null;
     };
     const renderItem = ({ item }) => (
      <TouchableWithoutFeedback onPress={() => handleClick(item.id)}>
        <Image
          source={{ uri: item.images }}
          style={{
            width: width * 0.6,
            height: height * 0.4,
            borderRadius: 20,
          }}
        />
      </TouchableWithoutFeedback>
    );

export default BannerData;
