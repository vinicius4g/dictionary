import {
  type NavigatorScreenParams,
  type RouteProp,
} from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';

import { type HelpRoutesParamList } from '@routes/types/helpStackTypes';

import { type AppStackRoutes } from '@constants/routeNames';

export type AppStackRoutesParamList = {
  [AppStackRoutes.BottomTab]: undefined;
  [AppStackRoutes.HelpStack]: NavigatorScreenParams<HelpRoutesParamList>;
};

export type AppStackRoutesNavigationProp =
  NativeStackNavigationProp<AppStackRoutesParamList>;

export type AppStackRoutesProp = RouteProp<AppStackRoutesParamList>;
