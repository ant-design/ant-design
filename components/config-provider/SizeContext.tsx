import * as React from 'react';

export type SizeType = 'small' | 'default' | 'large';

export interface sizeContextProps {
  size?: SizeType;
}

const SizeContext = React.createContext<sizeContextProps>({});

export const SizeContextProvider: React.FC<sizeContextProps> = ({ children, size }) => (
  <SizeContext.Consumer>
    {sizeProps => {
      const mergedProps = { ...sizeProps };
      if (size) {
        mergedProps.size = size;
      }

      return <SizeContext.Provider value={mergedProps}>{children}</SizeContext.Provider>;
    }}
  </SizeContext.Consumer>
);

export default SizeContext;
