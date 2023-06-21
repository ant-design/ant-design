import * as React from 'react';
import type { AntAnchor } from './Anchor';

const AnchorContext = React.createContext<AntAnchor | undefined>(undefined);

export default AnchorContext;
