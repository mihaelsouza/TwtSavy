import React from 'react';
import { StyleSheet, ImageBackground, SafeAreaView, StatusBar } from 'react-native';

interface Props {
  children: React.ReactNode;
}

const Background: React.FC<Props> = ({ children }) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={require('../assets/circles-and-roundabouts.png')} style={styles.backgroundImage}>
        {children}
      </ImageBackground>
    </SafeAreaView>
  )
}

export default Background;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
});