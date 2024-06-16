import React from 'react';

import { NoFormStyle } from '../form/context';
import { NoCompactStyle } from '../space/Compact';

const InputAddon: React.FC<{ addon?: React.ReactNode }> = ({ addon }) => {
  if (!addon) {
    return null;
  }
  return (
    <NoCompactStyle>
      <NoFormStyle override status>
        {addon}
      </NoFormStyle>
    </NoCompactStyle>
  );
};

export default InputAddon;
