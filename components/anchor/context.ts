import * as React from 'react';
import { AntAnchor } from './Anchor';

const AnchorContext = React.createContext<AntAnchor>(null as any);

export default AnchorContext;
