import React from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button';
import Header from '../containers/Header';
import Background from '../containers/Background';
import ContentBox from '../containers/ContentBox';

import { NotEnoughDataViewNavigationProp } from '../types/types';

interface Props {
  navigation: NotEnoughDataViewNavigationProp,
};

const NotEnoughDataView: React.FC<Props> = ({ navigation }) => {
  return (
    <Background>
      <Header/>
      <ContentBox>
        <Text style={styles.headerText}>Sorry, not enough data!</Text>
        <View>
          <LottieView style={styles.animation} source={require('../assets/not-enough-data-lottie.json')} autoPlay loop/>
        </View>
        <Text style={styles.text}>We cannot perform a robust analysis based on this query.</Text>
        <Text style={styles.text}>Why not try a new search?</Text>
        <Button buttonLabel="Back to Dashboard" onPress={() => navigation.navigate('DashboardView')}/>
      </ContentBox>
    </Background>
  )
};

export default NotEnoughDataView;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 25,
    fontFamily: 'FrederickatheGreat-Regular',
    marginVertical: 10,
  },
  text: {
    fontSize: 20,
    fontFamily: 'Raleway-Regular',
    textAlign: 'center',
    marginBottom: 10,
  },
  animation: {
    height: 300,
    width: 300,
    marginBottom: -20,
  }
});