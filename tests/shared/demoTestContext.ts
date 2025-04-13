import * as React from 'react';
import type { TriggerProps } from '@rc-component/trigger';

// We export context here is to avoid testing-lib inject `afterEach` in `tests/index.test.js`
// Which breaks the circle deps
export const TriggerMockContext = React.createContext<
  | (Partial<TriggerProps> & {
      mock?: boolean;
    })
  | undefined
>(undefined);
