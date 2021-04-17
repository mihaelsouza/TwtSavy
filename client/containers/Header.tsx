import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface Props {

};

const Header = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo}/>
        <Text style={styles.headerTxt}>TwtSavy</Text>
      </View>
      <View style={{...styles.logoContainer, justifyContent: 'flex-end'}}>
        <Text>{'Username'.toUpperCase()}</Text>
        <FontAwesome5.Button name={'hamburger'} style={styles.hamburger} onPress={() => {console.log('hamburger')}}
          size={25} backgroundColor='transparent' color='black'
        />
      </View>
    </View>
  )
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#DADADA',
    height: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    opacity: .8,
    marginBottom: 50,
  },
  logoContainer: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logo: {
    width: 25,
    height: 25,
    resizeMode: 'contain'
  },
  headerTxt: {
    fontFamily: 'FrederickatheGreat-Regular',
    fontSize: 20,
    marginLeft: 5
  },
  hamburger: {
    color: 'transparent',
    textAlign: 'center',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    alignSelf: 'center',
    padding: 0,
    marginLeft: 10
  }
});