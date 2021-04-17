import 'react-native-gesture-handler';

import React from 'react';
import { StackParamList } from './types';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingView from './screens/LandingView';
import DashboardView from './screens/DashboardView';

const Stack = createStackNavigator<StackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='LandingView'>
        <Stack.Screen name='LandingView' component={LandingView}/>
        <Stack.Screen name='DashboardView' component={DashboardView}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default App;