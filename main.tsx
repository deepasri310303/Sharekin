import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const MainApp = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.header}>HEY, CHANGE MAKER!{"\n"}LET’S MAKE A DIFFERENCE!</Text>
      
      <TouchableOpacity style={styles.card}>
        <ImageBackground source={require('../assets/Donor.jpg')} style={styles.image}>
          <View style={styles.overlay}>
            <Text style={styles.title}>Donor Registration</Text>
            <Text style={styles.description}>Your Kindness Can Change a Life{"\n"}– Become a Donor Today!</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.card}>
        <ImageBackground source={require('../assets/orphanage.jpeg')} style={styles.image}>
          <View style={styles.overlay}>
            <Text style={styles.title}>Orphanage Registration</Text>
            <Text style={styles.description}>Join Hands with Us to Provide Hope{"\n"}– Register Your Orphanage!</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      
      <Text style={styles.footer}>Step In. Share. Shine</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F0FE',
    alignItems: 'center',
    paddingVertical: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#123884',
    marginBottom: 20,
    marginTop:20,
  },
  card: {
    width: '90%',
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 5,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#123884',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#123884',
    marginTop: 5,
  },
  footer: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#123884',
    marginTop: 20,
  },
});

export default MainApp;
