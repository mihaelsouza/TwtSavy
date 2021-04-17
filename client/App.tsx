import 'react-native-gesture-handler';

import React from 'react';
import LandingView from './screens/LandingView';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='LandingView'>
        <Stack.Screen name='LandingView' component={LandingView}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default App;