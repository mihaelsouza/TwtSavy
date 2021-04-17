import { StackNavigationProp } from '@react-navigation/stack';

export type StackParamList = {
  LandingView: undefined;
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