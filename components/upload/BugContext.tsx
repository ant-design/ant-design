import * as React from 'react';

// TODO: Remove in antd v5

export const BugContext = React.createContext<{
  unControlChange?: boolean;
}>({});

export interface BugContextProviderProps {
  children?: React.ReactNode;
}

/** @deprecated Make Upload temp ignore control status when `onChange` is trigger as `uploading` */
export default function BugContextProvider({ children }: BugContextProviderProps) {
  return <BugContext.Provider value={{ unControlChange: true }}>{children}</BugContext.Provider>;
}
