import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

interface Props {
  buttonLabel: string,
  onPress: Function,
  style?: ViewStyle
};

const Button: React.FC<Props> = ({ buttonLabel, onPress, style }) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={[styles.container, style]}>
      <Text style={styles.text}>{buttonLabel}</Text>
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
    backgroundColor: 'steelblue',
    borderColor: 'black',
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