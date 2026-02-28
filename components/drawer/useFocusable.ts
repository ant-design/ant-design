import { useMemo } from 'react';

export type OmitFocusType = 'focusTriggerAfterClose' | 'focusTrap' | 'autoFocusButton';

export interface FocusableConfig {
  focusTriggerAfterClose?: boolean;
  trap?: boolean;
}

export default function useFocusable(
  focusable?: FocusableConfig,
  defaultTrap?: boolean,
  legacyFocusTriggerAfterClose?: FocusableConfig['focusTriggerAfterClose'],
) {
  return useMemo(() => {
    const ret: FocusableConfig = {
      trap: defaultTrap ?? true,
      focusTriggerAfterClose: legacyFocusTriggerAfterClose ?? true,
    };

    return {
      ...ret,
      ...focusable,
    };
  }, [focusable, defaultTrap, legacyFocusTriggerAfterClose]);
}
