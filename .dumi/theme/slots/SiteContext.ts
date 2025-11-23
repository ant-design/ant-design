import * as React from 'react';
import type { DirectionType } from 'antd/es/config-provider';

import type { ConfigComponentProps } from '../../../components/config-provider/context';
import { getBannerData } from '../../pages/index/components/util';
import type { ThemeName } from '../common/ThemeSwitch';

export type SimpleComponentClassNames = Partial<
  Record<keyof ConfigComponentProps, Record<string, string>>
>;

export interface SiteContextProps {
  isMobile: boolean;
  bannerVisible: boolean;
  direction: DirectionType;
  theme: ThemeName[];
  // 主题存在跟随系统模式，解耦实际生效主题
  // 应使用isDark而非theme.includes('dark')等来判断当前主题
  isDark: boolean;
  updateSiteConfig: (props: Partial<SiteContextProps>) => void;

  dynamicTheme?: {
    algorithm?: 'light' | 'dark';
    token: Record<string, string | number>;
  } & SimpleComponentClassNames;
}

const SiteContext = React.createContext<SiteContextProps>({
  isMobile: false,
  bannerVisible: !!getBannerData(),
  direction: 'ltr',
  theme: ['light'],
  isDark: false,
  updateSiteConfig: () => {},
});

export default SiteContext;
