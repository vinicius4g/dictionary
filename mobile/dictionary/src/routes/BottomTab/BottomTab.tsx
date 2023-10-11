import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '@screens/HomeScreen';
import HistoryScreen from '@screens/HistoryScreen';
import FavoriteScreen from '@screens/FavoriteScreen';

import { BottomTabRoutes } from '@constants/routeNames';

import { AnimatedBottomMenu } from './AnimatedBottomMenu';

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props: any) => <AnimatedBottomMenu {...props} />}
    >
      <Tab.Screen name={BottomTabRoutes.Home} component={HomeScreen} />
      <Tab.Screen name={BottomTabRoutes.Favorites} component={FavoriteScreen} />
      <Tab.Screen name={BottomTabRoutes.History} component={HistoryScreen} />
    </Tab.Navigator>
  );
}

export default BottomTab;
