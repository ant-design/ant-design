import * as React from 'react';

export interface SiteContextProps {
  isMobile: boolean;
}

const SiteContext = React.createContext<SiteContextProps>({
  isMobile: false,
});

export default SiteContext;
