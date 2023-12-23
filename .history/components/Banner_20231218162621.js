import React, { useEffect,us } from 'react';
import { View, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const BannerData = ({ onDataReceived }) => {
  const [foreigns, setForeigns] = useState([]);     
       const [loading, setLoading] = useState(true);
     
       useEffect(() => {
         const subscriber = firestore()
           .collection('foreign locations')
           .limit(5)
           .onSnapshot(querySnapshot => {
             if (querySnapshot) {
               const foreigns = [];
     
               querySnapshot.docs.forEach(documentSnapshot => {
                 foreigns.push({
                   ...documentSnapshot.data(),
                   key: documentSnapshot.id,
                 });
               });
     
               setForeigns(foreigns);
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
