import { type SvgProps } from 'react-native-svg';

export type IconSVGProps = SvgProps & {
  width: number;
  height: number;
  fill: string;
};

export * from '@assets/svgs/bottom-tab/IconHome';
export * from '@assets/svgs/bottom-tab/IconHistory';
export * from '@assets/svgs/bottom-tab/IconFavorite';
