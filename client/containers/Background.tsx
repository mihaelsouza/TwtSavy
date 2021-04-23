import React from 'react';
import { StyleSheet, ImageBackground, SafeAreaView, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle
}

const Background: React.FC<Props> = ({ children, style }) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={require('../assets/circles-and-roundabouts.png')} style={[styles.backgroundImage, style]}>
        <ScrollView contentContainerStyle={styles.scroll}>
          {children}
        </ScrollView>
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
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  scroll: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 120,
  }
});