import React from 'react';
import { AntAnchor } from './Anchor';

const AnchorContext = React.createContext<AntAnchor>({
  registerLink: () => {},
  unregisterLink: () => {},
  activeLink: null,
  scrollTo: () => {},
  onClick: () => {},
});

export default AnchorContext;
