import React, { useState } from 'react';
import Button from '../components/Button';
import { UserLoginNavigationProp } from '../types';
import { StyleSheet, Text, TextInput, SafeAreaView } from 'react-native';

interface Props {
  navigation: UserLoginNavigationProp
};

const UserLogin: React.FC<Props> = ({ navigation }) => {
  const [form, setForm] = useState<{
    email: string,
    password: string
  }>({email: '', password: ''})

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Login</Text>
      <Text style={styles.text}>EMAIL</Text>
      <TextInput onChangeText={(value) => setForm({...form, email: value})}
        style={styles.textInput} placeholder='Enter your email...' placeholderTextColor='#DADADA'
      ></TextInput>
      <Text style={styles.text}>PASSWORD</Text>
      <TextInput onChangeText={(value) => setForm({...form, password: value})}
        style={styles.textInput} placeholder='Enter your password...' placeholderTextColor='#DADADA'
      ></TextInput>
      <Button buttonLabel='LogMeIn' onPress={() => navigation.navigate('DashboardView')} style={styles.additionalButton}></Button>
      <Button buttonLabel='Register' onPress={() => console.log('register')} style={styles.additionalButton}></Button>
    </SafeAreaView>
  )
};

export default UserLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#06399D',
  },
  headerText: {
    fontSize: 60,
    color: 'white',
    marginBottom: 20,
    fontFamily: 'FrederickatheGreat-Regular',
  },
  text: {
    fontSize: 25,
    color: 'white',
    marginBottom: 5,
    fontFamily: 'FrederickatheGreat-Regular',
  },
  textInput: {
    fontFamily: 'Raleway-Regular',
    fontSize: 20,
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    color: 'black',
    paddingLeft: 10,
    borderRadius: 10,
    marginBottom: 10
  },
  additionalButton: {
    alignSelf: 'center',
    width: '70%',
    marginBottom: 0,
    marginTop: 8,
  }
});