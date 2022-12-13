import * as React from 'react';
import type { Options } from 'scroll-into-view-if-needed';

export type ScrollErrorType = boolean | Options;

const ScrollErrorContext = React.createContext<ScrollErrorType>(false);

export interface ScrollErrorContextProps {
  scrollToFirstError?: ScrollErrorType;
  children?: React.ReactNode;
}

export const ScrollErrorContextProvider: React.FC<ScrollErrorContextProps> = ({
  children,
  scrollToFirstError,
}) => (
  <ScrollErrorContext.Consumer>
    {(originScrollToFirstError) => (
      <ScrollErrorContext.Provider value={scrollToFirstError || originScrollToFirstError}>
        {children}
      </ScrollErrorContext.Provider>
    )}
  </ScrollErrorContext.Consumer>
);

export default ScrollErrorContext;
