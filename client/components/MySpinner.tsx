import React from 'react';
import { StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useAppSelector } from '../redux/hooks';

import LottieView from 'lottie-react-native';

const MySpinner: React.FC = () => {
  const loading = useAppSelector(state => state.isLoading);

  return (
    <Spinner
      visible={loading.loading}
      color='steelblue'
      textContent={loading.text}
      textStyle={styles.spinnerText}
      cancelable={true}
      overlayColor='rgba(0,0,0,.75)'
      customIndicator={
        loading.context === 'login' ?
          <LottieView source={require('../assets/login-lottie.json')} autoPlay loop/>
        :
          <LottieView source={require('../assets/cube-shifter-lottie.json')} autoPlay loop/>
      }
    />
  )
}

export default MySpinner;

const styles = StyleSheet.create({
  spinnerText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Raleway-Regular',
  },
});