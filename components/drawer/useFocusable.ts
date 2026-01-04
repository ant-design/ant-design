import { useMemo } from 'react';

export type OmitFocusType = 'autoFocusButton' | 'focusTriggerAfterClose' | 'focusTrap';

export interface FocusableConfig {
  autoFocusButton?: 'ok' | 'cancel' | false;
  focusTriggerAfterClose?: boolean;
  trap?: boolean;
}

export default function useFocusable(
  focusable?: FocusableConfig,
  defaultTrap?: boolean,
  autoFocusButton?: 'ok' | 'cancel' | false,
  focusTriggerAfterClose?: boolean,
) {
  return useMemo(
    () => ({
      trap: defaultTrap ?? true,
      autoFocusButton: autoFocusButton ?? 'ok',
      focusTriggerAfterClose: focusTriggerAfterClose ?? true,
      ...focusable,
    }),
    [focusable, autoFocusButton, focusTriggerAfterClose, defaultTrap],
  );
}
