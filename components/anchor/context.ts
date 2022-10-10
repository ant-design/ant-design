import * as React from 'react';
import type { AntAnchor } from './Anchor';

const AnchorContext = React.createContext<AntAnchor | null>(null);

export default AnchorContext;
