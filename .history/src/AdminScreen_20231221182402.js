import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AdminScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Admin Panel</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MovieManagementScreen')}
      >
        <Text style={styles.buttonText}>Manage Movies</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ManageUsers')}
      >
        <Text style={styles.buttonText}>Manage Users</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    width: 200,
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdminScreen;
