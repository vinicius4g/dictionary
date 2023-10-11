import { type RouteProp } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';

import { type AuthStackRoutes } from '@constants/routeNames';

export type AuthStackRoutesParamList = {
  [AuthStackRoutes.SignInScreen]: undefined;
};

export type AuthStackRoutesNavigationProp =
  NativeStackNavigationProp<AuthStackRoutesParamList>;

export type AuthStackRoutesProp = RouteProp<AuthStackRoutesParamList>;
