import React from 'react';

import type { FloatButtonShape } from './FloatButton';

export interface GroupContextProps {
  shape: FloatButtonShape;
  /** Current Buttons are in same container or individual */
  individual: boolean;
}

export const GroupContext = React.createContext<GroupContextProps | null>(null);
