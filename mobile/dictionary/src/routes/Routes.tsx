import React from 'react';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from '@routes/stacks/AuthStack';
import AppStack from '@routes/stacks/AppStack';
import { type RoutesParamList } from '@routes/types/routesTypes';

import { RoutesStack } from '@constants/routeNames';

const Stack = createNativeStackNavigator<RoutesParamList>();

const Routes = () => {
  return (
    <>
      <StatusBar translucent />
      <NavigationContainer independent>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name={RoutesStack.AuthStack} component={AuthStack} />
          <Stack.Screen name={RoutesStack.AppStack} component={AppStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Routes;
