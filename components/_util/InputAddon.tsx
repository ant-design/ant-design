import React from 'react';

import { NoFormStyle } from '../form/context';
import { NoCompactStyle } from '../space/Compact';

const InputAddon: React.FC<Readonly<React.PropsWithChildren>> = ({ children }) => {
  if (!children) {
    return null;
  }
  return (
    <NoCompactStyle>
      <NoFormStyle override status>
        {children}
      </NoFormStyle>
    </NoCompactStyle>
  );
};

export default InputAddon;
