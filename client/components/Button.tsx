import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props {
  buttonLabel: string,
  onPress: Function
};

const Button = (props: Props) => {
  return (
    <TouchableOpacity onPress={() => props.onPress()} style={styles.container}>
      <Text style={styles.text}>{props.buttonLabel}</Text>
    </TouchableOpacity>
  )
};

export default Button;

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#06399D',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2
  },
  text: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'FrederickatheGreat-Regular',
    fontSize: 25,
  }
});