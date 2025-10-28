import * as React from 'react';
import type { DirectionType } from 'antd/es/config-provider';

import type { ThemeName } from '../common/ThemeSwitch';
import { getBannerData } from '../../pages/index/components/util';

export interface SiteContextProps {
  isMobile: boolean;
  bannerVisible: boolean;
  direction: DirectionType;
  theme: ThemeName[];
  updateSiteConfig: (props: Partial<SiteContextProps>) => void;
}

const SiteContext = React.createContext<SiteContextProps>({
  isMobile: false,
  bannerVisible: !!getBannerData(),
  direction: 'ltr',
  theme: ['light'],
  updateSiteConfig: () => {},
});

export default SiteContext;
