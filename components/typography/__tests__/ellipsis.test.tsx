import { spyElementPrototypes } from 'rc-util/lib/test/domHook';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent, render, triggerResize, waitFakeTimer, waitFor } from '../../../tests/utils';
import type { EllipsisConfig } from '../Base';
import Base from '../Base';

jest.mock('copy-to-clipboard');

jest.mock('../../_util/styleChecker', () => ({
  isStyleSupport: () => true,
}));

describe('Typography.Ellipsis', () => {
  const LINE_STR_COUNT = 20;
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  let mockRectSpy: ReturnType<typeof spyElementPrototypes>;
  let getWidthTimes = 0;
  let computeSpy: jest.SpyInstance<CSSStyleDeclaration>;

  beforeAll(() => {
    jest.useFakeTimers();
    mockRectSpy = spyElementPrototypes(HTMLElement, {
      offsetHeight: {
        get() {
          let html = this.innerHTML;
          html = html.replace(/<[^>]*>/g, '');
          const lines = Math.ceil(html.length / LINE_STR_COUNT);
          return lines * 16;
        },
      },
      offsetWidth: {
        get: () => {
          getWidthTimes += 1;
          return 100;
        },
      },
      getBoundingClientRect() {
        let html = this.innerHTML;
        html = html.replace(/<[^>]*>/g, '');
        const lines = Math.ceil(html.length / LINE_STR_COUNT);
        return { height: lines * 16 };
      },
    });

    computeSpy = jest
      .spyOn(window, 'getComputedStyle')
      .mockImplementation(() => ({ fontSize: 12 } as unknown as CSSStyleDeclaration));
  });

  afterEach(() => {
    errorSpy.mockReset();
    getWidthTimes = 0;
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
    const { container: wrapper } = render(
      <Base ellipsis={{ expandable: true, onExpand }} component="p" copyable editable>
        {fullStr}
      </Base>,
    );

    fireEvent.click(wrapper.querySelector('.ant-typography-expand')!);
    expect(onExpand).toHaveBeenCalled();
    expect(wrapper.querySelector('p')?.textContent).toEqual(fullStr);
  });

  it('should have custom expand style', async () => {
    const symbol = 'more';
    const { container } = render(
      <Base ellipsis={{ expandable: true, symbol }} component="p">
        {fullStr}
      </Base>,
    );
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
      getWidthTimes = 0;
      Object.defineProperty(container.querySelector('.ant-typography'), 'offsetParent', {
        get: () => document.body,
      });
      act(() => {
        elementChangeCallback?.();
      });

      expect(getWidthTimes).toBeGreaterThan(0);

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

    beforeAll(() => {
      domSpy = spyElementPrototypes(HTMLElement, {
        offsetWidth: {
          get: () => 100,
        },
        scrollWidth: {
          get: () => 200,
        },
      });
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
      scrollHeight: {
        get() {
          let html = this.innerHTML;
          html = html.replace(/<[^>]*>/g, '');
          const lines = Math.ceil(html.length / LINE_STR_COUNT);
          return lines * 16;
        },
      },
      offsetHeight: {
        get: () => 32,
      },
      offsetWidth: {
        get: () => 100,
      },
      scrollWidth: {
        get: () => 100,
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
});
