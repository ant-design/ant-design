import * as React from 'react';

export interface InternalContextProps {
  rootComponent: string;
  itemComponent: string;
}

/**
 * When use this context. Will trade as sub component instead of root Steps component.
 */
export const InternalContext = React.createContext<InternalContextProps | null>(null);
