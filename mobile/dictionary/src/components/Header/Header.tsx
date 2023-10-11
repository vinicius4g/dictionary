import React from 'react';
import { Platform, type TextInputProps } from 'react-native';
import Animated, { FlipInXDown } from 'react-native-reanimated';
import styled, { css } from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@components/Text';
import { InputSearch } from '@components/Input';

import IconSearch from '@assets/svgs/icon-search.svg';
import IconLogout from '@assets/svgs/icon-logout.svg';

type HeaderProps = TextInputProps & {
  title: string;
  username?: string;
  onPressIconSearch: () => void;
  onPressIconClose: () => void;
  onPressLogout: () => void;
};

export const Header = ({
  title,
  username,
  onPressIconSearch,
  onPressIconClose,
  onPressLogout,
  ...rest
}: HeaderProps) => {
  const insets = useSafeAreaInsets();

  const handleButtonLogout = () => {
    onPressLogout();
  };

  return (
    <StyledContainer distanceFromTop={insets.top}>
      <StyledContainerInfos>
        <StyledContainerPrimaryInfos>
          <StyledTitle>{title}</StyledTitle>
          {username && <StyledSubTitle>{`Welcome ${username}`}</StyledSubTitle>}
        </StyledContainerPrimaryInfos>

        <StyledButtonLogout onPress={handleButtonLogout} activeOpacity={0.5}>
          <IconLogout />
        </StyledButtonLogout>
      </StyledContainerInfos>

      <StyledContainerInput entering={FlipInXDown.duration(1200)}>
        <InputSearch
          textAlign="center"
          icon={<IconSearch />}
          onPressIconSearch={onPressIconSearch}
          onPressIconClose={onPressIconClose}
          {...rest}
        />
      </StyledContainerInput>
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
  padding-bottom: 56px;
  margin-bottom: 52px;
`;

const StyledContainerInfos = styled(Animated.View)`
  flex-direction: row;
  justify-content: space-between;
  padding: 0 24px;
`;

const StyledContainerPrimaryInfos = styled(Animated.View)``;

const StyledTitle = styled(Text)`
  font-size: 28px;

  font-style: italic;
  font-weight: bold;
`;

const StyledSubTitle = styled(Text)`
  font-size: 14px;
  font-weight: bold;
`;

const StyledContainerInput = styled(Animated.View)`
  width: 80%;
  left: 10%;
  position: absolute;
  bottom: -27px;
`;

const StyledButtonLogout = styled.TouchableOpacity.attrs({
  hitSlop: { top: 8, bottom: 8, left: 8, right: 16 },
})`
  justify-content: center;
`;
