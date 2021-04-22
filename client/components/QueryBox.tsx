import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import Button from '../components/Button';
import ContentBox from '../containers/ContentBox';

interface Props {
  username: string,
  endpoint: string,
  setEndpoint: Function,
  setSearchTerm: Function,
  handleCrunchNumbers: Function
};

const QueryBox: React.FC<Props> = ({ username, endpoint, setEndpoint, setSearchTerm, handleCrunchNumbers }) => {
  return (
    <ContentBox>
      <Text style={styles.textHeader}>Hi {`${username},`.toUpperCase()}</Text>
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
      <Button buttonLabel='Crunch Numbers' onPress={() => handleCrunchNumbers()} style={styles.additionalButton}/>
      <Text style={styles.text}>... or check out your own twitter!</Text>
      <Button buttonLabel='Analyze Me!' onPress={() => console.log('analyze me')} style={styles.additionalButton}/>
    </ContentBox>
  )
}

export default QueryBox;

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