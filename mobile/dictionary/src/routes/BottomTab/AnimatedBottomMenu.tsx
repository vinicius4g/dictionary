import React from 'react';
import { Platform, useWindowDimensions } from 'react-native';
import { type BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
} from 'react-native-reanimated';
import styled, { css } from 'styled-components/native';

import { TabIndicator } from '@routes/BottomTab/TabIndicator';

export const AnimatedBottomMenu = ({
  state,
  navigation,
}: BottomTabBarProps) => {
  const dimensions = useWindowDimensions();
  const tabWidth = dimensions.width / 3;
  const totalWidth = tabWidth * state.routes.length;

  const indicator = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      indicator.value,
      [0, totalWidth],
      [0, dimensions.width],
    );
    return {
      transform: [{ translateX }],
    };
  });

  return (
    <StyledContainer>
      {state?.routes?.map((route, index) => {
        const isSelected = state.index === index;

        return (
          <TabIndicator
            key={route.key}
            label={route.name}
            onPress={() => {
              indicator.value = withTiming(index * tabWidth, {
                duration: 200,
              });
              navigation.navigate(route.name);
            }}
            isSelected={isSelected}
            tabWidth={tabWidth}
          />
        );
      })}
      <StyledIndicator tabWidth={tabWidth} style={animatedStyle} />
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  height: ${Platform.OS === 'ios' ? 82 : 78}px;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.BACKGROUND};
  elevation: 24;
  shadow-color: ${({ theme }) => theme.colors.BLACK};
  shadow-opacity: 0.58;
  shadow-radius: 12px;
  shadow-offset: 0px 12px;
`;

const StyledIndicator = styled(Animated.View)<{ tabWidth: number }>`
  ${({ tabWidth, theme }) => css`
    width: ${tabWidth / 1.5}px;
    left: ${tabWidth / 6.5}px;
    background-color: ${theme.colors.BLACK_LIGHT};
  `};

  height: 3px;
  border-radius: 4px;
  position: absolute;
  top: 0;
`;
