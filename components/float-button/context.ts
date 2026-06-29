import React from 'react';

import type { FloatButtonProps, FloatButtonShape } from './FloatButton';

export interface GroupContextProps {
  shape: FloatButtonShape;
  /** Current Buttons are in same container or individual */
  individual: boolean;
  /** FloatButton classNames */
  classNames?: FloatButtonProps['classNames'];
  /** FloatButton styles */
  styles?: FloatButtonProps['styles'];
}

export const GroupContext = React.createContext<GroupContextProps | null>(null);
