import React from 'react';
import { ActivityIndicator, type TouchableOpacityProps } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { Text } from '@components/Text';

import IconPlayer from '@assets/svgs/icon-play.svg';
import IconPause from '@assets/svgs/icon-pause.svg';

type CoverProps = TouchableOpacityProps & {
  title: string;
  isLoading: boolean;
  isPlaying: boolean;
};

export const Cover = ({ title, isLoading, isPlaying, ...rest }: CoverProps) => {
  const theme = useTheme();

  return (
    <StyledContainer>
      <StyledContainerButtonPlay {...rest}>
        {isLoading ? (
          <ActivityIndicator color={theme.colors.BLACK_LIGHT} />
        ) : isPlaying ? (
          <IconPause />
        ) : (
          <IconPlayer />
        )}
      </StyledContainerButtonPlay>
      <StyledTitle>{title}</StyledTitle>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  height: 180px;
  width: 100%;
  padding: 8px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.BACKGROUND_OVERLAY};
  align-items: center;
  justify-content: center;
`;

const StyledContainerButtonPlay = styled.TouchableOpacity`
  height: 80px;
  width: 80px;
  border-radius: 40px;
  background-color: ${({ theme }) => theme.colors.SHAPE};
  margin-bottom: 8px;
  justify-content: center;
  align-items: center;
`;

const StyledTitle = styled(Text)`
  justify-content: flex-end;
  font-size: 24px;
  font-style: italic;
`;
