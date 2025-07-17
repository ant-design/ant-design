import * as React from 'react';
import type { DirectionType } from 'antd/es/config-provider';

import type { ConfigComponentProps } from '../../../components/config-provider/context';
import type { ThemeName } from '../common/ThemeSwitch';

export type SimpleComponentClassNames = Partial<
  Record<keyof ConfigComponentProps, Record<string, string>>
>;

export interface SiteContextProps {
  isMobile: boolean;
  bannerVisible: boolean;
  direction: DirectionType;
  theme: ThemeName[];
  updateSiteConfig: (props: Partial<SiteContextProps>) => void;

  dynamicTheme?: {
    algorithm?: 'light' | 'dark';
    token: Record<string, string | number>;
  } & SimpleComponentClassNames;
}

const SiteContext = React.createContext<SiteContextProps>({
  isMobile: false,
  bannerVisible: false,
  direction: 'ltr',
  theme: ['light'],
  updateSiteConfig: () => {},
});

export default SiteContext;
