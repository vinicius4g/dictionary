import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '@screens/SignInScreen';

import { AuthStackRoutes } from '@constants/routeNames';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={AuthStackRoutes.SignInScreen}
        component={SignInScreen}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
