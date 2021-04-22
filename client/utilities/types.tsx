import { UserDTO } from './user-dto';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// General Screens type definition
export type StackParamList = {
  StackScreen: undefined;
  LandingView: undefined;
  UserLogin: undefined;
  UserRegistration: undefined;
  DashboardView: {user: UserDTO};
};

// Each Screen individual definition
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

// Route definitions - for when passing parameters while navigating
export type DashboardViewRouteProp = RouteProp<StackParamList, 'DashboardView'>;

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