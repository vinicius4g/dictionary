import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTab from '@routes/BottomTab';
import HelpStack from '@routes/stacks/HelpStack';

import { AppStackRoutes } from '@constants/routeNames';

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={AppStackRoutes.BottomTab} component={BottomTab} />
      <Stack.Screen name={AppStackRoutes.HelpStack} component={HelpStack} />
    </Stack.Navigator>
  );
}

export default AppStack;
