import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from '../containers/Header';
import Button from '../components/Button';
import Background from '../containers/Background';
import ContentBox from '../containers/ContentBox';

import { OutcomesViewNavigationProp, OutcomesViewRouteProp } from '../utilities/types';

interface Props {
  route: OutcomesViewRouteProp,
  navigation: OutcomesViewNavigationProp
};

const OutcomesView: React.FC<Props> = ({ navigation, route }) => {
  const { outcome } = route.params;

  return (
    <Background>
      <Header />
      <ContentBox>
      </ContentBox>
    </Background>
  )
}

export default OutcomesView;

const styles = StyleSheet.create({});