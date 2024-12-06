import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { CommonActions } from '@react-navigation/native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Add this check to make sure the `Intro` screen exists
      if (navigation && navigation.navigate) {
        navigation.navigate('Intro'); // Navigate to Intro screen after 2 seconds
      } else {
        console.error("Navigation not available or 'Intro' screen not found.");
      }
    }, 2000); // Adjust the duration as needed
  
    return () => clearTimeout(timer); // Clean up the timer
  }, [navigation]);
  

  return (
    <View style={styles.container}>
      {/* <Image
        source={require('../assets/images/splash1.png')} // Your splash image
        style={styles.image}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff', // Customize background color if needed
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // Ensures the image fits within bounds
  },
});

export default SplashScreen;
