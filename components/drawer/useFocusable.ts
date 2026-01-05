import { useMemo } from 'react';

export type OmitFocusType = 'focusTriggerAfterClose' | 'focusTrap';

export interface FocusableConfig {
  focusTriggerAfterClose?: boolean;
  trap?: boolean;
}

export default function useFocusable(
  focusable?: FocusableConfig,
  defaultTrap?: boolean,
  legacyFocusTriggerAfterClose?: boolean,
) {
  return useMemo(() => {
    const ret = {
      trap: defaultTrap ?? true,
      focusTriggerAfterClose: legacyFocusTriggerAfterClose ?? true,
      ...focusable,
    };

    return ret;
  }, [focusable, defaultTrap, legacyFocusTriggerAfterClose]);
}
