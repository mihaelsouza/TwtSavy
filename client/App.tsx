import 'react-native-gesture-handler';

import React from 'react';
import { StackParamList } from './types';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import UserLogin from './screens/UserLogin';
import LandingView from './screens/LandingView';
import DashboardView from './screens/DashboardView';

const RootStack = createStackNavigator<StackParamList>();
const Stack = createStackNavigator<StackParamList>();

const StackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='LandingView'>
      <Stack.Screen name='LandingView' component={LandingView}/>
      <Stack.Screen name='DashboardView' component={DashboardView}/>
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode='modal'>
        <RootStack.Screen name='StackScreen' component={StackScreen} options={{ headerShown: false }}/>
        <RootStack.Screen name='UserLogin' component={UserLogin}/>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;