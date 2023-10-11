import React, { forwardRef } from 'react';
import { TextInput, type TextInputProps } from 'react-native';
import styled, { css, useTheme } from 'styled-components/native';

import IconClose from '@assets/svgs/icon-close.svg';

type InputProps = TextInputProps & {
  icon?: JSX.Element;
  onPressIconSearch: () => void;
  onPressIconClose: () => void;
};

const InputComponent = (
  { icon, onPressIconSearch, onPressIconClose, ...rest }: InputProps,
  ref: React.Ref<TextInput>,
) => {
  const theme = useTheme();

  const handleButtonSearch = () => {
    onPressIconSearch();
  };

  const handleButtonClose = () => {
    onPressIconClose();
  };

  return (
    <StyledContainerInput>
      <StyledContainer
        ref={ref}
        placeholderTextColor={theme.colors.BODY_LIGHT}
        {...rest}
      />
      <StyledButtonClose activeOpacity={0.5} onPress={handleButtonClose}>
        <IconClose />
      </StyledButtonClose>

      <StyledButtonIconSearch activeOpacity={0.5} onPress={handleButtonSearch}>
        {icon}
      </StyledButtonIconSearch>
    </StyledContainerInput>
  );
};

const InputSearch = forwardRef(InputComponent);

const StyledContainerInput = styled.View`
  flex-direction: row;
  width: 100%;
  height: 52px;
  border-radius: 8px;
  font-size: 14px;

  ${({ theme }) => css`
    background-color: ${theme.colors.BACKGROUND};
    border: 1px solid ${theme.colors.WHITE_GRAY_DARK};
  `};
`;

const StyledContainer = styled(TextInput).attrs<InputProps>(({ theme }) => ({
  placeholderTextColor: theme.colors.BODY_LIGHT,
}))`
  flex: 1;

  ${({ theme }) => css`
    color: ${theme.colors.HEADING};
    font-size: ${theme.sizing.MINOR}px;
  `};
  padding-left: 24px;
  padding-right: 8px;
  justify-content: center;
  align-items: center;
`;

const StyledButtonIconSearch = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  border-left-width: 1px;
  border-left-color: ${({ theme }) => theme.colors.WHITE_GRAY_DARK};
`;

const StyledButtonClose = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding-right: 16px;
`;

export { InputSearch };
