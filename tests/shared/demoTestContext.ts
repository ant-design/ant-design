/* eslint-disable import/prefer-default-export */
import type { TriggerProps } from '@rc-component/trigger';
import * as React from 'react';

// We export context here is to avoid testing-lib inject `afterEach` in `tests/index.test.js`
// Which breaks the circle deps
export const TriggerMockContext = React.createContext<
  | (Partial<TriggerProps> & {
      mock?: boolean;
    })
  | undefined
>(undefined);
