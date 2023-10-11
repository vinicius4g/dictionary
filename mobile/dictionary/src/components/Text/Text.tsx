import React from 'react';
import { type TextProps } from 'react-native';

import styled, { css } from 'styled-components/native';

import { type COLOR_TYPE } from '@styles/theme/colors';
import { type SIZING_TYPE } from '@styles/theme/sizing';

interface ICustomTextProps extends TextProps {
  color?: keyof COLOR_TYPE;
  sizing?: keyof SIZING_TYPE;
}

export interface ITextInterface extends TextProps, ICustomTextProps {
  children: string | React.ReactNode;
}

const Text = React.memo(function TextCustom({
  children,
  ...rest
}: ITextInterface) {
  return <StyledText {...rest}>{children}</StyledText>;
});

const StyledText = styled.Text<ICustomTextProps>`
  ${({ theme, color = 'BLACK_LIGHT', sizing = 'SMALLER' }) => css`
    color: ${theme.colors[color]};
    font-size: ${theme.sizing[sizing]}px;
  `}
`;

export { Text };
