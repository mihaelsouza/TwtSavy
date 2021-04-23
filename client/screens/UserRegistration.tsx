import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, SafeAreaView, FlatList, View, Alert } from 'react-native';

import { useAppDispatch } from '../redux/hooks';
import { toggleLoading } from '../redux/isLoadingSlice';

import Button from '../components/Button';
import MySpinner from '../components/MySpinner';
import * as validation from '../utilities/validation';
import { createUser, instanceOfApiError } from '../services/clientApi';
import { UserRegistrationNavigationProp, Form } from '../utilities/types';

interface Props {
  navigation: UserRegistrationNavigationProp;
};

interface Data {
  id: number;
  text: string;
  placeholder: string;
  prop: keyof Form;
};

const UserRegistration: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<Form>({
    fullName: '',
    email: '',
    username: '',
    twitterHandle: '',
    password: '',
    repeatPassword: ''
  });

  const data: Data[] = [
    {id: 0, text: 'FULL NAME*', placeholder: "What's your name?", prop: 'fullName'},
    {id: 1, text: 'EMAIL*', placeholder: "What's your e-mail?", prop: 'email'},
    {id: 2, text: 'USERNAME*', placeholder: "How should we call you?", prop: 'username'},
    {id: 3, text: 'TWITTER HANDLE', placeholder: "Do you have a twitter account?", prop: 'twitterHandle'},
    {id: 4, text: 'PASSWORD*', placeholder: "Min. 1 lower and uppercase", prop: 'password'},
    {id: 5, text: 'REPEAT PASSWORD*', placeholder: "letters, 1 number, 8 digits", prop: 'repeatPassword'}
  ];

  const valueHandler: Function = (value: string, prop: string): void => {
    const newForm: Form = {...form};
    newForm[prop] = prop === 'email' ? value.toLowerCase().trim() : value.trim();
    setForm(newForm);
  };

  const registerHandle: Function = (): void => {
    if (!form.fullName || !form.username || !form.email || !form.password || !form.repeatPassword) {
      Alert.alert('Invalid Form', 'All fields marked with * are mandatory!');
    } else {
      if (typeof validation.validateEmail(form.email) === 'string') {
        setForm({...form, email: ''});
        Alert.alert('Invalid email address', 'Enter a valid email > e.g., email@host.com');
      }
      else if (typeof validation.validatePassword(form.password) === 'string') {
        setForm({...form, password: '', repeatPassword: ''});
        Alert.alert('Invalid password', 'Make sure your password has at least one uppercase and lowercase letters, a number, and a minimum of 8 characters.');
      }
      else if (form.password !== form.repeatPassword) {
        setForm({...form, password: '', repeatPassword: ''});
        Alert.alert('Incorrect password', 'PASSWORD and REPEAT PASSWORD do NOT match!');
      } else {
        dispatch(toggleLoading()); // Show loading indicator
        setTimeout(async () => {
          const newUser = await createUser(form);
          if (instanceOfApiError(newUser)) Alert.alert('E-mail conflict', newUser.error);
          else navigation.navigate('DashboardView');
          dispatch(toggleLoading()); // Hide loading indicator
        }, 500); // UX implementation for the loading indicator
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <MySpinner text='Logging in...'/>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View>
              <Text style={styles.text}>{item.text}</Text>
              <TextInput
                value={form[item.prop]}
                onChangeText={(value) => valueHandler(value, item.prop)}
                autoCapitalize={item.prop === 'email' ? 'none' : 'words'}
                // keyboardType={item.prop === 'email' ? 'email-address' : 'default'} //TODO: For some reason, invalidates secureTextEntry...
                secureTextEntry={item.prop === 'password' || item.prop === 'repeatPassword' ? true : false}
                style={styles.textInput} placeholder={item.placeholder} placeholderTextColor='#DADADA'
              />
            </View>
          );
        }}
      />
      <Button buttonLabel='Register' onPress={() => registerHandle()} style={styles.additionalButton}></Button>
    </SafeAreaView>
  )
};

export default UserRegistration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#06399D',
  },
  text: {
    fontSize: 20,
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
    marginTop: 0,
  }
});