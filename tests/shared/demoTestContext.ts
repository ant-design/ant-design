import React from 'react';
import type { TriggerProps } from '@rc-component/trigger';

interface TriggerMockContextValue extends Partial<TriggerProps> {
  mock?: boolean;
}

// We export context here is to avoid testing-lib inject `afterEach` in `tests/index.test.js`
// Which breaks the circle deps
export const TriggerMockContext = React.createContext<TriggerMockContextValue>({});
