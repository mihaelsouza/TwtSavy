import 'react-native-gesture-handler';

import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { store } from './redux/store';
import { StackParamList } from './utilities/types';
import UserLogin from './screens/UserLogin';
import UserRegistration from './screens/UserRegistration';
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
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator mode='modal'>
          <RootStack.Screen name='StackScreen' component={StackScreen} options={{ headerShown: false }}/>
          <RootStack.Screen name='UserLogin' component={UserLogin}/>
          <RootStack.Screen name='UserRegistration' component={UserRegistration}/>
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;