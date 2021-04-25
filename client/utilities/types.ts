import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// General Screens type definition
export type StackParamList = {
  StackScreen: undefined;
  LandingView: undefined;
  UserLogin: undefined;
  UserRegistration: undefined;
  DashboardView: undefined;
  ResultsView: undefined;
  OutcomesView: {outcome: string};
};

// Each Screen individual navigation type definitions
export type LandingViewNavigationProp = StackNavigationProp<
  StackParamList,
  'LandingView'
>;

export type UserLoginNavigationProp = StackNavigationProp<
  StackParamList,
  'UserLogin'
>;

export type UserRegistrationNavigationProp = StackNavigationProp<
  StackParamList,
  'UserRegistration'
>;

export type DashboardViewNavigationProp = StackNavigationProp<
  StackParamList,
  'DashboardView'
>;

export type ResultsViewNavigationProp = StackNavigationProp<
  StackParamList,
  'ResultsView'
>;

export type OutcomesViewRouteProp = RouteProp<StackParamList, 'OutcomesView'>
export type OutcomesViewNavigationProp = StackNavigationProp<
  StackParamList,
  'OutcomesView'
>;

// Additional types
export type Form = {
  [key: string]: string;
  fullName: string;
  email: string;
  username: string;
  twitterHandle: string;
  password: string;
  repeatPassword: string;
}