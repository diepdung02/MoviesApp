import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, Alert, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

const UserProfileScreen = () => {
  const [fullName, setFullName] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    // Load user profile data when component mounts
    const currentUser = auth().currentUser;
    if (currentUser) {
      setFullName(currentUser.displayName);
      setAvatar(currentUser.photoURL);
    }
  }, []);

  const handleSelectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, async response => {
      if (response.assets && response.assets.length > 0) {
        const source = response.assets[0].uri;
        setAvatar(source);
        try {
          // Upload the selected image to Firebase Storage
          const filename = `avatar_${auth().currentUser.uid}.jpg`;
          const uploadUri = Platform.OS === 'ios' ? source.replace('file://', '') : source;
          const task = storage().ref(filename).putFile(uploadUri);

          await task;
          const url = await storage().ref(filename).getDownloadURL();

          // Update user profile with new avatar URL
          await auth().currentUser.updateProfile({
            photoURL: url,
          });
        } catch (error) {
          console.error('Error uploading avatar:', error);
          Alert.alert('Error', 'An error occurred while uploading the avatar.');
        }
      }
    });
  };

  const handleChangeFullName = async () => {
    try {
      await auth().currentUser.updateProfile({
        displayName: fullName,
      });
      Alert.alert('Success', 'Your full name has been updated successfully.');
    } catch (error) {
      console.error('Error updating full name:', error);
      Alert.alert('Error', 'An error occurred while updating your full name.');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await auth().currentUser.delete();
      // Redirect to login screen or any other action after successful account deletion
      Alert.alert('Success', 'Your account has been deleted successfully.');
    } catch (error) {
      console.error('Error deleting account:', error);
      Alert.alert('Error', 'An error occurred while deleting your account.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>User Profile</Text>
      {avatar ? <Image source={{ uri: avatar }} style={styles.avatar} /> : null}
      <Button title="Select Image" onPress={handleSelectImage} />
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={text => setFullName(text)}
      />
      <Button title="Change Full Name" onPress={handleChangeFullName} />
      <Button title="Delete Account" onPress={handleDeleteAccount} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default UserProfileScreen;
