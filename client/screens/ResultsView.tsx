import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TimeSeriesChart from '../components/TimeSeriesChart';
import Background from '../containers/Background';
import ContentBox from '../containers/ContentBox';
import Header from '../containers/Header';
import Button from '../components/Button';

import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { updateWordFrequency } from '../redux/wordFrequencySlice';

import { generateWordClouds } from '../utilities/wordCloud';
import { ResultsViewNavigationProp } from '../types/types';
import { WordFrequencyDTO } from '../interfaces/word.frequency-dto';
import { getQueryColor } from '../utilities/getQueryRepresentativeColor';

interface Props {
  navigation: ResultsViewNavigationProp
};

const ResultsView: React.FC<Props> = ({ navigation }) => {
  const queryResults = useAppSelector(state => state.queryResult);
  const indicator: string = queryResults.endpoint === 'hashtag' ? '#' : '@';
  const intro: string = queryResults.endpoint === 'timeline' ?
    `The overall sentiment of\n"${indicator}${queryResults.search}"'s timeline is...`
  :
    `The overall sentiment associated with "${indicator}${queryResults.search}" is...`;

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(updateWordFrequency(generateWordClouds(queryResults.timeSeries)));
  }, [queryResults.timeSeries]);

  const handleOutcomesButton: Function = (outcome: keyof WordFrequencyDTO, colors: string[]) => {
    navigation.navigate('OutcomesView', {outcome, colors});
  };

  return (
    <Background>
      <Header />
      <ContentBox>
        <Text style={styles.text}>{intro}</Text>
        <Text style={[styles.textHeader, {color: getQueryColor(queryResults.overallSentiment)}]}>
          {queryResults.overallSentiment.toUpperCase()}
        </Text>
        <Text style={styles.text}>{`...with an average score of ${queryResults.averageScore}%`}</Text>
      </ContentBox>
      <ContentBox style={{padding: 0}}>
        <TimeSeriesChart />
        <View style={styles.buttonArray}>
          <Button
            buttonLabel='The Bad'
            onPress={() => handleOutcomesButton('negative', ['rgba(160,0,0,.8)', 'rgba(160,0,0,0)'])}
            style={{...styles.additionalButton, backgroundColor: '#A90B0B'}}
          />
          <Button
            buttonLabel='The Good'
            onPress={() => handleOutcomesButton('positive', ['rgba(0,160,0,.8)', 'rgba(0,160,0,0)'])}
            style={{...styles.additionalButton, backgroundColor: '#0D7D0D'}}
          />
        </View>
      </ContentBox>
    </Background>
  )
};

export default ResultsView;

const styles = StyleSheet.create({
  textHeader: {
    fontFamily: 'FrederickatheGreat-Regular',
    fontSize: 55,
    marginBottom: 5,
    marginTop: 5,
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
    marginBottom: 2
  },
});