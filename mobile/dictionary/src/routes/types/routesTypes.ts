import {
  type NavigatorScreenParams,
  type RouteProp,
} from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';

import { type AppStackRoutesParamList } from '@routes/types/appStackTypes';

import { type RoutesStack } from '@constants/routeNames';

export type RoutesParamList = {
  [RoutesStack.AppStack]?: NavigatorScreenParams<AppStackRoutesParamList>;
  [RoutesStack.AuthStack]?: undefined;
};

export type RoutesNavigationProp = NativeStackNavigationProp<RoutesParamList>;
export type RoutesProp = RouteProp<RoutesParamList>;
