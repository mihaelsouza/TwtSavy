import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import Button from '../components/Button';
import Background from '../containers/Background';
import ContentBox from '../containers/ContentBox';
import { LandingViewNavigationProp } from '../utilities/types';

interface Props {
  navigation: LandingViewNavigationProp
};

const LandingView: React.FC<Props> = ({ navigation }) => {
  return (
    <Background>
      <Text style={{...styles.text, fontSize: 25}}>Welcome to</Text>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo}/>
        <Text style={styles.headerTxt}>TwtSavy</Text>
      </View>
      <ContentBox>
        <Text style={{...styles.text, paddingBottom: 20}}>Are people mostly happy or sad on the #NationalPinaColadaDay?</Text>
        <Text style={{...styles.text, paddingBottom: 20}}>Curious about the sentiment towards your favorite @company?</Text>
        <Text style={styles.text}>And you, what does your tweets reveal of your last week?</Text>
      </ContentBox>
      <Button buttonLabel="Let's Find Out!" onPress={() => navigation.navigate('UserLogin')}/>
    </Background>

    // <SafeAreaView style={{flex: 1}}>
    //   <ImageBackground source={require('../assets/circles-and-roundabouts.png')} style={[styles.backgroundImage, styles.container]}>
    //     <Text style={{...styles.text, fontSize: 25}}>Welcome to</Text>
    //     <View style={styles.logoContainer}>
    //       <Image source={require('../assets/logo.png')} style={styles.logo}/>
    //       <Text style={styles.headerTxt}>TwtSavy</Text>
    //     </View>
    //     <View style={[styles.textBox]}>
    //       <Text style={{...styles.text, paddingBottom: 20}}>Are people mostly happy or sad on the #NationalPinaColadaDay?</Text>
    //       <Text style={{...styles.text, paddingBottom: 20}}>Curious about the sentiment towards your favorite @company?</Text>
    //       <Text style={styles.text}>And you, what does your tweets reveal of your last week?</Text>
    //     </View>
    //     <Button buttonLabel="Let's Find Out!" onPress={() => navigation.navigate('UserLogin')}/>
    //   </ImageBackground>
    // </SafeAreaView>
  )
};

export default LandingView;

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain'
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