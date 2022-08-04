import * as React from 'react';
import type { DirectionType } from 'antd/es/config-provider';

export interface SiteContextProps {
  isMobile: boolean;
  direction: DirectionType;
}

const SiteContext = React.createContext<SiteContextProps>({
  isMobile: false,
  direction: 'ltr',
});

export default SiteContext;
