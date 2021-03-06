import React from 'react';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet, Text, View, Image, ViewStyle } from 'react-native';

import { userLogout } from '../redux/usersSlice';
import { updateSearch } from '../redux/queryResultSlice';
import { useAppSelector, useAppDispatch } from '../redux/hooks';

interface Props {
  style?: ViewStyle,
};

const Header: React.FC<Props> = ({ style }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const username = useAppSelector((state) => state.users.username);

  const logoClickHandle = () => {
    dispatch(updateSearch(''));
    navigation.navigate('DashboardView')
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo}/>
        <Text style={styles.headerTxt} onPress={() => logoClickHandle()}>TwtSavy</Text>
      </View>
      <View style={{...styles.logoContainer, justifyContent: 'flex-end'}}>
        <Text style={styles.headerTxt}>{username.toUpperCase()}</Text>
        <FontAwesome5.Button name={'hamburger'} style={styles.hamburger} onPress={() => dispatch(userLogout())}
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
    marginBottom: 30,
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