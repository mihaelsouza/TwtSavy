import React from 'react';
import { StyleSheet, Text, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Tweet from '../components/Tweet';
import Header from '../containers/Header';
import Button from '../components/Button';
import Background from '../containers/Background';
import ContentBox from '../containers/ContentBox';

import { OutcomesViewNavigationProp, OutcomesViewRouteProp } from '../utilities/types';
import { getArrayOfTweets } from '../utilities/wordCloud';
import { useAppSelector } from '../redux/hooks';

interface Props {
  route: OutcomesViewRouteProp,
  navigation: OutcomesViewNavigationProp
};

const OutcomesView: React.FC<Props> = ({ navigation, route }) => {
  const { outcome, colors } = route.params;
  const outcomesArray = useAppSelector(state => state.wordFrequency[outcome]);
  const scrollViewHeight = useAppSelector(state => state.styleProperties.scrollViewHeight);
  const tweetsArray = getArrayOfTweets(useAppSelector(state => state.queryResult.timeSeries), outcome);

  return (
    <Background>
      <LinearGradient colors={[colors[0], colors[1]]} style={[styles.gradient, {height: scrollViewHeight}]}>
        <Header />
        <ContentBox>
          <Text style={styles.text}>We found words such as:</Text>
          <Text style={styles.highlight}>{
            outcomesArray.words
              .filter((item) => item.length > 4)
              .slice(0,10)
              .join(', ')
          }</Text>
          <Text style={styles.text}>{`in ${outcome} tweets, and it represented ${outcomesArray.frequency}% of the total tweets.`}</Text>
        </ContentBox>
        <ContentBox>
          <Text style={styles.tweetsHeader}>{`${outcome[0].toUpperCase()}${outcome.slice(1,)} Tweets Examples:`}</Text>
          <Text style={[styles.text, {marginBottom: -20}]}>(scroll right/left to view more!)</Text>
          <FlatList
            data={tweetsArray}
            renderItem={({item}) => <Tweet text={item.tweet}/>}
            horizontal={true}
            pagingEnabled={true}
            snapToInterval={300}
            snapToAlignment={'start'}
            decelerationRate={'fast'}
            showsHorizontalScrollIndicator={true}
          />
        </ContentBox>
        <Button
          buttonLabel="Back to Resutls"
          style={{marginTop: 10}}
          onPress={() => navigation.navigate('ResultsView')}
        />
      </LinearGradient>
    </Background>
  )
}

export default OutcomesView;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Raleway-Regular',
    fontSize: 18,
    textAlign: 'center',
  },
  highlight: {
    fontFamily: 'FrederickatheGreat-Regular',
    fontSize: 22,
    textAlign: 'center',
    marginVertical: 5,
  },
  tweetsHeader: {
    fontFamily: 'FrederickatheGreat-Regular',
    fontSize: 20,
  },
  gradient: {
    alignItems: 'center',
  },
});