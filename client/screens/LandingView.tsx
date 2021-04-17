import React from 'react';
import Button from '../components/Button';
import { StyleSheet, Text, View, SafeAreaView, Image, ImageBackground } from 'react-native';

const LandingView = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={require('../assets/circles-and-roundabouts.png')} style={styles.backgroundImage}>
        <View style={styles.container}>
          <Text style={{...styles.text, fontSize: 25}}>Welcome to</Text>
          <View style={styles.logo}>
            <Image source={require('../assets/logo.png')} style={{width: 60, height: 60, resizeMode: 'contain'}}/>
            <Text style={styles.headerTxt}>TwtSavy</Text>
          </View>
          <View style={[styles.textBox]}>
            <Text style={{...styles.text, paddingBottom: 20}}>Are people mostly happy or sad on the #NationalPinaColadaDay?</Text>
            <Text style={{...styles.text, paddingBottom: 20}}>Curious about the sentiment towards your favorite @company?</Text>
            <Text style={styles.text}>And you, what does your tweets reveal of your last week?</Text>
          </View>
          <Button buttonLabel="Let's Find Out!" onPress={() => {console.log('pressed')}}/>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
};

export default LandingView;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30
  },
  textBox: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    paddingBottom: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  headerTxt: {
    fontFamily: 'FrederickatheGreat-Regular',
    fontSize: 60,
    marginLeft: 10
  },
  text: {
    fontFamily: 'Raleway-Regular',
    fontSize: 18,
    textAlign: 'center',
  }
});