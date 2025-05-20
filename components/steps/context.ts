import * as React from 'react';

export interface InternalContextProps {
  /**
   * Current Steps is wrap by other component. e.g. Timeline
   * So we should not add context classNames and styles
   */
  wrap?: boolean;
}

export const InternalContext = React.createContext<InternalContextProps>({});
