import * as React from 'react';
import useSize from './hooks/useSize';

export type SizeType = 'small' | 'middle' | 'large' | undefined;

const SizeContext = React.createContext<SizeType>(undefined);

export interface SizeContextProps {
  size?: SizeType;
  children?: React.ReactNode;
}

export const SizeContextProvider: React.FC<SizeContextProps> = ({ children, size }) => {
  const mergedSize = useSize(size);
  return <SizeContext.Provider value={mergedSize}>{children}</SizeContext.Provider>;
};

export default SizeContext;
