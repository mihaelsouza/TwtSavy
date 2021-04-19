import React, { useState } from 'react';
import Button from '../components/Button';
import { UserRegistrationNavigationProp } from '../types';
import { StyleSheet, Text, TextInput, SafeAreaView, FlatList, View, TextInputProps } from 'react-native';

interface Props {
  navigation: UserRegistrationNavigationProp;
};

type Form = {
  [key: string]: string | undefined;
  fullName: string;
  email: string;
  username: string;
  twitterHandle?: string;
  password: string;
  repeatPassword: string;
}

interface Data {
  id: number;
  text: string;
  placeholder: string;
  prop: keyof Form;
};

const UserRegistration: React.FC<Props> = ({ navigation }) => {
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
    {id: 4, text: 'PASSWORD*', placeholder: "Numbers and letters, min. 8 digits", prop: 'password'},
    {id: 5, text: 'REPEAT PASSWORD*', placeholder: "Numbers and letters, min. 8 digits", prop: 'repeatPassword'}
  ];

  const valueHandler: Function = (value: string, prop: string): void => {
    const newForm: Form = {...form};
    newForm[prop] = value;
    setForm(newForm);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View>
              <Text style={styles.text}>{item.text}</Text>
              <TextInput
                onChangeText={(value) => valueHandler(value, item.prop)}
                keyboardType={item.prop === 'email' ? 'email-address' : 'default'}
                style={styles.textInput} placeholder={item.placeholder} placeholderTextColor='#DADADA'
              />
            </View>
          );
        }}
      />
      <Button buttonLabel='Register' onPress={() => navigation.navigate('DashboardView')} style={styles.additionalButton}></Button>
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