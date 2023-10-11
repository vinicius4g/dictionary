import React from 'react';
import { type TouchableOpacityProps } from 'react-native';
import styled, { css, useTheme } from 'styled-components/native';

import { Text } from '@components/Text';

import IconArrow from '@assets/svgs/icon-arrowRight.svg';
import { IconFavorite } from '@assets/svgs/bottom-tab/IconFavorite';

type CardCalculatorProps = TouchableOpacityProps & {
  name: string;
  onPressFavorite: () => void;
  isFavorite: boolean;
};

const CardWordComponent = ({
  name,
  onPressFavorite,
  isFavorite,
  ...rest
}: CardCalculatorProps) => {
  const theme = useTheme();

  const handleButtonFavorite = () => {
    onPressFavorite();
  };

  const fillIconFavorite = isFavorite ? theme.colors.ALERT : 'none';
  const strokeIconFavorite = isFavorite ? 'none' : theme.colors.BLACK_LIGHT;

  return (
    <StyledContainer {...rest} activeOpacity={0.7}>
      <StyledBox>
        <StyledButtonFavorite
          activeOpacity={0.7}
          onPress={handleButtonFavorite}
        >
          <IconFavorite
            fill={fillIconFavorite}
            stroke={strokeIconFavorite}
            width={24}
            height={24}
            strokeWidth={1.8}
          />
        </StyledButtonFavorite>

        <StyledTitle>{name}</StyledTitle>
      </StyledBox>
      <StyledBoxArrow>
        <IconArrow />
      </StyledBoxArrow>
    </StyledContainer>
  );
};

const StyledContainer = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  height: 72px;
  justify-content: space-between;
  ${({ theme }) => css`
    background-color: ${theme.colors.BACKGROUND};
    border: 1px solid ${theme.colors.WHITE_GRAY_DARK};
  `};
  border-radius: 10px;
  elevation: 6;
  shadow-color: ${({ theme }) => theme.colors.BLACK};
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  shadow-offset: 0px 2px;
`;

const StyledButtonFavorite = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding: 0 32px;
`;

const StyledBox = styled.View`
  flex-direction: row;
`;

const StyledTitle = styled(Text)`
  align-self: center;
`;

const StyledBoxArrow = styled.View`
  justify-content: center;
  padding-right: 16px;
`;

export const CardWord = React.memo(
  CardWordComponent,
  (prevProps, nextProps) => {
    return Object.is(prevProps, nextProps);
  },
);
