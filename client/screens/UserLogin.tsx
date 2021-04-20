import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, SafeAreaView } from 'react-native';

import Button from '../components/Button';
import { UserDTO } from '../utilities/user-dto';
import { UserLoginNavigationProp } from '../utilities/types';
import { checkUser } from '../services/clientApi';
import * as validation from '../utilities/validation';

interface Props {
  navigation: UserLoginNavigationProp
};

const UserLogin: React.FC<Props> = ({ navigation }) => {
  const [form, setForm] = useState<{
    email: string,
    password: string,
    error: string
  }>({email: '', password: '', error: ''});

  const logMeIn: Function = async (): Promise<void> => {
    const validEmail = validation.validateEmail(form.email);
    const validPassword = validation.validatePassword(form.password);

    if (validEmail === true && validPassword === true) {
      const checkDB: UserDTO | string = await checkUser(form.email, form.password)
      if (typeof checkDB === 'object') navigation.navigate('DashboardView', {user: checkDB});
      else {
        if (typeof checkDB === 'string') setForm({...form, error: checkDB});
        else setForm({...form, error: checkDB})
      }
    } else {
      setForm({...form, error: 'Error: invalid e-mail and/or password.'})
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Login</Text>
      <Text style={styles.text}>EMAIL</Text>
      <TextInput
        onChangeText={(value) => setForm({...form, email: value.toLowerCase()})}
        keyboardType='email-address'
        style={styles.textInput}
        placeholder='Enter your email...'
        placeholderTextColor='#DADADA'
      ></TextInput>
      <Text style={styles.text}>PASSWORD</Text>
      <TextInput
        onChangeText={(value) => setForm({...form, password: value})}
        secureTextEntry={true}
        style={styles.textInput}
        placeholder='Enter your password...'
        placeholderTextColor='#DADADA'
      ></TextInput>
      <Text style={styles.errorText}>{form.error}</Text>
      <Button buttonLabel='LogMeIn' onPress={() => logMeIn()} style={styles.additionalButton}></Button>
      <Button buttonLabel='Register' onPress={() => navigation.navigate('UserRegistration')} style={styles.additionalButton}></Button>
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
  errorText: {
    fontSize: 15,
    color: 'red',
    marginBottom: 5,
    fontFamily: 'Raleway-Regular',
    alignSelf: 'center'
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