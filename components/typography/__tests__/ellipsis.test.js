import { spyElementPrototypes } from 'rc-util/lib/test/domHook';
import React from 'react';
import { fireEvent, render, sleep, triggerResize, waitFor } from '../../../tests/utils';
import Base from '../Base';
// eslint-disable-next-line no-unused-vars

jest.mock('copy-to-clipboard');

jest.mock('../../_util/styleChecker', () => ({
  isStyleSupport: () => true,
}));

describe('Typography.Ellipsis', () => {
  const LINE_STR_COUNT = 20;
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  let mockRectSpy;

  beforeAll(() => {
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
        get: () => 100,
      },
      getBoundingClientRect() {
        let html = this.innerHTML;
        html = html.replace(/<[^>]*>/g, '');
        const lines = Math.ceil(html.length / LINE_STR_COUNT);
        return { height: lines * 16 };
      },
    });
  });

  afterEach(() => {
    errorSpy.mockReset();
  });

  afterAll(() => {
    errorSpy.mockRestore();
    mockRectSpy.mockRestore();
  });

  const fullStr =
    'Bamboo is Little Light Bamboo is Little Light Bamboo is Little Light Bamboo is Little Light Bamboo is Little Light';

  it('should trigger update', async () => {
    const ref = React.createRef();
    const onEllipsis = jest.fn();
    const {
      container: wrapper,
      rerender,
      unmount,
    } = render(
      <Base ellipsis={{ onEllipsis }} component="p" editable ref={ref}>
        {fullStr}
      </Base>,
    );

    triggerResize(ref.current);
    await sleep(20);

    expect(wrapper.firstChild.textContent).toEqual('Bamboo is Little ...');
    expect(onEllipsis).toHaveBeenCalledWith(true);
    onEllipsis.mockReset();

    // Second resize
    rerender(
      <Base ellipsis={{ rows: 2, onEllipsis }} component="p" editable>
        {fullStr}
      </Base>,
    );
    expect(wrapper.textContent).toEqual('Bamboo is Little Light Bamboo is Litt...');
    expect(onEllipsis).not.toHaveBeenCalled();

    // Third resize
    rerender(
      <Base ellipsis={{ rows: 99, onEllipsis }} component="p" editable>
        {fullStr}
      </Base>,
    );
    expect(wrapper.querySelector('p').textContent).toEqual(fullStr);
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
      wrapper.querySelector('.ant-typography-ellipsis-multiple-line').style.WebkitLineClamp,
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
    const ref = React.createRef();
    const onEllipsis = jest.fn();
    const { container: wrapper, unmount } = render(
      <Base ellipsis={{ onEllipsis }} component="p" editable ref={ref}>
        {parenthesesStr}
      </Base>,
    );

    triggerResize(ref.current);
    await sleep(20);

    expect(wrapper.firstChild.textContent).toEqual('Ant Design, a des...');
    const ellipsisSpans = wrapper.querySelectorAll('span[aria-hidden]');
    expect(ellipsisSpans[ellipsisSpans.length - 1].textContent).toEqual('...');
    onEllipsis.mockReset();

    unmount();
  });

  it('should middle ellipsis', async () => {
    const suffix = '--suffix';
    const ref = React.createRef();
    const { container: wrapper, unmount } = render(
      <Base ellipsis={{ rows: 1, suffix }} component="p" ref={ref}>
        {fullStr}
      </Base>,
    );

    triggerResize(ref.current);
    await sleep(20);

    expect(wrapper.querySelector('p').textContent).toEqual('Bamboo is...--suffix');
    unmount();
  });

  it('should front or middle ellipsis', async () => {
    const suffix = '--The information is very important';
    const ref = React.createRef();
    const {
      container: wrapper,
      rerender,
      unmount,
    } = render(
      <Base ellipsis={{ rows: 1, suffix }} component="p" ref={ref}>
        {fullStr}
      </Base>,
    );

    triggerResize(ref.current);
    await sleep(20);

    expect(wrapper.querySelector('p').textContent).toEqual(
      '...--The information is very important',
    );

    rerender(
      <Base ellipsis={{ rows: 2, suffix }} component="p">
        {fullStr}
      </Base>,
    );
    expect(wrapper.querySelector('p').textContent).toEqual(
      'Ba...--The information is very important',
    );

    rerender(
      <Base ellipsis={{ rows: 99, suffix }} component="p">
        {fullStr}
      </Base>,
    );
    expect(wrapper.querySelector('p').textContent).toEqual(fullStr + suffix);

    unmount();
  });

  it('connect children', async () => {
    const bamboo = 'Bamboo';
    const is = ' is ';

    const ref = React.createRef();
    const { container: wrapper } = render(
      <Base ellipsis component="p" editable ref={ref}>
        {bamboo}
        {is}
        <code>Little</code>
        <code>Light</code>
      </Base>,
    );

    triggerResize(ref.current);
    await sleep(20);

    expect(wrapper.textContent).toEqual('Bamboo is Little...');
  });

  it('should expandable work', async () => {
    const onExpand = jest.fn();
    const { container: wrapper } = render(
      <Base ellipsis={{ expandable: true, onExpand }} component="p" copyable editable>
        {fullStr}
      </Base>,
    );

    fireEvent.click(wrapper.querySelector('.ant-typography-expand'));
    expect(onExpand).toHaveBeenCalled();
    expect(wrapper.querySelector('p').textContent).toEqual(fullStr);
  });

  it('should have custom expand style', async () => {
    const symbol = 'more';
    const { container: wrapper } = render(
      <Base ellipsis={{ expandable: true, symbol }} component="p">
        {fullStr}
      </Base>,
    );
    expect(wrapper.querySelector('.ant-typography-expand').textContent).toEqual('more');
  });

  it('can use css ellipsis', () => {
    const { container: wrapper } = render(<Base ellipsis component="p" />);
    expect(wrapper.querySelectorAll('.ant-typography-ellipsis-single-line').length).toBeGreaterThan(
      0,
    );
  });

  it('should calculate padding', () => {
    const { container: wrapper } = render(
      <Base ellipsis component="p" style={{ paddingTop: '12px', paddingBottom: '12px' }} />,
    );
    expect(wrapper.querySelectorAll('.ant-typography-ellipsis-single-line').length).toBeGreaterThan(
      0,
    );
  });

  describe('should tooltip support', () => {
    let domSpy;

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

    async function getWrapper(tooltip) {
      const ref = React.createRef();
      const wrapper = render(
        <Base ellipsis={{ tooltip }} component="p" ref={ref}>
          {fullStr}
        </Base>,
      );
      triggerResize(ref.current);
      await sleep(20);
      return wrapper;
    }

    it('boolean', async () => {
      const { container, baseElement } = await getWrapper(true);
      fireEvent.mouseEnter(container.firstChild);
      await waitFor(() => {
        expect(baseElement.querySelector('.ant-tooltip-open')).not.toBeNull();
      });
    });

    it('customize', async () => {
      const { container, baseElement } = await getWrapper('Bamboo is Light');
      fireEvent.mouseEnter(container.firstChild);
      await waitFor(() => {
        expect(baseElement.querySelector('.ant-tooltip-open')).not.toBeNull();
      });
    });
  });

  it('js ellipsis should show aria-label', () => {
    const { container: titleWrapper } = render(
      <Base title="bamboo" ellipsis={{ expandable: true }} />,
    );
    expect(titleWrapper.querySelector('.ant-typography').getAttribute('aria-label')).toEqual(
      'bamboo',
    );

    const { container: tooltipWrapper } = render(
      <Base ellipsis={{ expandable: true, tooltip: 'little' }} />,
    );
    expect(tooltipWrapper.querySelector('.ant-typography').getAttribute('aria-label')).toEqual(
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

    const ref = React.createRef();
    const { container: wrapper, baseElement } = render(
      <Base ellipsis={{ tooltip: 'This is tooltip', rows: 2 }} ref={ref}>
        Ant Design, a design language for background applications, is refined by Ant UED Team.
      </Base>,
    );
    triggerResize(ref.current);
    await sleep(20);

    fireEvent.mouseEnter(wrapper.firstChild);
    await waitFor(() => {
      expect(baseElement.querySelector('.ant-tooltip-open')).not.toBeNull();
    });
    mockRectSpy.mockRestore();
  });
});
