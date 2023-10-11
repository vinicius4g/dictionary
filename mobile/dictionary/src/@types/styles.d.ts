import 'styled-components';

import type COLORS from '@styles/theme/colors';
import type SIZING from '@styles/theme/sizing';

declare module 'styled-components' {
  type COLOR_TYPE = typeof COLORS;
  type SIZING_TYPE = typeof SIZING;

  export interface DefaultTheme {
    colors: COLOR_TYPE;
    sizing: SIZING_TYPE;
  }
}
