import 'react-native-gesture-handler';

import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { store } from './redux/store';
import { useAppSelector } from './redux/hooks';
import { StackParamList } from './types/types';

import MySpinner from './components/MySpinner';
import UserLogin from './screens/UserLogin';
import UserRegistration from './screens/UserRegistration';
import LandingView from './screens/LandingView';
import DashboardView from './screens/DashboardView';
import NotEnoughDataView from './screens/NotEnoughDataView';
import ResultsView from './screens/ResultsView';
import OutcomesView from './screens/OutcomesView';

const RootStack = createStackNavigator<StackParamList>();
const Stack = createStackNavigator<StackParamList>();

const StackScreen = () => {
  const isSignedIn = useAppSelector(state => state.users.isSignedIn);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='LandingView'>
      {!isSignedIn ? (
        <Stack.Screen name='LandingView' component={LandingView}/>
      ) : (
        <>
          <Stack.Screen name='DashboardView' component={DashboardView}/>
          <Stack.Screen name='NotEnoughDataView' component={NotEnoughDataView}/>
          <Stack.Screen name='ResultsView' component={ResultsView}/>
          <Stack.Screen name='OutcomesView' component={OutcomesView}/>
        </>
      )}
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <MySpinner/>
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