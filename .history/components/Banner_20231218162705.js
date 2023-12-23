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
     
               setForeigns(banners);
               setLoading(false);
     
               // Gửi dữ liệu về Home component thông qua props
               onDataReceived(foreigns);
               
               // Log dữ liệu sau khi cập nhật state
               console.log(foreigns);
             } else {
               console.log('Không có dữ liệu');
             }
           });
     
         return () => subscriber();
       }, []);
     
       return null;
     };
  



export default BannerData;
