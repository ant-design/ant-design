import { createContext } from 'react';

export type DemoContextProps = {
  showDebug?: boolean;
  codeType?: string;
};

const DemoContext = createContext<{
  showDebug?: boolean;
  setShowDebug?: (showDebug: boolean) => void;
  codeType?: string;
  setCodeType?: (codeType: string) => void;
}>({});

export default DemoContext;
