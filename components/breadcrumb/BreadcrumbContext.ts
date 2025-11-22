import React from 'react';

import type { SemanticClassNames, SemanticStyles } from '../_util/hooks';

export type SemanticName = 'root' | 'item' | 'separator';

export interface BreadcrumbContextProps {
  classNames?: SemanticClassNames<SemanticName>;
  styles?: SemanticStyles<SemanticName>;
}

const BreadcrumbContext = React.createContext<BreadcrumbContextProps>({});

export default BreadcrumbContext;
