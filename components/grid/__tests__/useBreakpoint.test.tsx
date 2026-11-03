import React from 'react';
import { renderToString } from 'react-dom/server';

import { Row } from '..';
import { act, render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import useBreakpoint from '../hooks/useBreakpoint';

describe('useBreakpoint', () => {
  const originalMatchMedia = window.matchMedia;
  let mediaQueries: Map<string, MediaQueryList>;
  let matchedQueries: Set<string>;

  beforeEach(() => {
    mediaQueries = new Map();
    matchedQueries = new Set(['(max-width: 575px)']);
    window.matchMedia = jest.fn((query: string) => {
      if (!mediaQueries.has(query)) {
        const mql = Object.assign(new EventTarget(), {
          media: query,
          matches: matchedQueries.has(query),
        }) as MediaQueryList;
        jest.spyOn(mql, 'addEventListener');
        jest.spyOn(mql, 'removeEventListener');
        mediaQueries.set(query, mql);
      }
      return mediaQueries.get(query)!;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    window.matchMedia = originalMatchMedia;
  });

  const changeMedia = (query: string, matches: boolean) => {
    const mql = mediaQueries.get(query)!;
    Object.assign(mql, { matches });
    act(() => {
      mql.dispatchEvent(Object.assign(new Event('change'), { matches }));
    });
  };

  it('updates breakpoints without resubscribing or rendering unchanged snapshots', () => {
    const rendered = jest.fn();
    const Demo: React.FC = () => {
      const screens = useBreakpoint();
      rendered(screens);
      return <span>{JSON.stringify(screens)}</span>;
    };
    const { container, rerender, unmount } = render(<Demo />);
    expect(JSON.parse(container.textContent!)).toMatchObject({ xs: true, md: false });
    const matchMediaCalls = jest.mocked(window.matchMedia).mock.calls.length;

    changeMedia('(min-width: 768px)', true);
    expect(JSON.parse(container.textContent!)).toMatchObject({ md: true });

    const renderCount = rendered.mock.calls.length;
    changeMedia('(min-width: 768px)', true);
    expect(rendered).toHaveBeenCalledTimes(renderCount);

    rerender(<Demo />);
    expect(window.matchMedia).toHaveBeenCalledTimes(matchMediaCalls);

    unmount();
    mediaQueries.forEach((mql) => {
      expect(mql.removeEventListener).toHaveBeenCalledTimes(
        jest.mocked(mql.addEventListener).mock.calls.length,
      );
    });
  });

  it('reads the latest breakpoints on parent renders when refresh is disabled', () => {
    const rendered = jest.fn();
    const Demo: React.FC<{ refresh: boolean }> = (props) => {
      const { refresh } = props;
      const screens = useBreakpoint(refresh);
      rendered(screens);
      return <span>{JSON.stringify(screens)}</span>;
    };
    const { container, rerender } = render(<Demo refresh={false} />);
    const renderCount = rendered.mock.calls.length;
    const matchMediaCalls = jest.mocked(window.matchMedia).mock.calls.length;
    expect(container.textContent).toBe('{}');

    changeMedia('(min-width: 768px)', true);
    expect(rendered).toHaveBeenCalledTimes(renderCount);
    expect(container.textContent).toBe('{}');

    rerender(<Demo refresh={false} />);
    expect(JSON.parse(container.textContent!)).toMatchObject({ md: true });

    rerender(<Demo refresh />);
    changeMedia('(min-width: 768px)', false);
    expect(JSON.parse(container.textContent!)).toMatchObject({ md: false });
    expect(window.matchMedia).toHaveBeenCalledTimes(matchMediaCalls);

    rerender(<Demo refresh={false} />);
    const disabledRenderCount = rendered.mock.calls.length;
    changeMedia('(min-width: 768px)', true);
    expect(rendered).toHaveBeenCalledTimes(disabledRenderCount);

    rerender(<Demo refresh={false} />);
    expect(JSON.parse(container.textContent!)).toMatchObject({ md: true });
  });

  it('updates subscriptions when breakpoint tokens change', () => {
    const Demo: React.FC = () => <span>{JSON.stringify(useBreakpoint())}</span>;
    const { container, rerender } = render(
      <ConfigProvider theme={{ token: { colorPrimary: '#1677ff' } }}>
        <Demo />
      </ConfigProvider>,
    );
    const previousQuery = mediaQueries.get('(min-width: 768px)')!;
    expect(JSON.parse(container.textContent!)).toMatchObject({ md: false });

    const matchMediaCalls = jest.mocked(window.matchMedia).mock.calls.length;
    rerender(
      <ConfigProvider theme={{ token: { colorPrimary: '#ff0000' } }}>
        <Demo />
      </ConfigProvider>,
    );
    expect(window.matchMedia).toHaveBeenCalledTimes(matchMediaCalls);

    matchedQueries.add('(min-width: 800px)');
    rerender(
      <ConfigProvider theme={{ token: { screenMD: 800, screenMDMin: 800 } }}>
        <Demo />
      </ConfigProvider>,
    );
    expect(JSON.parse(container.textContent!)).toMatchObject({ md: true });
    expect(previousQuery.removeEventListener).toHaveBeenCalledTimes(
      jest.mocked(previousQuery.addEventListener).mock.calls.length,
    );

    changeMedia('(min-width: 800px)', false);
    expect(JSON.parse(container.textContent!)).toMatchObject({ md: false });
  });

  it.each([undefined, { md: true }] as const)(
    'hydrates with the same default screens as the server: %p',
    (defaultScreens) => {
      const rendered = jest.fn();
      const Demo: React.FC = () => {
        const screens = useBreakpoint(true, defaultScreens);
        rendered(screens);
        return <span>{JSON.stringify(screens)}</span>;
      };
      const container = document.createElement('div');
      container.innerHTML = renderToString(<Demo />);
      expect(container.textContent).toBe(JSON.stringify(defaultScreens ?? {}));
      expect(window.matchMedia).not.toHaveBeenCalled();
      const serverRenderCount = rendered.mock.calls.length;
      const onRecoverableError = jest.fn();

      const { unmount } = render(<Demo />, { container, hydrate: true, onRecoverableError });
      expect(rendered.mock.calls[serverRenderCount][0]).toEqual(defaultScreens ?? {});
      expect(onRecoverableError).not.toHaveBeenCalled();
      expect(JSON.parse(container.textContent!)).toMatchObject({ xs: true, md: false });
      unmount();
    },
  );

  it('preserves the null default used by responsive gutters during hydration', () => {
    const Demo: React.FC = () => <Row gutter={{ xs: 8, md: 24 }} />;
    const container = document.createElement('div');
    container.innerHTML = renderToString(<Demo />);
    expect(container.firstElementChild).toHaveStyle({ marginInline: '-12px' });
    expect(window.matchMedia).not.toHaveBeenCalled();
    const onRecoverableError = jest.fn();

    const { unmount } = render(<Demo />, { container, hydrate: true, onRecoverableError });
    expect(onRecoverableError).not.toHaveBeenCalled();
    expect(container.firstElementChild).toHaveStyle({ marginInline: '-4px' });
    unmount();
  });
});
