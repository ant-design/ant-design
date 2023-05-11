import * as React from 'react';
import useSize from '../_util/hooks/useSize';

export type SizeType = 'small' | 'middle' | 'large' | undefined;

const SizeContext = React.createContext<SizeType>(undefined);

export interface SizeContextProps {
  size?: SizeType;
  children?: React.ReactNode;
}

export const SizeContextProvider: React.FC<SizeContextProps> = ({ children, size }) => {
  const mergeSize = useSize(size);
  return <SizeContext.Provider value={mergeSize}>{children}</SizeContext.Provider>;
};

export default SizeContext;
