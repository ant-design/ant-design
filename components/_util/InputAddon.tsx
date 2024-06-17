import React from 'react';

import { NoFormStyle } from '../form/context';
import { NoCompactStyle } from '../space/Compact';

const getInputAddon = (addon: React.ReactNode): React.ReactNode =>
  addon ? (
    <NoCompactStyle>
      <NoFormStyle override status>
        {addon}
      </NoFormStyle>
    </NoCompactStyle>
  ) : null;

export default getInputAddon;
