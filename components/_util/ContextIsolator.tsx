import React from 'react';

import { NoFormStyle } from '../form/context';
import { NoCompactStyle } from '../space/Compact';

const ContextIsolator: React.FC<Readonly<React.PropsWithChildren>> = ({ children }) =>
  children ? (
    <NoCompactStyle>
      <NoFormStyle override status>
        {children}
      </NoFormStyle>
    </NoCompactStyle>
  ) : null;

if (process.env.NODE_ENV !== 'production') {
  ContextIsolator.displayName = 'ContextIsolator';
}

export default ContextIsolator;
