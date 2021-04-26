import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, SafeAreaView, Alert } from 'react-native';

import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setLoading } from '../redux/isLoadingSlice';
import { updateUser } from '../redux/usersSlice';

import Button from '../components/Button';
import { UserLoginNavigationProp } from '../utilities/types';
import { checkUser } from '../services/clientApi';
import * as validation from '../utilities/validation';
import { instanceOfApiError } from '../utilities/api.error-interface';

interface Props {
  navigation: UserLoginNavigationProp
};

const UserLogin: React.FC<Props> = ({ navigation }) => {
  const loading = useAppSelector(state => state.isLoading);
  const user = useAppSelector(state => state.users);
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<{
    email: string,
    password: string,
  }>({email: '', password: ''});

  const logMeIn: Function =(): void => {
    const validEmail = validation.validateEmail(form.email);
    const validPassword = validation.validatePassword(form.password);

    if (validEmail === true && validPassword === true) {
      dispatch(setLoading({loading: true, text: '', context: 'login'})); // Show loading indicator
      setTimeout(async () => {
        const checkDB = await checkUser(form.email, form.password);
        if (instanceOfApiError(checkDB)) Alert.alert('Invalid credentials', checkDB.error);
        else {
          dispatch(updateUser({
            _id: checkDB._id,
            name: checkDB.name,
            email: checkDB.email,
            username: checkDB.username,
            twitter_handle: checkDB.twitter_handle
          }));
          navigation.navigate('DashboardView');
        }
        dispatch(setLoading({loading: false})); // Hide loading indicator
      }, 500); // UX implementation for the loading indicator
    } else Alert.alert('Invalid credentials', 'Error: invalid e-mail and/or password.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Login</Text>
      <Text style={styles.text}>EMAIL</Text>
      <TextInput
        value={form.email.toLowerCase()}
        onChangeText={(value) => setForm({...form, email: value.toLowerCase()})}
        keyboardType='email-address'
        autoCapitalize='none'
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