import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  text: string
}

const Tweet: React.FC<Props> = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
};

export default Tweet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 300,
    height: 250,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontFamily: 'Raleway-Italic',
    fontSize: 18,
    textAlign: 'center'
  }
});