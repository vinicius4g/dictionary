import React from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';
import styled from 'styled-components/native';

import { Text } from '@components/Text';

export const ListEmpty = () => {
  return (
    <StyledContainer entering={FadeIn.duration(2000)}>
      <StyledTitle>Ops 🧐!{'\n'}Nothing to show for now.</StyledTitle>
    </StyledContainer>
  );
};

const StyledContainer = styled(Animated.View)`
  padding: 8px;
  align-items: center;
  justify-content: center;
`;

const StyledTitle = styled(Text)`
  justify-content: flex-end;
  font-size: 20px;
  font-style: italic;
  text-align: center;
`;
