import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import Button from '../components/Button';
import Header from '../containers/Header';
import Background from '../containers/Background';
import ContentBox from '../containers/ContentBox';
import { DashboardViewNavigationProp } from '../utilities/types';


interface Props {
  navigation: DashboardViewNavigationProp
};

const DashboardView: React.FC<Props> = ({ navigation }) => {
  const [endpoint, setEndpoint] = useState<string>('hashtag');
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <Background>
      <Header />
      <ContentBox>
        <Text style={styles.textHeader}>Hi {'USERNAME,'.toUpperCase()}</Text>
        <Text style={styles.text}>Let's draw some insights!</Text>
        <Text style={styles.text}>Choose a category and search term below to get started...</Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            value={endpoint}
            onValueChange={value => setEndpoint(value)}
            items={[
              {label: '#', value: 'hashtag'},
              {label: '@T', value: 'timeline'},
              {label: '@M', value: 'mentions'},
            ]}
            useNativeAndroidPickerStyle={false}
            fixAndroidTouchableBug={true}
            style={pickerStyles}
          />
          <TextInput style={styles.pickerTextInput} placeholder='Your search term...'
            onChangeText={(text) => setSearchTerm(text)} placeholderTextColor='#DADADA'
          ></TextInput>
        </View>
        <Button buttonLabel='Crunch Numbers' onPress={() => console.log('crunch numbers')} style={styles.additionalButton}/>
        <Text style={styles.text}>... or check out your own twitter!</Text>
        <Button buttonLabel='Analyze Me!' onPress={() => console.log('analyze me')} style={styles.additionalButton}/>
      </ContentBox>
    </Background>
  )
};

export default DashboardView;

const styles = StyleSheet.create({
  textHeader: {
    fontFamily: 'FrederickatheGreat-Regular',
    fontSize: 28,
    marginBottom: 10,
    alignSelf: 'flex-start'
  },
  text: {
    fontFamily: 'Raleway-Regular',
    fontSize: 20,
    marginTop: 10,
    alignSelf: 'flex-start'
  },
  additionalButton: {
    alignSelf: 'center',
    marginTop: 20,
  },

  // Region with the Picker element
  pickerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  pickerTextInput: {
    fontFamily: 'Raleway-Regular',
    fontSize: 20,
    width: '79%',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: .5,
    color: 'black',
    paddingLeft: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});

const pickerStyles = StyleSheet.create({
  inputAndroid: {
    fontFamily: 'FrederickatheGreat-Regular',
    fontSize: 20,
    padding: 10,
    color: 'white',
    width: 60,
    textAlign: 'center',
    backgroundColor: 'steelblue',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 1,
  },
});