import type { DirectionType } from 'antd/es/config-provider';
import * as React from 'react';

export interface SiteContextProps {
  isMobile: boolean;
  direction: DirectionType;
  theme?: string;
  setTheme?: (theme: string, persist?: boolean) => void;
  setIframeTheme?: (iframeNode: HTMLIFrameElement, theme: string) => void;
}

const SiteContext = React.createContext<SiteContextProps>({
  isMobile: false,
  direction: 'ltr',
});

export default SiteContext;
