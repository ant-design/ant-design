import { createContext } from 'react';

export type DemoContextProps = {
  showDebug?: boolean;
};

const DemoContext = createContext<{
  showDebug?: boolean;
  setShowDebug?: (showDebug: boolean) => void;
  debugDemos?: string[];
  setDebugDemos?: (visibleItems: string[]) => void;
}>({});

export default DemoContext;
