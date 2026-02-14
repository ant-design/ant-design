import React from 'react';
import useId from '@rc-component/util/lib/hooks/useId';
import useLayoutEffect from '@rc-component/util/lib/hooks/useLayoutEffect';

import ConfigProvider from '../../config-provider';
import ContextIsolator from '../ContextIsolator';

const DATA_PORTAL_OWNER = 'data-portal-owner';
/** Delay before removing portal div so close animation can finish. */
const PORTAL_REMOVE_DELAY = 300;
/** Delay before checking focus so blur/focus has settled (avoids race with child popups). */
const FOCUS_CHECK_DELAY = 20;

type RenderFunction<T extends unknown[]> = (...args: T) => React.ReactNode;

export interface UsePopupScopeOptions<T extends [React.ReactElement, ...unknown[]]> {
  popupRender?: RenderFunction<T>;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface UsePopupScopeResult<T extends [React.ReactElement, ...unknown[]]> {
  popupRender: ((...args: T) => React.ReactElement) | undefined;
  getPopupContainer: ((triggerNode: HTMLElement) => HTMLElement) | undefined;
  open: boolean | undefined;
  onPopupVisibleChange: ((open: boolean) => void) | undefined;
}

/**
 * With popupRender/dropdownRender: keeps dropdown open when focus moves to a child popup (e.g. DatePicker).
 * Returns open, getPopupContainer, onPopupVisibleChange for rc components.
 */
export const usePopupScope = <T extends [React.ReactElement, ...unknown[]]>(
  options: UsePopupScopeOptions<T> = {},
): UsePopupScopeResult<T> => {
  const { popupRender: renderFn, getPopupContainer, open: propsOpen, onOpenChange } = options;

  const portalId = useId();
  const portalRef = React.useRef<HTMLDivElement | null>(null);
  const removePortalTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const checkAndCloseTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const [internalOpen, setInternalOpen] = React.useState(false);
  const mergedOpen = propsOpen !== undefined ? propsOpen : internalOpen;
  const mergedOpenRef = React.useRef(mergedOpen);
  mergedOpenRef.current = mergedOpen; // Deferred callbacks (setTimeout) read latest open state

  const handleOpenChange = React.useCallback(
    (open: boolean) => {
      if (propsOpen === undefined) setInternalOpen(open);
      onOpenChange?.(open);
    },
    [propsOpen, onOpenChange],
  );

  const cancelAllTimers = React.useCallback(() => {
    if (checkAndCloseTimerRef.current) {
      clearTimeout(checkAndCloseTimerRef.current);
      checkAndCloseTimerRef.current = null;
    }
    if (removePortalTimerRef.current) {
      clearTimeout(removePortalTimerRef.current);
      removePortalTimerRef.current = null;
    }
  }, []);

  const clearPortal = React.useCallback(() => {
    cancelAllTimers();
    portalRef.current?.remove();
    portalRef.current = null;
  }, [cancelAllTimers]);

  useLayoutEffect(() => () => clearPortal(), [clearPortal]); // Sync cleanup on unmount

  // Div with data-portal-owner so dropdown + child popups (via ConfigProvider below) share one scope

  const mergedGetPopupContainer = React.useCallback(
    (triggerNode: HTMLElement) => {
      const parent = getPopupContainer?.(triggerNode) ?? document.body;
      if (portalRef.current && portalRef.current.parentNode !== parent) {
        clearPortal(); // Parent changed (e.g. getPopupContainer returns new node)
      }
      if (!portalRef.current) {
        const div = document.createElement('div');
        div.setAttribute(DATA_PORTAL_OWNER, portalId);
        parent.appendChild(div);
        portalRef.current = div;
      }
      return portalRef.current;
    },
    [getPopupContainer, portalId, clearPortal],
  );

  const getPortalContainer = React.useCallback(() => portalRef.current ?? document.body, []);

  // Child popups (DatePicker etc.) use ConfigProvider.getPopupContainer → same portal div. Form/Space isolated.
  const wrappedPopupRender = React.useMemo(() => {
    if (!renderFn) return undefined;
    return (...args: T) => (
      <ConfigProvider getPopupContainer={getPortalContainer}>
        <ContextIsolator form space>
          {renderFn(...args)}
        </ContextIsolator>
      </ConfigProvider>
    );
  }, [renderFn, getPortalContainer]);

  // On close: defer so blur/focus can settle (e.g. child DatePicker), then close only if focus left portal scope
  const handlePopupVisibleChange = React.useCallback(
    (open: boolean) => {
      if (open === false) {
        cancelAllTimers();
        const selector = `[${DATA_PORTAL_OWNER}="${portalId}"]`;
        const checkAndClose = () => {
          checkAndCloseTimerRef.current = null;
          const inPortal = document.activeElement?.closest?.(selector);
          if (inPortal) {
            // [Workaround] Re-open if focus is within scope.
            // Flicker is mostly imperceptible in modern browsers, but a fundamental fix
            // requires "prevent close" support in rc-trigger.
            if (!mergedOpenRef.current) handleOpenChange(true);
            return;
          }
          handleOpenChange(false);
          removePortalTimerRef.current = setTimeout(clearPortal, PORTAL_REMOVE_DELAY);
        };
        checkAndCloseTimerRef.current = setTimeout(checkAndClose, FOCUS_CHECK_DELAY);
        return;
      }
      cancelAllTimers();
      handleOpenChange(open);
    },
    [portalId, handleOpenChange, clearPortal, cancelAllTimers],
  );

  if (!renderFn) {
    // No custom popup: pass through and skip scope logic
    return {
      popupRender: undefined,
      getPopupContainer,
      open: propsOpen,
      onPopupVisibleChange: onOpenChange,
    };
  }

  return {
    popupRender: wrappedPopupRender,
    getPopupContainer: mergedGetPopupContainer,
    open: mergedOpen,
    onPopupVisibleChange: handlePopupVisibleChange,
  };
};
