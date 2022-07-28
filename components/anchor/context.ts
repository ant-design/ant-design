import * as React from 'react';
import type { AntAnchor } from './Anchor';

const AnchorContext = React.createContext<AntAnchor>(null as any);

export default AnchorContext;
