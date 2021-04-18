import { StackNavigationProp } from '@react-navigation/stack';

export type StackParamList = {
  StackScreen: undefined;
  LandingView: undefined;
  UserLogin: undefined;
  UserRegistration: undefined;
  DashboardView: undefined;
};

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