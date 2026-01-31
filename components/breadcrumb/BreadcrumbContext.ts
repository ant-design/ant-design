import React from 'react';

import type { BreadcrumbSemanticType } from './Breadcrumb';

export interface BreadcrumbContextProps {
  classNames?: BreadcrumbSemanticType['classNames'];
  styles?: BreadcrumbSemanticType['styles'];
}

const BreadcrumbContext = React.createContext<BreadcrumbContextProps>({});

export default BreadcrumbContext;
