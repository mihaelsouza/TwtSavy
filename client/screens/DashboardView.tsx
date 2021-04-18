import React, { useState } from 'react';
import Button from '../components/Button';
import Header from '../containers/Header';
import { DashboardViewNavigationProp } from '../types';
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, TextInput } from 'react-native';

interface Props {
  navigation: DashboardViewNavigationProp
};

const DashboardView: React.FC<Props> = ({ navigation }) => {
  const [endpoint, setEndpoint] = useState<string>('hashtag');
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={require('../assets/circles-and-roundabouts.png')} style={styles.backgroundImage}>
        <Header />
        <View style={[styles.textBox]}>
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
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
};

export default DashboardView;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    overflow: 'hidden'
  },
  textBox: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  textHeader: {
    fontFamily: 'FrederickatheGreat-Regular',
    fontSize: 28,
    marginBottom: 10,
  },
  text: {
    fontFamily: 'Raleway-Regular',
    fontSize: 20,
    marginTop: 10
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