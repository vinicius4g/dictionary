import React from 'react';
import { Platform } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

import { BottomTabRoutes } from '@constants/routeNames';

import { IconHome } from '@assets/svgs/bottom-tab/IconHome';
import { IconHistory } from '@assets/svgs/bottom-tab/IconHistory';
import { IconFavorite } from '@assets/svgs/bottom-tab/IconFavorite';
import { type IconSVGProps } from '@assets/svgs/bottom-tab';

type TabBarButtonProps = {
  label: string;
  onPress: () => void;
  isSelected: boolean;
  tabWidth: number;
};

interface IconConfig {
  component: React.FC<IconSVGProps>;
  width: number;
  height: number;
}

export const TabIndicator = ({
  label,
  onPress,
  isSelected,
  tabWidth,
}: TabBarButtonProps) => {
  const theme = useTheme();

  const handlePress = () => {
    onPress();
  };

  const renderIcon = () => {
    const iconData: Record<string, IconConfig> = {
      [BottomTabRoutes.Home]: { component: IconHome, width: 20, height: 20 },
      [BottomTabRoutes.History]: {
        component: IconHistory,
        width: 24,
        height: 24,
      },
      [BottomTabRoutes.Favorites]: {
        component: IconFavorite,
        width: 24,
        height: 24,
      },
    };

    const { component: IconComponent, width, height } = iconData[label] || {};

    if (IconComponent) {
      return (
        <IconComponent
          width={width}
          height={height}
          fill={
            isSelected
              ? theme.colors.BLACK_LIGHT
              : theme.colors.WHITE_GRAY_DARKER
          }
        />
      );
    }

    return null;
  };

  return (
    <StyledContainer width={tabWidth} onPress={handlePress} activeOpacity={1}>
      {renderIcon()}
    </StyledContainer>
  );
};

const StyledContainer = styled.TouchableOpacity<{ width: number }>`
  width: ${({ width }) => width}px;
  align-items: center;
  justify-content: center;
  margin-bottom: ${Platform.OS === 'ios' ? 12 : 0}px;
`;
