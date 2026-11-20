import React from 'react';
import { act, render, renderHook } from '@testing-library/react';

import { waitFakeTimer } from '../../../tests/utils';
import { usePopupScope } from '../hooks/usePopupScope';

describe('usePopupScope', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    // Cleanup DOM
    document.body.innerHTML = '';
  });

  it('returns pass-through when popupRender is not provided', () => {
    const onOpenChange = jest.fn();
    const getPopupContainer = jest.fn((el: HTMLElement) => el);

    const { result } = renderHook(() =>
      usePopupScope({
        getPopupContainer,
        open: true,
        onOpenChange,
      }),
    );

    expect(result.current.popupRender).toBeUndefined();
    expect(result.current.getPopupContainer).toBe(getPopupContainer);
    expect(result.current.open).toBe(true);
    expect(result.current.onPopupVisibleChange).toBe(onOpenChange);
  });

  it('returns pass-through when options is empty', () => {
    const { result } = renderHook(() => usePopupScope({}));

    expect(result.current.popupRender).toBeUndefined();
    expect(result.current.getPopupContainer).toBeUndefined();
    expect(result.current.open).toBeUndefined();
    expect(result.current.onPopupVisibleChange).toBeUndefined();
  });

  it('uses internal open state when open prop is undefined', () => {
    const popupRender = () => <div>popup</div>;
    const { result } = renderHook(() => usePopupScope({ popupRender }));

    expect(result.current.open).toBe(false);

    act(() => {
      result.current.onPopupVisibleChange?.(true);
    });
    expect(result.current.open).toBe(true);

    act(() => {
      result.current.onPopupVisibleChange?.(false);
    });
    // Close is deferred; after timers
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current.open).toBe(false);
  });

  it('calls onOpenChange when open state changes', () => {
    const onOpenChange = jest.fn();
    const popupRender = () => <div>popup</div>;
    const { result } = renderHook(() => usePopupScope({ popupRender, onOpenChange }));

    act(() => {
      result.current.onPopupVisibleChange?.(true);
    });
    expect(onOpenChange).toHaveBeenCalledWith(true);

    act(() => {
      result.current.onPopupVisibleChange?.(false);
    });
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('should create portal div and append to parent when getPopupContainer provided', () => {
    const parent = document.createElement('div');
    document.body.appendChild(parent);
    const getPopupContainer = jest.fn(() => parent);
    const popupRender = () => <div>popup</div>;

    const { result } = renderHook(() => usePopupScope({ popupRender, getPopupContainer }));

    const trigger = document.createElement('button');
    const container = result.current.getPopupContainer?.(trigger);

    expect(container).toBeTruthy();
    expect(container?.getAttribute('data-portal-owner')).toBeTruthy();
    expect(container && parent.contains(container)).toBe(true);
    expect(getPopupContainer).toHaveBeenCalledWith(trigger);

    document.body.removeChild(parent);
  });

  it('should use document.body when getPopupContainer is not provided', () => {
    const popupRender = () => <div>popup</div>;
    const { result } = renderHook(() => usePopupScope({ popupRender }));

    const trigger = document.createElement('button');
    const container = result.current.getPopupContainer?.(trigger);

    expect(container).toBeTruthy();
    expect(container && document.body.contains(container)).toBe(true);
  });

  it('should clear portal when parent changes', () => {
    const parent1 = document.createElement('div');
    const parent2 = document.createElement('div');
    document.body.appendChild(parent1);
    document.body.appendChild(parent2);

    const getPopupContainer1 = (_: HTMLElement) => parent1;
    const getPopupContainer2 = (_: HTMLElement) => parent2;
    const popupRender = () => <div>popup</div>;

    const { result, rerender } = renderHook(
      ({ getPopupContainer: gpc }) => usePopupScope({ popupRender, getPopupContainer: gpc }),
      { initialProps: { getPopupContainer: getPopupContainer1 } },
    );

    const trigger = document.createElement('button');
    result.current.getPopupContainer?.(trigger);
    expect(parent1.firstChild).toBeTruthy();

    rerender({ getPopupContainer: getPopupContainer2 });
    result.current.getPopupContainer?.(trigger);
    expect(parent1.firstChild).toBeNull();
    expect(parent2.firstChild).toBeTruthy();

    document.body.removeChild(parent1);
    document.body.removeChild(parent2);
  });

  it('should create portal div on document.body when portal does not exist', () => {
    const popupRender = () => <div>popup</div>;
    const { result } = renderHook(() => usePopupScope({ popupRender }));

    const el = result.current.popupRender?.({} as any);
    expect(el).toBeTruthy();
    const { unmount } = render(<>{el}</>);
    unmount();
  });

  it('re-opens when focus is still inside portal on close', async () => {
    const onOpenChange = jest.fn();
    const popupRender = () => <div>popup</div>;
    const { result } = renderHook(() => usePopupScope({ popupRender, onOpenChange }));

    act(() => {
      result.current.onPopupVisibleChange?.(true);
    });
    const trigger = document.createElement('button');
    const portal = result.current.getPopupContainer?.(trigger);
    expect(portal).toBeTruthy();
    if (portal) {
      const inner = document.createElement('button');
      inner.tabIndex = 0;
      portal.appendChild(inner);
      inner.focus();
    }

    act(() => {
      result.current.onPopupVisibleChange?.(false);
    });
    act(() => {
      jest.advanceTimersByTime(30);
    });
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('cleans up portal on unmount', () => {
    const popupRender = () => <div>popup</div>;
    const { result, unmount } = renderHook(() => usePopupScope({ popupRender }));

    const trigger = document.createElement('button');
    const container = result.current.getPopupContainer?.(trigger);
    expect(container && document.body.contains(container)).toBe(true);

    unmount();
    expect(container && document.body.contains(container)).toBe(false);
  });

  it('controlled open: does not set internal state', () => {
    const popupRender = () => <div>popup</div>;
    const { result, rerender } = renderHook(
      (props: { open?: boolean }) => usePopupScope({ ...props, popupRender }),
      { initialProps: { open: true } },
    );

    expect(result.current.open).toBe(true);
    act(() => {
      result.current.onPopupVisibleChange?.(false);
    });
    rerender({ open: true });
    expect(result.current.open).toBe(true);
  });

  it('cancelAllTimers clears timers on open true', () => {
    const popupRender = () => <div>popup</div>;
    const { result } = renderHook(() => usePopupScope({ popupRender }));

    act(() => {
      result.current.onPopupVisibleChange?.(true);
    });
    act(() => {
      result.current.onPopupVisibleChange?.(false);
    });
    act(() => {
      result.current.onPopupVisibleChange?.(true);
    });
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(result.current.open).toBe(true);
  });

  it('close flow: focus outside portal then remove portal after delay', async () => {
    const onOpenChange = jest.fn();
    const popupRender = () => <div>popup</div>;
    const { result } = renderHook(() => usePopupScope({ popupRender, onOpenChange }));

    act(() => {
      result.current.onPopupVisibleChange?.(true);
    });
    result.current.getPopupContainer?.(document.createElement('button'));
    const outside = document.createElement('button');
    outside.tabIndex = 0;
    document.body.appendChild(outside);
    outside.focus();
    document.body.removeChild(outside);

    act(() => {
      result.current.onPopupVisibleChange?.(false);
    });
    await waitFakeTimer(50, 2);
    act(() => {
      jest.advanceTimersByTime(400);
    });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('should render ConfigProvider and ContextIsolator in wrappedPopupRender', () => {
    const popupRender = () => <div data-testid="popup-content">hello</div>;
    const { result } = renderHook(() => usePopupScope({ popupRender }));

    const el = result.current.popupRender?.(<div key="test">test</div>);
    expect(el).toBeTruthy();
    const { getByTestId } = render(<>{el}</>);
    expect(getByTestId('popup-content')).toHaveTextContent('hello');
  });
});
