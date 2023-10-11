import React from 'react';
import styled, { css } from 'styled-components/native';

import { Text } from '@components/Text';

type FooterProps = {
  onPressNext: () => void;
  onPressPrevious: () => void;
};

export const Footer = ({ onPressNext, onPressPrevious }: FooterProps) => {
  const handleButtonPrevious = () => {
    onPressPrevious();
  };

  const handleButtonNext = () => {
    onPressNext();
  };

  return (
    <StyledContainer>
      <StyledButton
        onPress={handleButtonPrevious}
        marginRight={8}
        activeOpacity={0.5}
      >
        <StyledTitleButton>Previous</StyledTitleButton>
      </StyledButton>
      <StyledButton
        onPress={handleButtonNext}
        marginRight={0}
        activeOpacity={0.5}
      >
        <StyledTitleButton>Next</StyledTitleButton>
      </StyledButton>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  height: 54px;
  width: 90%;
  align-self: center;
  justify-content: space-between;
  flex-direction: row;
`;

const StyledButton = styled.TouchableOpacity<{ marginRight: number }>`
  flex: 1;
  align-items: center;
  justify-content: center;
  ${({ marginRight, theme }) => css`
    margin-right: ${marginRight}px;
    border: 2px solid ${theme.colors.BACKGROUND_OVERLAY};
  `}
  border-radius: 16px;
`;

const StyledTitleButton = styled(Text)`
  font-size: 24px;
`;
