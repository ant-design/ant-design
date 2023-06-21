import { createContext } from 'react';

export type DemoContextProps = {
  showDebug?: boolean;
};

const DemoContext = createContext<{
  showDebug?: boolean;
  setShowDebug?: (showDebug: boolean) => void;
}>({});

export default DemoContext;
