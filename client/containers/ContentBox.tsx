import React from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  children: React.ReactNode;
}

const ContentBox: React.FC<Props> = ({ children }) => {
  return (
    <View style={[styles.textBox]}>
      {children}
    </View>
  )
}

export default ContentBox;

const styles = StyleSheet.create({
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
});