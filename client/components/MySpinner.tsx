import React from 'react';
import { StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useAppSelector } from '../redux/hooks';

interface Props {
  text: string
};

const MySpinner: React.FC<Props> = ({ text }) => {
  const loading = useAppSelector(state => state.isLoading);

  return (
    <Spinner
      visible={loading}
      color='steelblue'
      textContent={text}
      textStyle={styles.spinnerText}
      cancelable={true}
      overlayColor='rgba(0,0,0,.75)'
    />
  )
}

export default MySpinner;

const styles = StyleSheet.create({
  spinnerText: {
    fontSize: 20,
    paddingTop: 10,
    color: 'white',
    fontFamily: 'FrederickatheGreat-Regular',
  },
});