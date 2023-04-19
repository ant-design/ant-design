import type { ReactElement, ReactNode } from 'react';
import { useLayoutEffect, useState } from 'react';

export type ClientOnlyProps = {
  children: ReactNode;
};

const ClientOnly = ({ children }: ClientOnlyProps) => {
  const [clientReady, setClientReady] = useState<boolean>(false);

  useLayoutEffect(() => {
    setClientReady(true);
  }, []);

  return clientReady ? (children as ReactElement) : null;
};

export default ClientOnly;
