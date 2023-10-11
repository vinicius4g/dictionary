import { type RouteProp } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';

import { type HelpStackRoutes } from '@constants/routeNames';

export type HelpRoutesParamList = {
  [HelpStackRoutes.InfoScreen]: undefined;
};

export type HelpRoutesNavigationProp =
  NativeStackNavigationProp<HelpRoutesParamList>;

export type HelpRoutesProp = RouteProp<HelpRoutesParamList>;
