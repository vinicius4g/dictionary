import React from 'react';
import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@components/Text';

import IconLeft from '@assets/svgs/icon-arrowLeft.svg';

type HeaderProps = {
  title: string;
  onPressIcon: () => void;
};

export const Header = ({ title, onPressIcon, ...rest }: HeaderProps) => {
  const insets = useSafeAreaInsets();

  const handlePressButtonBack = () => {
    onPressIcon();
  };

  return (
    <StyledContainer distanceFromTop={insets.top} {...rest}>
      <StyledButtonBack onPress={handlePressButtonBack}>
        <IconLeft />
      </StyledButtonBack>
      <StyledTitle>{title}</StyledTitle>
    </StyledContainer>
  );
};

const StyledContainer = styled.View<{ distanceFromTop: number }>`
  ${({ distanceFromTop }) => css`
    padding-top: ${Platform.OS === 'android'
      ? distanceFromTop + 30
      : distanceFromTop + 20}px;
  `};
  background-color: ${({ theme }) => theme.colors.MAIN};
  flex-direction: row;
  align-items: center;
  padding-bottom: 16px;
`;

const StyledTitle = styled(Text)`
  flex: 1;
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  padding-right: 72px;
`;

const StyledButtonBack = styled.TouchableOpacity`
  padding: 0 16px;
`;
