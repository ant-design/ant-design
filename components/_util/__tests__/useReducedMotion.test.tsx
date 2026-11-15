import React from 'react';
import { act, renderHook } from '@testing-library/react';
import { renderToString } from 'react-dom/server';

import { render } from '../../../tests/utils';
import { useReducedMotion } from '../hooks';

describe('useReducedMotion', () => {
  const originalMatchMedia = window.matchMedia;
  let mediaQuery: MediaQueryList;
  beforeEach(() => {
    mediaQuery = Object.assign(new EventTarget(), {
      media: '(prefers-reduced-motion: reduce)',
      matches: false,
    }) as MediaQueryList;
    window.matchMedia = jest.fn(() => mediaQuery);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    window.matchMedia = originalMatchMedia;
  });

  const changePreference = (matches: boolean) => {
    Object.assign(mediaQuery, { matches });
    act(() => {
      mediaQuery.dispatchEvent(Object.assign(new Event('change'), { matches }));
    });
  };

  it.each([false, true])('returns the current preference on the first render: %s', (matches) => {
    Object.assign(mediaQuery, { matches });
    const rendered = jest.fn();
    const { result } = renderHook(() => {
      const shouldReduceMotion = useReducedMotion();
      rendered(shouldReduceMotion);
      return shouldReduceMotion;
    });
    expect(window.matchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)');
    expect(rendered.mock.calls[0][0]).toBe(matches);
    expect(result.current).toBe(matches);
  });

  it('updates when the preference changes and removes the listener on unmount', () => {
    const addEventListener = jest.spyOn(mediaQuery, 'addEventListener');
    const removeEventListener = jest.spyOn(mediaQuery, 'removeEventListener');
    const { result, unmount } = renderHook(useReducedMotion);

    changePreference(true);
    expect(result.current).toBe(true);

    changePreference(false);
    expect(result.current).toBe(false);

    unmount();
    expect(removeEventListener).toHaveBeenCalledWith('change', addEventListener.mock.calls[0][1]);
  });

  it('returns false when matchMedia is unavailable', () => {
    Object.defineProperty(window, 'matchMedia', { configurable: true, value: undefined });
    const { result } = renderHook(useReducedMotion);

    expect(result.current).toBe(false);
  });

  it('hydrates with the server default before reading the client preference', () => {
    Object.assign(mediaQuery, { matches: true });
    const rendered = jest.fn();
    const Demo: React.FC = () => {
      const shouldReduceMotion = useReducedMotion();
      rendered(shouldReduceMotion);
      return <span>{String(shouldReduceMotion)}</span>;
    };
    const container = document.createElement('div');
    container.innerHTML = renderToString(<Demo />);

    expect(container.textContent).toBe('false');
    expect(window.matchMedia).not.toHaveBeenCalled();
    const serverRenderCount = rendered.mock.calls.length;
    const onRecoverableError = jest.fn();

    render(<Demo />, { container, hydrate: true, onRecoverableError });

    expect(rendered.mock.calls[serverRenderCount][0]).toBe(false);
    expect(onRecoverableError).not.toHaveBeenCalled();
    expect(container.textContent).toBe('true');
  });
});
