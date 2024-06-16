import React from 'react';

import { NoFormStyle } from '../form/context';
import { NoCompactStyle } from '../space/Compact';

const getInputAddon = (addon: React.ReactNode): React.ReactNode => {
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

export default getInputAddon;
