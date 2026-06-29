import type React from 'react';
import { useLayoutEffect, useState } from 'react';

const ClientOnly: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [clientReady, setClientReady] = useState<boolean>(false);

  useLayoutEffect(() => {
    setClientReady(true);
  }, []);

  return clientReady ? (children as React.ReactElement) : null;
};

export default ClientOnly;
