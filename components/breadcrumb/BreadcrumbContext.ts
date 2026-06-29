import React from 'react';

import type { BreadcrumbSemanticAllType } from './Breadcrumb';

export interface BreadcrumbContextProps {
  classNames?: BreadcrumbSemanticAllType['classNames'];
  styles?: BreadcrumbSemanticAllType['styles'];
}

const BreadcrumbContext = React.createContext<BreadcrumbContextProps>({});

export default BreadcrumbContext;
