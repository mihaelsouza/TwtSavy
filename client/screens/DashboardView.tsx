import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';

import Button from '../components/Button';
import Header from '../containers/Header';
import Background from '../containers/Background';
import ContentBox from '../containers/ContentBox';

import { setLoading } from '../redux/isLoadingSlice';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { updateEndpoint, updateSearch, updateQuery } from '../redux/queryResultSlice';

import { validateUserQuery } from '../utilities/validation';
import { DashboardViewNavigationProp } from '../utilities/types';
import { twitterQuery } from '../services/clientApi';
import { instanceOfApiError } from '../utilities/api.error-interface';

interface Props {
  navigation: DashboardViewNavigationProp,
};

const DashboardView: React.FC<Props> = ({ navigation }) => {
  const queryResult = useAppSelector(state => state.queryResult);
  const user = useAppSelector(state => state.users);
  const dispatch = useAppDispatch();

  const handleCrunchNumbers: Function = async (): Promise<void> => {
    dispatch(setLoading({loading: true, text: 'Analyzing Twitter Data.\nThis may take a moment...', context: ''}));
    try {
      const query = validateUserQuery(`@${queryResult.search}`);
      const values = await twitterQuery(user._id, query, queryResult.endpoint);
      if (instanceOfApiError(values)) {
        console.error(values.error);
        // navigate to an Error component...
      } else {
        dispatch(updateQuery(values));
        navigation.navigate('ResultsView');
      }
    } catch (err) {
      Alert.alert('Error.', 'Invalid search term. Try again!')
    }
    dispatch(setLoading({loading: false}));
  };

  const handleAnalyzeMe: Function = async (): Promise<void> => {
    dispatch(setLoading({loading: true, text: 'Analyzing Twitter Data.\nThis may take a moment...', context: ''}));
    try {
      const userTwitter = validateUserQuery(`@${user.twitter_handle}`);
      const values = await twitterQuery(user._id, userTwitter, 'timeline');
      if (instanceOfApiError(values)) {
        console.error(values.error);
        // navigate to an Error component...
      } else {
        dispatch(updateQuery(values));
        navigation.navigate('ResultsView');
      }
    } catch (err) {
      Alert.alert('Error.', `No twitter handler found for ${user.username}. Check your personal settings.`)
    }
    dispatch(setLoading({loading: false}));
  };

  return (
    <Background>
      <Header style={{marginBottom: 50}}/>
      <ContentBox>
        <Text style={styles.textHeader}>Hi {`${user.username},`.toUpperCase()}</Text>
        <Text style={styles.text}>Let's draw some insights!</Text>
        <Text style={styles.text}>Choose a category and search term below to get started...</Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            value={queryResult.endpoint}
            onValueChange={value => dispatch(updateEndpoint(value))}
            items={[
              {label: '#', value: 'hashtag'},
              {label: '@T', value: 'timeline'},
              {label: '@M', value: 'mentions'},
            ]}
            useNativeAndroidPickerStyle={false}
            fixAndroidTouchableBug={true}
            style={pickerStyles}
          />
          <TextInput
            value={queryResult.search}
            onChangeText={text => dispatch(updateSearch(text))}
            placeholder='Your search term...'
            placeholderTextColor='#DADADA'
            style={styles.pickerTextInput}
          ></TextInput>
        </View>
        <Button buttonLabel='Crunch Numbers' onPress={() => handleCrunchNumbers()} style={styles.additionalButton}/>
        <Text style={styles.text}>... or check out your own twitter!</Text>
        <Button buttonLabel='Analyze Me!' onPress={() => handleAnalyzeMe()} style={styles.additionalButton}/>
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