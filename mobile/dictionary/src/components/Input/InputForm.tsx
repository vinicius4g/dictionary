import React, { forwardRef } from 'react';
import { TextInput, type TextInputProps } from 'react-native';
import styled, { css, useTheme } from 'styled-components/native';

type InputProps = TextInputProps & {
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  onPressIcon?: () => void;
  hasError: boolean;
};

const InputComponent = (
  { iconLeft, iconRight, onPressIcon, hasError, ...rest }: InputProps,
  ref: React.Ref<TextInput>,
) => {
  const theme = useTheme();

  const handleIcon = () => {
    onPressIcon?.();
  };

  return (
    <StyledContainerInput hasError={hasError}>
      {iconLeft && (
        <StyledContainerPrimaryIcon>{iconLeft}</StyledContainerPrimaryIcon>
      )}

      <StyledContainer
        ref={ref}
        placeholderTextColor={theme.colors.BODY_LIGHT}
        {...rest}
      />
      <StyledContainerIcon onPress={handleIcon}>
        {iconRight}
      </StyledContainerIcon>
    </StyledContainerInput>
  );
};

const InputForm = forwardRef(InputComponent);

const StyledContainerInput = styled.View<{ hasError: boolean }>`
  flex-direction: row;
  width: 100%;
  height: 52px;
  border-radius: 8px;
  font-size: 14px;

  ${({ theme, hasError }) => css`
    background-color: ${theme.colors.BACKGROUND};
    border: 1px solid
      ${hasError ? theme.colors.ALERT : theme.colors.WHITE_GRAY_DARK};
  `};
`;

const StyledContainerPrimaryIcon = styled.View`
  align-items: center;
  justify-content: center;
  margin-left: 16px;
`;

const StyledContainer = styled(TextInput).attrs<InputProps>(({ theme }) => ({
  placeholderTextColor: theme.colors.BODY_LIGHT,
}))`
  flex: 1;

  ${({ theme }) => css`
    color: ${theme.colors.HEADING};
    font-size: ${theme.sizing.MINOR}px;
  `};
  padding-left: 16px;
  padding-right: 8px;
  border-right-color: ${({ theme }) => theme.colors.WHITE_GRAY_DARK};
`;

const StyledContainerIcon = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: 0 24px;
`;

export { InputForm };
