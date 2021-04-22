import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Background from '../containers/Background';
import ContentBox from '../containers/ContentBox';
import Header from '../containers/Header';
import Button from '../components/Button';

import { useAppSelector } from '../redux/hooks';

import { ResultsViewNavigationProp } from '../utilities/types';
import { queryResultSlice } from '../redux/queryResultSlice';

interface Props {
  navigation: ResultsViewNavigationProp
};

const ResultsView: React.FC<Props> = ({ navigation }) => {
  const queryResults = useAppSelector(state => state.queryResult);

  return (
    <Background>
      <Header />
      <ContentBox>
        <Text style={styles.text}>{`The overall sentiment associated with "${queryResults.search}" is...`}</Text>
        <Text style={[
          styles.textHeader,
          {color:
            queryResults.overallSentiment === 'positive' ?
              'green'
            :
            queryResults.overallSentiment === 'negative' ?
              'red'
            :
            'grey'
          }
        ]}
        >
          {queryResults.overallSentiment.toUpperCase()}
        </Text>
        <Text style={styles.text}>{`...with an average score of ${queryResults.averageScore}%`}</Text>
      </ContentBox>
      <ContentBox>
        <Text>Time Series plot will go here...</Text>
      </ContentBox>
      <View style={styles.buttonArray}>
        <Button buttonLabel='The Bad' onPress={() => console.log('the bad')} style={{...styles.additionalButton, backgroundColor: 'red'}}/>
        <Button buttonLabel='The Good' onPress={() => console.log('the good')} style={{...styles.additionalButton, backgroundColor: 'green'}}/>
      </View>
    </Background>
  )
};

export default ResultsView;

const styles = StyleSheet.create({
  textHeader: {
    fontFamily: 'FrederickatheGreat-Regular',
    fontSize: 55,
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
  },
  text: {
    fontFamily: 'Raleway-Regular',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonArray: {
    flexDirection: 'row',
    marginTop: -20,
  },
  additionalButton: {
    marginRight: 5,
    marginLeft: 5,
  },
});