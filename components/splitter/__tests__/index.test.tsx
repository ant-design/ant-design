import React from 'react';
import type { GetProps, SplitterProps } from 'antd';
import { ConfigProvider, Splitter } from 'antd';

import { fireEvent, render, waitFakeTimer } from '../../../tests/utils';

type PanelProps = GetProps<typeof Splitter.Panel>;

const SplitterDemo = ({ items = [{}, {}], ...props }: { items?: PanelProps[] } & SplitterProps) => (
  <Splitter {...props}>
    {items?.map((item, idx) => (
      // eslint-disable-next-line react/no-array-index-key
      <Splitter.Panel key={idx} {...item}>
        {idx}
      </Splitter.Panel>
    ))}
  </Splitter>
);

describe('Splitter', () => {
  beforeEach(() => {
    // jsdom 不执行任何布局，因此不会计算值 https://github.com/jsdom/jsdom/issues/1590
    global.HTMLElement.prototype.getBoundingClientRect = () =>
      ({
        height: 400,
        width: 400,
      }) as DOMRect;
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  const doMove = async (
    container: HTMLElement,
    index: number,
    options: { clientX?: number; clientY?: number },
  ) => {
    fireEvent.mouseDown(container?.querySelectorAll('.ant-splitter-bar')[index]!, {
      clientX: 0,
      clientY: 0,
    });
    fireEvent.mouseMove(document.documentElement, options); // 40%
    await waitFakeTimer();
    fireEvent.mouseUp(document.documentElement);
  };

  it('should correct render', () => {
    const { container } = render(<SplitterDemo />);
    expect(container?.querySelector('.ant-splitter')).toBeTruthy();
    expect(container?.querySelectorAll('.ant-splitter-panel')?.length).toBe(2);
    expect(container?.querySelector('.ant-splitter-bar')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('should correct render panel size', async () => {
    jest.useFakeTimers();

    const { container } = render(
      <SplitterDemo items={[{ size: 20 }, { size: '45%' }, { size: '40px' }, {}]} />,
    );

    await waitFakeTimer();
    const panels = container?.querySelectorAll('.ant-splitter-panel');

    expect(panels?.[0]).toHaveStyle('flex-basis: 20%');
    expect(panels?.[1]).toHaveStyle('flex-basis: 45%');
    expect(panels?.[2]).toHaveStyle('flex-basis: 10%');
    expect(panels?.[3]).toHaveStyle('flex-basis: 25%');
  });

  it('The layout should work fine.', () => {
    const { container, rerender } = render(<SplitterDemo />);
    expect(container?.querySelector('.ant-splitter-horizontal')).toBeTruthy();

    rerender(<SplitterDemo items={[{}, {}, {}]} layout="vertical" />);
    expect(container?.querySelector('.ant-splitter-vertical')).toBeTruthy();
  });

  it('The resizable should work fine.', () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { container } = render(<SplitterDemo items={[{ size: 20 }, { resizable: false }, {}]} />);

    expect(container?.querySelectorAll('.ant-splitter-bar-resizable')?.length).toBe(1);
    expect(errSpy).not.toHaveBeenCalled();
  });

  it('The collapsible should work fine.', () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { container, rerender } = render(
      <SplitterDemo items={[{ size: 20, collapsible: true }, { collapsible: true }]} />,
    );

    expect(container?.querySelectorAll('.ant-splitter-bar-collapse-icon')?.length).toBe(2);
    expect(container?.querySelector('.ant-splitter-bar-collapse-previous')).toBeTruthy();
    expect(container?.querySelector('.ant-splitter-bar-collapse-next')).toBeTruthy();

    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: Splitter.Panel] The last Splitter.Panel should not be configured with  `collapsible` or `resizable` properties.',
    );

    // support collapsible is object
    rerender(
      <SplitterDemo
        items={[
          {
            size: 20,
            collapsible: {
              start: true,
            },
          },
          {
            collapsible: {
              end: true,
            },
          },
          {},
        ]}
      />,
    );
    const barNodes = container?.querySelectorAll('.ant-splitter-bar');

    expect(barNodes?.[0]?.querySelector('.ant-splitter-bar-collapse-previous')).toBeTruthy();
    expect(barNodes?.[0]?.querySelector('.ant-splitter-bar-collapse-next')).toBeFalsy();

    expect(barNodes?.[1]?.querySelector('.ant-splitter-bar-collapse-previous')).toBeFalsy();
    expect(barNodes?.[1]?.querySelector('.ant-splitter-bar-collapse-next')).toBeTruthy();
  });

  it('The collapsible click should work fine.', () => {
    const { container, rerender } = render(
      <SplitterDemo
        items={[
          {
            size: 20,
            collapsible: {
              start: true,
            },
          },
          {},
        ]}
      />,
    );
    // previous click
    fireEvent.click(container?.querySelector('.ant-splitter-bar-collapse-previous')!);
    expect(container?.querySelector('.ant-splitter-bar-collapse-previous')).toBeFalsy();
    expect(container?.querySelector('.ant-splitter-bar-collapse-next')).toBeTruthy();
    expect(container?.querySelectorAll('.ant-splitter-panel')[0]).toHaveStyle('flex-basis: 0%');
    expect(container?.querySelectorAll('.ant-splitter-panel')[1]).toHaveStyle('flex-basis: 100%');

    rerender(
      <SplitterDemo
        items={[
          {
            size: 60,
            collapsible: {
              end: true,
            },
          },
          {},
        ]}
      />,
    );
    // next click
    fireEvent.click(container?.querySelector('.ant-splitter-bar-collapse-next')!);
    expect(container?.querySelector('.ant-splitter-bar-collapse-previous')).toBeTruthy();
    expect(container?.querySelector('.ant-splitter-bar-collapse-next')).toBeFalsy();
    expect(container?.querySelectorAll('.ant-splitter-panel')[0]).toHaveStyle('flex-basis: 100%');
    expect(container?.querySelectorAll('.ant-splitter-panel')[1]).toHaveStyle('flex-basis: 0%');

    // collapsible is boolean
    rerender(
      <SplitterDemo
        items={[
          {
            size: 10,
            collapsible: true,
          },
          {},
        ]}
      />,
    );
    // mouseDown icon
    fireEvent.mouseDown(container?.querySelector('.ant-splitter-bar-collapse-next')!);
    expect(container?.querySelector('.ant-splitter-resizing')).toBeFalsy();
    fireEvent.mouseDown(container?.querySelector('.ant-splitter-bar-collapse-previous')!);
    expect(container?.querySelector('.ant-splitter-resizing')).toBeFalsy();

    fireEvent.click(container?.querySelector('.ant-splitter-bar-collapse-next')!);
    expect(container?.querySelector('.ant-splitter-bar-collapse-previous')).toBeTruthy();
    expect(container?.querySelector('.ant-splitter-bar-collapse-next')).toBeFalsy();
    expect(container?.querySelectorAll('.ant-splitter-panel')[0]).toHaveStyle('flex-basis: 100%');
    expect(container?.querySelectorAll('.ant-splitter-panel')[1]).toHaveStyle('flex-basis: 0%');

    fireEvent.click(container?.querySelector('.ant-splitter-bar-collapse-previous')!);
    expect(container?.querySelector('.ant-splitter-bar-collapse-previous')).toBeTruthy();
    expect(container?.querySelector('.ant-splitter-bar-collapse-next')).toBeTruthy();
    expect(container?.querySelectorAll('.ant-splitter-panel')[0]).toHaveStyle('flex-basis: 10%');
    expect(container?.querySelectorAll('.ant-splitter-panel')[1]).toHaveStyle('flex-basis: 90%');

    fireEvent.click(container?.querySelector('.ant-splitter-bar-collapse-previous')!);
    expect(container?.querySelector('.ant-splitter-bar-collapse-previous')).toBeFalsy();
    expect(container?.querySelector('.ant-splitter-bar-collapse-next')).toBeTruthy();
    expect(container?.querySelectorAll('.ant-splitter-panel')[0]).toHaveStyle('flex-basis: 0%');
    expect(container?.querySelectorAll('.ant-splitter-panel')[1]).toHaveStyle('flex-basis: 100%');

    fireEvent.click(container?.querySelector('.ant-splitter-bar-collapse-next')!);
    expect(container?.querySelector('.ant-splitter-bar-collapse-previous')).toBeTruthy();
    expect(container?.querySelector('.ant-splitter-bar-collapse-next')).toBeTruthy();
    expect(container?.querySelectorAll('.ant-splitter-panel')[0]).toHaveStyle('flex-basis: 10%');
    expect(container?.querySelectorAll('.ant-splitter-panel')[1]).toHaveStyle('flex-basis: 90%');
  });

  it('The mousemove should work fine.', async () => {
    const mockStart = jest.fn();
    const mockMoving = jest.fn();
    const mockMovingVertical = jest.fn();
    const mockEnd = jest.fn();

    // previous click
    const { container } = render(
      <Splitter>
        <Splitter.Panel>
          <SplitterDemo
            items={[{}, { min: 20 }]}
            onResizeStart={mockStart}
            onResize={mockMoving}
            onResizeEnd={mockEnd}
          />
          ,
        </Splitter.Panel>

        <Splitter.Panel>
          <SplitterDemo items={[{}, { max: 75 }]} layout="vertical" onResize={mockMovingVertical} />
        </Splitter.Panel>
      </Splitter>,
    );

    // layout horizontal
    fireEvent.mouseDown(container?.querySelectorAll('.ant-splitter-bar')[0]!, {
      clientX: 0,
      clientY: 0,
    });
    expect(container?.querySelector('.ant-splitter-resizing')).toBeTruthy();
    // 模拟鼠标移动事件
    fireEvent.mouseMove(document.documentElement, { clientX: 40 });
    await waitFakeTimer();
    // 模拟鼠标释放结束拖动
    fireEvent.mouseUp(document.documentElement);
    expect(mockStart).toHaveBeenCalled();
    expect(mockMoving).toHaveBeenCalledWith([60, 40], 0);
    expect(mockEnd).toHaveBeenCalled();

    // layout vertical
    fireEvent.mouseDown(container?.querySelectorAll('.ant-splitter-bar')[2]!, {
      clientX: 0,
      clientY: 0,
    });
    expect(container?.querySelector('.ant-splitter-resizing')).toBeTruthy();
    fireEvent.mouseMove(document.documentElement, { clientY: 80 });
    await waitFakeTimer();
    fireEvent.mouseUp(document.documentElement);
    expect(mockMovingVertical).toHaveBeenCalledWith([70, 30], 0);

    expect(container).toMatchSnapshot();
  });

  it('The min max should work fine.', async () => {
    const mockMoving = jest.fn();
    const { container, rerender } = render(
      <SplitterDemo items={[{ min: 10 }, { max: 60 }, {}, { min: 12 }]} onResize={mockMoving} />,
    );

    await doMove(container, 0, { clientX: -160 });
    expect(mockMoving).toHaveBeenNthCalledWith(1, [10, 40, 25, 25], 0);

    await doMove(container, 1, { clientX: 160 });
    expect(mockMoving).toHaveBeenNthCalledWith(2, [10, 60, 5, 25], 1);

    await doMove(container, 2, { clientX: 60 });
    expect(mockMoving).toHaveBeenNthCalledWith(3, [10, 60, 18, 12], 2);

    rerender(<SplitterDemo items={[{ size: 20 }, {}]} onResize={mockMoving} />);
    await doMove(container, 0, { clientX: -120 });
    expect(mockMoving).toHaveBeenNthCalledWith(4, [0, 100], 0);

    await doMove(container, 0, { clientX: 440 });
    expect(mockMoving).toHaveBeenNthCalledWith(5, [100, 0], 0);

    rerender(<SplitterDemo items={[{ size: 30 }, {}, { max: 60 }]} onResize={mockMoving} />);
    await doMove(container, 1, { clientX: -120 });
    expect(mockMoving).toHaveBeenNthCalledWith(6, [30, 10, 60], 1);
  });

  it('The RTL should work fine.', async () => {
    const mockMoving = jest.fn();
    const { container } = render(
      <ConfigProvider direction="rtl">
        <SplitterDemo items={[{}, {}]} onResize={mockMoving} />
      </ConfigProvider>,
    );

    await doMove(container, 0, { clientX: -80 });
    expect(mockMoving).toHaveBeenNthCalledWith(1, [70, 30], 0);

    await doMove(container, 0, { clientX: 40 });
    expect(mockMoving).toHaveBeenNthCalledWith(2, [60, 40], 0);
  });

  it('Nested combinations should work fine.', () => {
    const { container } = render(
      <Splitter
        layout="vertical"
        style={{ height: 300, borderRadius: 4, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
      >
        <Splitter.Panel>
          <Splitter>
            <Splitter.Panel>
              <div>111</div>
            </Splitter.Panel>

            <Splitter.Panel>
              <Splitter layout="vertical">
                <Splitter.Panel>
                  <div>111</div>
                </Splitter.Panel>

                <Splitter.Panel>
                  <div>111</div>
                </Splitter.Panel>
              </Splitter>
            </Splitter.Panel>

            <Splitter.Panel>
              <div>2222</div>
            </Splitter.Panel>
          </Splitter>
        </Splitter.Panel>

        <Splitter.Panel>
          <SplitterDemo
            items={[
              { size: 10, className: 'wanpan-panel', style: { background: 'red' } },
              { max: 75 },
              {},
            ]}
          />
        </Splitter.Panel>
      </Splitter>,
    );

    expect(container?.querySelector('.wanpan-panel')).toBeTruthy();
    expect(container?.querySelector('.wanpan-panel')?.nextSibling?.nextSibling).toHaveStyle({
      'flex-basis': '45%',
    });
    expect(container?.querySelector('.wanpan-panel')).toHaveStyle({
      background: 'red',
      'flex-basis': '10%',
    });
    expect(container).toMatchSnapshot();
  });

  it('Collapsible should work properly at all times when using pixel units.', async () => {
    const { container } = render(
      <SplitterDemo items={[{ size: '100px', collapsible: true }, {}]} />,
    );

    const panels = container?.querySelectorAll('.ant-splitter-panel');
    expect(panels?.[0]).toHaveStyle('flex-basis: 25%');
    expect(panels?.[1]).toHaveStyle('flex-basis: 75%');

    await doMove(container, 0, { clientX: -160 });
    expect(panels?.[0]).toHaveStyle('flex-basis: 0%');
    expect(panels?.[1]).toHaveStyle('flex-basis: 100%');

    fireEvent.click(container?.querySelector('.ant-splitter-bar-collapse-next')!);
    expect(panels?.[0]).toHaveStyle('flex-basis: 25%');
    expect(panels?.[1]).toHaveStyle('flex-basis: 75%');
  });

  it('Collapsible should work properly when using multiple panels.', async () => {
    const { container } = render(
      <SplitterDemo items={[{ size: 22, collapsible: true }, {}, {}, {}, {}]} />,
    );

    fireEvent.click(container?.querySelector('.ant-splitter-bar-collapse-next')!);
    await doMove(container, 1, { clientX: 40 });
    await doMove(container, 2, { clientX: 40 });
    expect(container?.querySelectorAll('.ant-splitter-panel')[0]).toHaveStyle('flex-basis: 41.5%');
    expect(container?.querySelectorAll('.ant-splitter-panel')[1]).toHaveStyle('flex-basis: 10%');
    expect(container?.querySelectorAll('.ant-splitter-panel')[2]).toHaveStyle('flex-basis: 19.5%');
    expect(container?.querySelectorAll('.ant-splitter-panel')[3]).toHaveStyle('flex-basis: 9.5%');
    expect(container?.querySelectorAll('.ant-splitter-panel')[4]).toHaveStyle('flex-basis: 19.5%');

    fireEvent.click(container?.querySelector('.ant-splitter-bar-collapse-next')!);
    expect(container?.querySelectorAll('.ant-splitter-bar')[0]).toHaveStyle('flex-basis: 2px');
    expect(container?.querySelectorAll('.ant-splitter-panel')[0]).toHaveStyle('flex-basis: 51.5%');
    expect(container?.querySelectorAll('.ant-splitter-panel')[1]).toHaveStyle('flex-basis: 0%');

    fireEvent.click(container?.querySelector('.ant-splitter-bar-collapse-previous')!);
    expect(container?.querySelectorAll('.ant-splitter-bar')[0]).not.toHaveStyle('flex-basis: 2px');
    expect(container?.querySelectorAll('.ant-splitter-panel')[0]).toHaveStyle('flex-basis: 41.5%');
    expect(container?.querySelectorAll('.ant-splitter-panel')[1]).toHaveStyle('flex-basis: 10%');
  });
});
