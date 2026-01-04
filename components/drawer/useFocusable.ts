import { useMemo } from 'react';

export type OmitFocusType = 'autoFocusButton' | 'focusTriggerAfterClose' | 'focusTrap';

export interface FocusableConfig {
  autoFocusButton?: 'ok' | 'cancel' | false;
  focusTriggerAfterClose?: boolean;
  trap?: boolean;
}

export default function useFocusable(focusable?: FocusableConfig, defaultTrap?: boolean) {
  return useMemo(() => {
    const ret = {
      trap: defaultTrap ?? true,
      focusTriggerAfterClose: true,
      ...focusable,
    };

    return ret;
  }, [focusable, defaultTrap]);
}
