import React from 'react';

export type SemanticName = 'root' | 'item' | 'separator';
export interface BreadcrumbContextProps {
  styles?: Partial<Record<SemanticName, React.CSSProperties>>;
  classNames?: Partial<Record<SemanticName, string>>;
}

const BreadcrumbContext = React.createContext<BreadcrumbContextProps>({});

export default BreadcrumbContext;
