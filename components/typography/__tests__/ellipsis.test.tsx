import React from 'react';
import { spyElementPrototypes } from 'rc-util/lib/test/domHook';

import {
  act,
  fireEvent,
  render,
  triggerResize,
  waitFakeTimer,
  waitFor,
} from '../../../tests/utils';
import type { EllipsisConfig } from '../Base';
import Base from '../Base';
import ConfigProvider from '../../config-provider';
import type { ConfigProviderProps } from '../../config-provider';
import zhCN from '../../locale/zh_CN';
type Locale = ConfigProviderProps['locale'];
jest.mock('copy-to-clipboard');

jest.mock('../../_util/styleChecker', () => ({
  isStyleSupport: () => true,
}));

describe('Typography.Ellipsis', () => {
  const LINE_STR_COUNT = 20;
  const LINE_HEIGHT = 16;
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  let mockRectSpy: ReturnType<typeof spyElementPrototypes>;
  let computeSpy: jest.SpyInstance<CSSStyleDeclaration>;
  let offsetWidth: number;
  let scrollWidth: number;

  function getContentHeight(this: { get: (elem?: HTMLElement) => number }, elem?: HTMLElement) {
    const regex = /<[^>]*>/g;

    let html = (elem || (this as any)).innerHTML;
    html = html.replace(regex, '');
    const lines = Math.ceil(html.length / LINE_STR_COUNT);
    return lines * LINE_HEIGHT;
  }

  beforeAll(() => {
    jest.useFakeTimers();
    mockRectSpy = spyElementPrototypes(HTMLElement, {
      scrollWidth: {
        get: () => scrollWidth,
      },
      offsetWidth: {
        get: () => offsetWidth,
      },
      scrollHeight: {
        get: getContentHeight,
      },
      clientHeight: {
        get() {
          const { WebkitLineClamp } = (this as any).style;
          return WebkitLineClamp
            ? Number(WebkitLineClamp) * LINE_HEIGHT
            : (getContentHeight as any)(this);
        },
      },
    });

    computeSpy = jest
      .spyOn(window, 'getComputedStyle')
      .mockImplementation(() => ({ fontSize: 12 }) as unknown as CSSStyleDeclaration);
  });

  beforeEach(() => {
    offsetWidth = 100;
    scrollWidth = 0;
  });

  afterEach(() => {
    errorSpy.mockReset();
  });

  afterAll(() => {
    jest.useRealTimers();
    errorSpy.mockRestore();
    mockRectSpy.mockRestore();
    computeSpy.mockRestore();
  });

  const fullStr =
    'Bamboo is Little Light Bamboo is Little Light Bamboo is Little Light Bamboo is Little Light Bamboo is Little Light';

  it('should trigger update', async () => {
    const ref = React.createRef<HTMLElement>();
    const onEllipsis = jest.fn();
    const { container, rerender, unmount } = render(
      <Base ellipsis={{ onEllipsis }} component="p" editable ref={ref}>
        {fullStr}
      </Base>,
    );

    triggerResize(ref.current!);
    await waitFakeTimer();

    expect(container.firstChild?.textContent).toEqual('Bamboo is Little ...');
    expect(onEllipsis).toHaveBeenCalledWith(true);
    onEllipsis.mockReset();

    // Second resize
    rerender(
      <Base ellipsis={{ rows: 2, onEllipsis }} component="p" editable>
        {fullStr}
      </Base>,
    );
    expect(container.textContent).toEqual('Bamboo is Little Light Bamboo is Litt...');
    expect(onEllipsis).not.toHaveBeenCalled();

    // Third resize
    rerender(
      <Base ellipsis={{ rows: 99, onEllipsis }} component="p" editable>
        {fullStr}
      </Base>,
    );
    expect(container.querySelector('p')?.textContent).toEqual(fullStr);
    expect(onEllipsis).toHaveBeenCalledWith(false);

    unmount();
  });

  it('support css multiple lines', async () => {
    const { container: wrapper } = render(
      <Base ellipsis={{ rows: 2 }} component="p">
        {fullStr}
      </Base>,
    );

    expect(
      wrapper.querySelectorAll('.ant-typography-ellipsis-multiple-line').length,
    ).toBeGreaterThan(0);
    expect(
      (
        wrapper.querySelector<HTMLDivElement>('.ant-typography-ellipsis-multiple-line')
          ?.style as any
      )?.WebkitLineClamp,
    ).toEqual('2');
  });

  it('string with parentheses', async () => {
    const parenthesesStr = `Ant Design, a design language (for background applications, is refined by
        Ant UED Team. Ant Design, a design language for background applications,
        is refined by Ant UED Team. Ant Design, a design language for background
        applications, is refined by Ant UED Team. Ant Design, a design language
        for background applications, is refined by Ant UED Team. Ant Design, a
        design language for background applications, is refined by Ant UED Team.
        Ant Design, a design language for background applications, is refined by
        Ant UED Team.`;
    const ref = React.createRef<HTMLElement>();
    const onEllipsis = jest.fn();
    const { container: wrapper, unmount } = render(
      <Base ellipsis={{ onEllipsis }} component="p" editable ref={ref}>
        {parenthesesStr}
      </Base>,
    );

    triggerResize(ref.current!);
    await waitFakeTimer();

    expect(wrapper.firstChild?.textContent).toEqual('Ant Design, a des...');
    const ellipsisSpans = wrapper.querySelectorAll('span[aria-hidden]');
    expect(ellipsisSpans[ellipsisSpans.length - 1].textContent).toEqual('...');
    onEllipsis.mockReset();

    unmount();
  });

  it('should middle ellipsis', async () => {
    const suffix = '--suffix';
    const ref = React.createRef<HTMLElement>();
    const { container: wrapper, unmount } = render(
      <Base ellipsis={{ rows: 1, suffix }} component="p" ref={ref}>
        {fullStr}
      </Base>,
    );

    triggerResize(ref.current!);
    await waitFakeTimer();

    expect(wrapper.querySelector('p')?.textContent).toEqual('Bamboo is...--suffix');
    unmount();
  });

  it('should front or middle ellipsis', async () => {
    const suffix = '--The information is very important';
    const ref = React.createRef<HTMLElement>();
    const {
      container: wrapper,
      rerender,
      unmount,
    } = render(
      <Base ellipsis={{ rows: 1, suffix }} component="p" ref={ref}>
        {fullStr}
      </Base>,
    );

    triggerResize(ref.current!);
    await waitFakeTimer();

    expect(wrapper.querySelector('p')?.textContent).toEqual(
      '...--The information is very important',
    );

    rerender(
      <Base ellipsis={{ rows: 2, suffix }} component="p">
        {fullStr}
      </Base>,
    );
    expect(wrapper.querySelector('p')?.textContent).toEqual(
      'Ba...--The information is very important',
    );

    rerender(
      <Base ellipsis={{ rows: 99, suffix }} component="p">
        {fullStr}
      </Base>,
    );
    expect(wrapper.querySelector('p')?.textContent).toEqual(fullStr + suffix);

    unmount();
  });

  it('connect children', async () => {
    const bamboo = 'Bamboo';
    const is = ' is ';

    const ref = React.createRef<HTMLElement>();
    const { container: wrapper } = render(
      <Base ellipsis component="p" editable ref={ref}>
        {bamboo}
        {is}
        <code>Little</code>
        <code>Light</code>
      </Base>,
    );

    triggerResize(ref.current!);
    await waitFakeTimer();

    expect(wrapper.textContent).toEqual('Bamboo is Little...');
  });

  it('should expandable work', async () => {
    const onExpand = jest.fn();
    const ref = React.createRef<HTMLElement>();
    const { container } = render(
      <Base ellipsis={{ expandable: true, onExpand }} component="p" copyable editable ref={ref}>
        {fullStr}
      </Base>,
    );

    triggerResize(ref.current!);
    await waitFakeTimer();

    fireEvent.click(container.querySelector('.ant-typography-expand')!);
    expect(onExpand).toHaveBeenCalled();
    expect(container.querySelector('p')?.textContent).toEqual(fullStr);
  });

  it('should collapsible work', async () => {
    const ref = React.createRef<HTMLElement>();

    const { container: wrapper } = render(
      <Base
        ellipsis={{
          expandable: 'collapsible',
          symbol: (expanded) => (expanded ? 'CloseIt' : 'OpenIt'),
        }}
        component="p"
        ref={ref}
      >
        {fullStr}
      </Base>,
    );

    triggerResize(ref.current!);
    await waitFakeTimer();

    expect(wrapper.querySelector('p')?.textContent).toEqual(`Bamboo is L...OpenIt`);

    fireEvent.click(wrapper.querySelector('.ant-typography-expand')!);
    expect(wrapper.querySelector('p')?.textContent).toEqual(`${fullStr}CloseIt`);

    fireEvent.click(wrapper.querySelector('.ant-typography-collapse')!);
    expect(wrapper.querySelector('p')?.textContent).toEqual(`Bamboo is L...OpenIt`);
  });

  it('should have custom expand style', async () => {
    const ref = React.createRef<HTMLElement>();
    const symbol = 'more';
    const { container } = render(
      <Base ellipsis={{ expandable: true, symbol }} component="p" ref={ref}>
        {fullStr}
      </Base>,
    );

    triggerResize(ref.current!);
    await waitFakeTimer();

    expect(container.querySelector('.ant-typography-expand')?.textContent).toEqual('more');
  });

  describe('native css ellipsis', () => {
    it('can use css ellipsis', () => {
      const { container } = render(<Base ellipsis component="p" />);
      expect(container.querySelector('.ant-typography-ellipsis-single-line')).toBeTruthy();
    });

    // https://github.com/ant-design/ant-design/issues/36786
    it('Tooltip should recheck on parent visible change', () => {
      const originIntersectionObserver = global.IntersectionObserver;

      let elementChangeCallback: () => void;
      const observeFn = jest.fn();
      const disconnectFn = jest.fn();

      (global as any).IntersectionObserver = class MockIntersectionObserver {
        constructor(callback: () => IntersectionObserverCallback) {
          elementChangeCallback = callback;
        }

        observe = observeFn;

        disconnect = disconnectFn;
      };

      const { container, unmount } = render(<Base ellipsis component="p" />);

      expect(observeFn).toHaveBeenCalled();

      // Hide first
      act(() => {
        elementChangeCallback?.();
      });

      // Trigger visible should trigger recheck
      let getOffsetParent = false;
      Object.defineProperty(container.querySelector('.ant-typography'), 'offsetParent', {
        get: () => {
          getOffsetParent = true;
          return document.body;
        },
      });
      act(() => {
        elementChangeCallback?.();
      });

      expect(getOffsetParent).toBeTruthy();

      unmount();
      expect(disconnectFn).toHaveBeenCalled();

      global.IntersectionObserver = originIntersectionObserver;
    });

    it('should calculate padding', () => {
      const { container } = render(
        <Base ellipsis component="p" style={{ paddingTop: '12px', paddingBottom: '12px' }} />,
      );
      expect(container.querySelector('.ant-typography-ellipsis-single-line')).toBeTruthy();
    });
  });

  describe('should tooltip support', () => {
    let domSpy: ReturnType<typeof spyElementPrototypes>;

    let containerRect = {
      left: 0,
      top: 0,
      right: 100,
      bottom: 22,
    };
    let measureRect = {
      left: 200,
      top: 0,
    };

    beforeAll(() => {
      domSpy = spyElementPrototypes(HTMLElement, {
        getBoundingClientRect() {
          if (
            (this as unknown as HTMLElement).classList.contains(
              'ant-typography-css-ellipsis-content-measure',
            )
          ) {
            return {
              ...measureRect,
              right: measureRect.left,
              bottom: measureRect.top + 22,
            };
          }

          return containerRect;
        },
      });
    });

    beforeEach(() => {
      containerRect = {
        left: 0,
        top: 0,
        right: 100,
        bottom: 22,
      };
      measureRect = {
        left: 200,
        top: 0,
      };
    });

    afterAll(() => {
      domSpy.mockRestore();
    });

    async function getWrapper(tooltip?: EllipsisConfig['tooltip']) {
      const ref = React.createRef<HTMLElement>();
      const wrapper = render(
        <Base ellipsis={{ tooltip }} component="p" ref={ref}>
          {fullStr}
        </Base>,
      );
      triggerResize(ref.current!);
      await waitFakeTimer();
      return wrapper;
    }

    it('boolean', async () => {
      const { container, baseElement } = await getWrapper(true);
      fireEvent.mouseEnter(container.firstChild!);
      await waitFor(() => {
        expect(baseElement.querySelector('.ant-tooltip-open')).not.toBeNull();
      });
    });

    it('customize', async () => {
      const { container, baseElement } = await getWrapper('Bamboo is Light');
      fireEvent.mouseEnter(container.firstChild!);
      await waitFor(() => {
        expect(baseElement.querySelector('.ant-tooltip-open')).not.toBeNull();
      });
    });
    it('tooltip props', async () => {
      const { container, baseElement } = await getWrapper({
        title: 'This is tooltip',
        className: 'tooltip-class-name',
      });
      fireEvent.mouseEnter(container.firstChild!);
      await waitFor(() => {
        expect(container.querySelector('.tooltip-class-name')).toBeTruthy();
        expect(baseElement.querySelector('.ant-tooltip-open')).not.toBeNull();
      });
    });
    it('tooltip title true', async () => {
      const { container, baseElement } = await getWrapper({
        title: true,
        className: 'tooltip-class-name',
      });
      fireEvent.mouseEnter(container.firstChild!);
      await waitFor(() => {
        expect(container.querySelector('.tooltip-class-name')).toBeTruthy();
        expect(baseElement.querySelector('.ant-tooltip-open')).not.toBeNull();
      });
    });
    it('tooltip element', async () => {
      const { container, baseElement } = await getWrapper(
        <div className="tooltip-class-name">title</div>,
      );
      fireEvent.mouseEnter(container.firstChild!);
      await waitFor(() => {
        expect(container.querySelector('.tooltip-class-name')).toBeTruthy();
        expect(baseElement.querySelector('.ant-tooltip-open')).not.toBeNull();
      });
    });

    describe('precision', () => {
      // https://github.com/ant-design/ant-design/issues/50143
      it('should show', async () => {
        containerRect.right = 99.9;
        measureRect.left = 100;

        const { container, baseElement } = await getWrapper({
          title: true,
          className: 'tooltip-class-name',
        });
        fireEvent.mouseEnter(container.firstChild!);

        await waitFakeTimer();

        expect(container.querySelector('.tooltip-class-name')).toBeTruthy();
        expect(baseElement.querySelector('.ant-tooltip-open')).not.toBeNull();
      });

      // https://github.com/ant-design/ant-design/issues/50414
      it('should not show', async () => {
        containerRect.right = 48.52;
        measureRect.left = 48.52;

        const { container, baseElement } = await getWrapper({
          title: true,
          className: 'tooltip-class-name',
        });
        fireEvent.mouseEnter(container.firstChild!);

        await waitFakeTimer();

        expect(container.querySelector('.tooltip-class-name')).toBeTruthy();
        expect(baseElement.querySelector('.ant-tooltip-open')).toBeFalsy();
      });
    });
  });

  it('js ellipsis should show aria-label', () => {
    const { container: titleWrapper } = render(
      <Base component={undefined} title="bamboo" ellipsis={{ expandable: true }} />,
    );
    expect(titleWrapper.querySelector('.ant-typography')?.getAttribute('aria-label')).toEqual(
      'bamboo',
    );

    const { container: tooltipWrapper } = render(
      <Base component={undefined} ellipsis={{ expandable: true, tooltip: 'little' }} />,
    );
    expect(tooltipWrapper.querySelector('.ant-typography')?.getAttribute('aria-label')).toEqual(
      'little',
    );
  });

  it('should display tooltip if line clamp', async () => {
    mockRectSpy = spyElementPrototypes(HTMLElement, {
      getBoundingClientRect() {
        if (
          (this as unknown as HTMLElement).classList.contains(
            'ant-typography-css-ellipsis-content-measure',
          )
        ) {
          return {
            left: 0,
            right: 0,
            top: 100,
            bottom: 122,
          };
        }

        return {
          left: 0,
          right: 100,
          top: 0,
          bottom: 22 * 3,
        };
      },
    });

    const ref = React.createRef<HTMLElement>();
    const { container, baseElement } = render(
      <Base component={undefined} ellipsis={{ tooltip: 'This is tooltip', rows: 2 }} ref={ref}>
        Ant Design, a design language for background applications, is refined by Ant UED Team.
      </Base>,
    );
    triggerResize(ref.current!);
    await waitFakeTimer();

    fireEvent.mouseEnter(container.firstChild!);
    await waitFor(() => {
      expect(baseElement.querySelector('.ant-tooltip-open')).not.toBeNull();
    });
    mockRectSpy.mockRestore();
  });

  // https://github.com/ant-design/ant-design/issues/46580
  it('dynamic to be ellipsis should show tooltip', async () => {
    let dynamicWidth = 100;

    mockRectSpy = spyElementPrototypes(HTMLElement, {
      getBoundingClientRect() {
        if (
          (this as unknown as HTMLElement).classList.contains(
            'ant-typography-css-ellipsis-content-measure',
          )
        ) {
          return {
            left: 0,
            right: dynamicWidth,
            top: 0,
            bottom: 22,
          };
        }

        return {
          left: 100,
          right: 100,
          top: 0,
          bottom: 22,
        };
      },
    });

    const ref = React.createRef<HTMLElement>();
    render(
      <Base ellipsis={{ tooltip: 'bamboo' }} component="p" ref={ref}>
        less
      </Base>,
    );

    // Force to narrow
    dynamicWidth = 50;
    triggerResize(ref.current!);

    await waitFakeTimer();

    fireEvent.mouseEnter(ref.current!);
    await waitFakeTimer();
    expect(document.querySelector('.ant-tooltip')).toBeTruthy();

    mockRectSpy.mockRestore();
  });

  it('not force single line if expanded', async () => {
    const ref = React.createRef<HTMLElement>();

    const renderDemo = (expanded: boolean) => (
      <Base ellipsis={{ rows: 1, expanded, expandable: 'collapsible' }} component="p" ref={ref}>
        {fullStr}
      </Base>
    );

    const { container, rerender } = render(renderDemo(false));

    triggerResize(ref.current!);
    await waitFakeTimer();

    expect(container.querySelector('.ant-typography-expand')).toBeTruthy();

    rerender(renderDemo(true));
    expect(container.querySelector('.ant-typography-collapse')).toBeTruthy();
  });

  it('no dead loop', () => {
    const tooltipObj: any = {};
    tooltipObj.loop = tooltipObj;

    render(
      <Base ellipsis={{ tooltip: tooltipObj }} component="p">
        {fullStr}
      </Base>,
    );
  });

  it('Switch locale', async () => {
    const ref = React.createRef<HTMLElement>();
    const App = () => {
      const [locale, setLocal] = React.useState<Locale>();

      return (
        <ConfigProvider locale={locale}>
          <div>
            <button type="button" onClick={() => setLocal(zhCN)}>
              zhcn
            </button>
            <Base
              ellipsis={{
                rows: 1,
                expandable: 'collapsible',
                expanded: false,
              }}
              ref={ref}
            >
              {'Ant Design, a design language for background applications, is refined by Ant UED Team.'.repeat(
                20,
              )}
            </Base>
          </div>
        </ConfigProvider>
      );
    };
    const { container } = render(<App />);

    triggerResize(ref.current!);
    await waitFakeTimer();
    const expandButton = container.querySelector('.ant-typography-expand');
    expect(expandButton).toHaveTextContent('Expand');
    const button = container.querySelector('button')!;

    fireEvent.click(button);

    triggerResize(ref.current!);
    await waitFakeTimer();

    const expandButtonCN = container.querySelector('.ant-typography-expand');
    expect(expandButtonCN).toHaveTextContent('展开');
    expect(expandButtonCN).toBeInTheDocument();
  });
});
