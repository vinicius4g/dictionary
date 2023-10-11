import React from 'react';

import { ThemeProvider } from 'styled-components/native';

import COLORS from '@styles/theme/colors';
import SIZING from '@styles/theme/sizing';

interface IPropsChildren {
  children: React.ReactNode;
}

const theme = {
  colors: {
    ...COLORS,
  },
  sizing: {
    ...SIZING,
  },
};

const Theme: React.FC<IPropsChildren> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
