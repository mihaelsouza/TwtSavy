import React from 'react';
import { StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Header from '../containers/Header';
import Button from '../components/Button';
import Background from '../containers/Background';
import ContentBox from '../containers/ContentBox';

import { OutcomesViewNavigationProp, OutcomesViewRouteProp } from '../utilities/types';
import { useAppSelector } from '../redux/hooks';

interface Props {
  route: OutcomesViewRouteProp,
  navigation: OutcomesViewNavigationProp
};

const OutcomesView: React.FC<Props> = ({ navigation, route }) => {
  const { outcome, colors } = route.params;
  const outcomesArray = useAppSelector(state => state.wordFrequency[outcome]);

  return (
    <Background>
      <LinearGradient colors={[colors[0], colors[1]]} style={styles.gradient}>
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
        <Button buttonLabel="Back to Resutls" onPress={() => navigation.navigate('ResultsView')}></Button>
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
  gradient: {
    height: '100%',
    alignItems: 'center',
  },
});