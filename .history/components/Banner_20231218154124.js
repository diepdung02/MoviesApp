import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

const BannerData = ({ onDataReceived }) => {
  const [loading, setLoading] = useState(true);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('banner')
      .limit(5)
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          const banner = [];

          querySnapshot.docs.forEach(documentSnapshot => {
               banner.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });

          setBanners(banner);
          setLoading(false);

          // Gửi dữ liệu về Home component thông qua props
          onDataReceived(banner);
          
          // Log dữ liệu sau khi cập nhật state
          console.log(banner);
        } else {
          console.log('Không có dữ liệu');
        }
      });

    return () => subscriber();
  }, []);

  return null;
};
const renderBanner = (banner, index) => (
     <View key={index} style={styles.bannerContainer}>
       <Image source={{ uri: banner.image }} style={styles.bannerImage} />
       <View style={styles.bannerTextContainer}>
         <Text style={styles.bannerTitle}>{banner.title}</Text>
         <Text style={styles.bannerDescription}>{banner.description}</Text>
       </View>
     </View>
   );
 
   return (
     <BannerCarousel autoplay autoplayTimeout={5000} loop index={0} pageSize={width}>
       {banners.map((banner, index) => renderBanner(banner, index))}
     </BannerCarousel>
   );
 };
 
 
 

export default BannerData;
const styles = StyleSheet.create({
   bannerContainer: {
     flexDirection: 'row',
     alignItems: 'center',
     backgroundColor: '#fff',
     padding: 10,
   },
   bannerImage: {
     width: '40%',
     aspectRatio: 2,
     borderRadius: 10,
     marginRight: 10,
   },
   bannerTextContainer: {
     flex: 1,
     justifyContent: 'center',
   },
   bannerTitle: {
     fontSize: 18,
     fontWeight: 'bold',
     marginBottom: 5,
   },
   bannerDescription: {
     fontSize: 14,
     color: 'gray',
   },
 });