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
    // 修改 container 大小为添加操作杆后的大小 以便于测试
    global.HTMLElement.prototype.getBoundingClientRect = () =>
      ({
        height: 406,
        width: 406,
      }) as DOMRect;
    jest.useFakeTimers();

    const { container } = render(
      <SplitterDemo
        items={[{ defaultSize: 20 }, { defaultSize: '45%' }, { defaultSize: '40px' }, {}]}
      />,
    );

    await waitFakeTimer();

    expect(container?.querySelectorAll('.ant-splitter-panel')?.[0]).toHaveStyle(
      'flex-basis: calc(20% - 1.5px)',
    );
    expect(container?.querySelectorAll('.ant-splitter-panel')?.[1]).toHaveStyle(
      'flex-basis: calc(45% - 1.5px)',
    );
    expect(container?.querySelectorAll('.ant-splitter-panel')?.[2]).toHaveStyle(
      'flex-basis: calc(10% - 1.5px)',
    );
    expect(container?.querySelectorAll('.ant-splitter-panel')?.[3]).toHaveStyle(
      'flex-basis: calc(25% - 1.5px)',
    );
  });

  it('The layout should work fine.', () => {
    const { container, rerender } = render(<SplitterDemo />);
    expect(container?.querySelector('.ant-splitter-horizontal')).toBeTruthy();

    rerender(<SplitterDemo items={[{}, {}, {}]} layout="vertical" />);
    expect(container?.querySelector('.ant-splitter-vertical')).toBeTruthy();
  });

  it('The resizable should work fine.', () => {
    const { container } = render(
      <SplitterDemo items={[{ defaultSize: 20 }, { resizable: false }, {}]} />,
    );

    expect(container?.querySelectorAll('.ant-splitter-bar-resizable')?.length).toBe(1);
  });

  it('The collapsible should work fine.', () => {
    const { container, rerender } = render(
      <SplitterDemo items={[{ defaultSize: 20, collapsible: true }, {}]} />,
    );

    expect(container?.querySelectorAll('.ant-splitter-bar-collapse-icon')?.length).toBe(2);
    expect(container?.querySelector('.ant-splitter-bar-collapse-previous')).toBeTruthy();
    expect(container?.querySelector('.ant-splitter-bar-collapse-next')).toBeTruthy();

    // support collapsible is object
    rerender(
      <SplitterDemo
        items={[
          {
            defaultSize: 20,
            collapsible: {
              prev: true,
            },
          },
          {
            collapsible: {
              next: true,
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
              prev: true,
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
    expect(container?.querySelectorAll('.ant-splitter-panel')[0]).toHaveStyle(
      'flex-basis: calc(0% - 1px)',
    );
    expect(container?.querySelectorAll('.ant-splitter-panel')[1]).toHaveStyle(
      'flex-basis: calc(100% - 1px)',
    );

    rerender(
      <SplitterDemo
        items={[
          {
            size: 60,
            collapsible: {
              next: true,
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
    expect(container?.querySelectorAll('.ant-splitter-panel')[0]).toHaveStyle(
      'flex-basis: calc(100% - 1px)',
    );
    expect(container?.querySelectorAll('.ant-splitter-panel')[1]).toHaveStyle(
      'flex-basis: calc(0% - 1px)',
    );

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
    expect(container?.querySelectorAll('.ant-splitter-panel')[0]).toHaveStyle(
      'flex-basis: calc(100% - 1px)',
    );
    expect(container?.querySelectorAll('.ant-splitter-panel')[1]).toHaveStyle(
      'flex-basis: calc(0% - 1px)',
    );

    fireEvent.click(container?.querySelector('.ant-splitter-bar-collapse-previous')!);
    expect(container?.querySelector('.ant-splitter-bar-collapse-previous')).toBeTruthy();
    expect(container?.querySelector('.ant-splitter-bar-collapse-next')).toBeTruthy();
    expect(container?.querySelectorAll('.ant-splitter-panel')[0]).toHaveStyle(
      'flex-basis: calc(10% - 1px)',
    );
    expect(container?.querySelectorAll('.ant-splitter-panel')[1]).toHaveStyle(
      'flex-basis: calc(90% - 1px)',
    );

    fireEvent.click(container?.querySelector('.ant-splitter-bar-collapse-previous')!);
    expect(container?.querySelector('.ant-splitter-bar-collapse-previous')).toBeFalsy();
    expect(container?.querySelector('.ant-splitter-bar-collapse-next')).toBeTruthy();
    expect(container?.querySelectorAll('.ant-splitter-panel')[0]).toHaveStyle(
      'flex-basis: calc(0% - 1px)',
    );
    expect(container?.querySelectorAll('.ant-splitter-panel')[1]).toHaveStyle(
      'flex-basis: calc(100% - 1px)',
    );

    fireEvent.click(container?.querySelector('.ant-splitter-bar-collapse-next')!);
    expect(container?.querySelector('.ant-splitter-bar-collapse-previous')).toBeTruthy();
    expect(container?.querySelector('.ant-splitter-bar-collapse-next')).toBeTruthy();
    expect(container?.querySelectorAll('.ant-splitter-panel')[0]).toHaveStyle(
      'flex-basis: calc(10% - 1px)',
    );
    expect(container?.querySelectorAll('.ant-splitter-panel')[1]).toHaveStyle(
      'flex-basis: calc(90% - 1px)',
    );
  });

  it('The mousemove should work fine.', async () => {
    // 修改 container 大小为添加操作杆后的大小 以便于测试
    global.HTMLElement.prototype.getBoundingClientRect = () =>
      ({
        height: 402,
        width: 402,
      }) as DOMRect;
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
  });

  it('The RTL should work fine.', async () => {
    global.HTMLElement.prototype.getBoundingClientRect = () =>
      ({
        height: 402,
        width: 402,
      }) as DOMRect;
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
});
