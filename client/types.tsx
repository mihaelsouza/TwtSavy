import { StackNavigationProp } from '@react-navigation/stack';

export type StackParamList = {
  StackScreen: undefined;
  LandingView: undefined;
  UserLogin: undefined;
  DashboardView: undefined;
};

export type LandingViewNavigationProp = StackNavigationProp<
  StackParamList,
  'LandingView'
>;

export type DashboardViewNavigationProp = StackNavigationProp<
  StackParamList,
  'DashboardView'
>;

export type UserLoginNavigationProp = StackNavigationProp<
  StackParamList,
  'UserLogin'
>;