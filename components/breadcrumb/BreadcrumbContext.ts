import React from 'react';

import type { BreadcrumbSemanticClassNames, BreadcrumbSemanticStyles } from './Breadcrumb';

export interface BreadcrumbContextProps {
  classNames?: BreadcrumbSemanticClassNames;
  styles?: BreadcrumbSemanticStyles;
}

const BreadcrumbContext = React.createContext<BreadcrumbContextProps>({});

export default BreadcrumbContext;
