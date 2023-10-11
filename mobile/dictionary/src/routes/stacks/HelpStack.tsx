import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { type HelpRoutesParamList } from '@routes/types/helpStackTypes';

import InfoScreen from '@screens/InfoScreen';

import { HelpStackRoutes } from '@constants/routeNames';

const Stack = createNativeStackNavigator<HelpRoutesParamList>();

const HelpStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name={HelpStackRoutes.InfoScreen} component={InfoScreen} />
  </Stack.Navigator>
);

export default HelpStack;
