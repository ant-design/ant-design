import React from 'react';
import { CaretLeftOutlined, CaretRightOutlined, ColumnWidthOutlined } from '@ant-design/icons';
import { spyElementPrototypes } from '@rc-component/util/lib/test/domHook';
import type { GetProps, SplitterProps } from 'antd';
import { ConfigProvider, Splitter } from 'antd';

import type { Orientation } from '../../_util/hooks';
import { resetWarned } from '../../_util/warning';
import {
  act,
  createEvent,
  fireEvent,
  render,
  triggerResize,
  waitFakeTimer,
} from '../../../tests/utils';
import SplitBar from '../SplitBar';

type PanelProps = GetProps<typeof Splitter.Panel>;

const resizeSplitter = async () => {
  triggerResize(document.body.querySelector<HTMLElement>('.ant-splitter')!);
  await waitFakeTimer();
};

const SplitterDemo: React.FC<Readonly<{ items?: PanelProps[] } & SplitterProps>> = ({
  items = [{}, {}],
  ...props
}) => (
  <Splitter {...props}>
    {items?.map((item, idx) => {
      const key = `panel-${idx}`;
      return <Splitter.Panel key={key} {...item} />;
    })}
  </Splitter>
);

describe('Splitter', () => {
  const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  let containerSize = 100;

  beforeAll(() => {
    spyElementPrototypes(HTMLElement, {
      offsetWidth: {
        get: () => containerSize,
      },
      offsetHeight: {
        get: () => containerSize,
      },
    });
  });

  beforeEach(() => {
    containerSize = 100;
    errSpy.mockReset();
    resetWarned();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should correct render', () => {
    const { container } = render(<SplitterDemo />);
    expect(container.querySelector('.ant-splitter')).toBeTruthy();
    expect(container.querySelectorAll('.ant-splitter-panel')).toHaveLength(2);
    expect(container.querySelector('.ant-splitter-bar')).toBeTruthy();
  });

  it('should correct render panel size', async () => {
    const { container } = render(<SplitterDemo items={[{ size: 20 }, { size: '45%' }, {}]} />);

    await resizeSplitter();

    const panels = container.querySelectorAll('.ant-splitter-panel');

    expect(panels?.[0]).toHaveStyle('flex-basis: 20px');
    expect(panels?.[1]).toHaveStyle('flex-basis: 45px');
    expect(panels?.[2]).toHaveStyle('flex-basis: 35px');
  });

  describe('onDraggerDoubleClick', () => {
    it('should trigger onDraggerDoubleClick when clicking within 300ms', () => {
      const onDraggerDoubleClick = jest.fn();
      const { container } = render(
        <SplitterDemo items={[{}, {}]} onDraggerDoubleClick={onDraggerDoubleClick} />,
      );
      const dragger = container.querySelector('.ant-splitter-bar-dragger')!;

      fireEvent.doubleClick(dragger);

      act(() => {
        jest.advanceTimersByTime(200);
      });

      fireEvent.mouseDown(dragger);

      expect(onDraggerDoubleClick).toHaveBeenCalledTimes(1);
      expect(onDraggerDoubleClick).toHaveBeenCalledWith(0);
    });

    it('should NOT trigger onDraggerDoubleClick when time gap > 300ms', () => {
      const onDraggerDoubleClick = jest.fn();
      const { container } = render(
        <SplitterDemo items={[{}, {}]} onDraggerDoubleClick={onDraggerDoubleClick} />,
      );
      const dragger = container.querySelector('.ant-splitter-bar-dragger')!;

      fireEvent.mouseDown(dragger);
      fireEvent.mouseUp(dragger);
      fireEvent.click(dragger);

      act(() => {
        jest.advanceTimersByTime(400);
      });

      fireEvent.mouseDown(dragger);
      fireEvent.mouseUp(dragger);
      fireEvent.click(dragger);

      expect(onDraggerDoubleClick).not.toHaveBeenCalled();
    });

    it('should trigger with correct index for multiple splitters', () => {
      const onDraggerDoubleClick = jest.fn();
      const { container } = render(
        <SplitterDemo items={[{}, {}, {}]} onDraggerDoubleClick={onDraggerDoubleClick} />,
      );

      const draggers = container.querySelectorAll('.ant-splitter-bar-dragger');
      const secondDragger = draggers[1];

      fireEvent.doubleClick(secondDragger);

      act(() => {
        jest.advanceTimersByTime(100);
      });

      fireEvent.doubleClick(secondDragger);

      expect(onDraggerDoubleClick).toHaveBeenCalledWith(1);
    });

    it('should stop propagation to allow nested splitter usage', () => {
      const onOuterDoubleClick = jest.fn();
      const onInnerDoubleClick = jest.fn();

      const { getByTestId } = render(
        <Splitter onDraggerDoubleClick={onOuterDoubleClick}>
          <Splitter.Panel>Outer Left</Splitter.Panel>
          <Splitter.Panel>
            <div data-testid="inner-wrapper">
              <Splitter onDraggerDoubleClick={onInnerDoubleClick}>
                <Splitter.Panel>Inner Top</Splitter.Panel>
                <Splitter.Panel>Inner Bottom</Splitter.Panel>
              </Splitter>
            </div>
          </Splitter.Panel>
        </Splitter>,
      );

      const innerWrapper = getByTestId('inner-wrapper');
      const innerDragger = innerWrapper.querySelector('.ant-splitter-bar-dragger')!;

      fireEvent.doubleClick(innerDragger);
      act(() => {
        jest.advanceTimersByTime(100);
      });
      fireEvent.doubleClick(innerDragger);

      expect(onInnerDoubleClick).toHaveBeenCalled();
      expect(onOuterDoubleClick).not.toHaveBeenCalled();
    });

    it('should prevent drag start (return early) when mouse down happens within 300ms', () => {
      const onOffsetStart = jest.fn();

      const { container } = render(
        <SplitBar
          index={0}
          active={false}
          prefixCls="ant-splitter"
          rootPrefixCls="ant"
          resizable
          vertical={false}
          startCollapsible
          endCollapsible
          showStartCollapsibleIcon
          showEndCollapsibleIcon
          containerSize={500}
          ariaNow={50}
          ariaMin={0}
          ariaMax={100}
          onOffsetStart={onOffsetStart}
          onOffsetUpdate={jest.fn()}
          onOffsetEnd={jest.fn()}
          onCollapse={jest.fn()}
        />,
      );

      const dragger = container.querySelector('.ant-splitter-bar-dragger')!;

      fireEvent.mouseDown(dragger);

      expect(onOffsetStart).toHaveBeenCalledTimes(1);

      fireEvent.mouseUp(dragger);

      act(() => {
        jest.advanceTimersByTime(200);
      });

      fireEvent.mouseDown(dragger);

      expect(onOffsetStart).toHaveBeenCalledTimes(1);
    });
  });

  it('The layout should work fine', () => {
    const { container, rerender } = render(<SplitterDemo />);
    expect(container.querySelector('.ant-splitter-horizontal')).toBeTruthy();

    rerender(<SplitterDemo items={[{}, {}, {}]} orientation="vertical" />);
    expect(container.querySelector('.ant-splitter-vertical')).toBeTruthy();
  });

  it('The resizable should work fine', () => {
    const { container, rerender } = render(
      <SplitterDemo items={[{ size: 20 }, { resizable: false }, {}]} />,
    );
    expect(container.querySelectorAll('.ant-splitter-bar-dragger')).toHaveLength(2);
    expect(container.querySelectorAll('.ant-splitter-bar-dragger-disabled')).toHaveLength(2);

    rerender(<SplitterDemo items={[{ size: 20 }, {}, { resizable: false }]} />);
    expect(container.querySelectorAll('.ant-splitter-bar-dragger')).toHaveLength(2);
    expect(container.querySelectorAll('.ant-splitter-bar-dragger-disabled')).toHaveLength(1);
  });

  it('Splitter.Panel is syntactic sugar', () => {
    const { container } = render(<Splitter.Panel />);
    expect(container.innerHTML).toEqual('');
  });

  // ============================== Resizable ==============================
  describe('drag', () => {
    function mockDrag(draggerEle: HTMLElement, offset: number, container?: HTMLElement) {
      // Down
      const downEvent = createEvent.mouseDown(draggerEle);
      Object.defineProperty(downEvent, 'pageX', { value: 0 });
      Object.defineProperty(downEvent, 'pageY', { value: 0 });

      fireEvent(draggerEle, downEvent);

      // Move
      const moveEvent = createEvent.mouseMove(draggerEle);
      Object.defineProperty(moveEvent, 'pageX', { value: offset });
      Object.defineProperty(moveEvent, 'pageY', { value: offset });

      fireEvent(draggerEle, moveEvent);

      // mask should exist
      if (container) {
        expect(container.querySelector('.ant-splitter-mask')).toBeTruthy();
      }

      // Up
      fireEvent.mouseUp(draggerEle);
    }

    function mockTouchDrag(draggerEle: HTMLElement, offset: number) {
      // Down
      const touchStart = createEvent.touchStart(draggerEle, {
        touches: [{}],
      });
      Object.defineProperty(touchStart, 'touches', { value: [{ pageX: 0, pageY: 0 }] });
      fireEvent(draggerEle, touchStart);

      // Move
      const touchMove = createEvent.touchMove(draggerEle, {
        touches: [{}],
      });
      Object.defineProperty(touchMove, 'touches', { value: [{ pageX: offset, pageY: offset }] });
      fireEvent(draggerEle, touchMove);

      // Up
      fireEvent.touchEnd(draggerEle);
    }

    it('The mousemove should work fine', async () => {
      const onResize = jest.fn();
      const onResizeEnd = jest.fn();

      const { container } = render(
        <SplitterDemo items={[{}, {}]} onResize={onResize} onResizeEnd={onResizeEnd} />,
      );

      await resizeSplitter();

      // Right
      mockDrag(container.querySelector('.ant-splitter-bar-dragger')!, 40, container);
      expect(onResize).toHaveBeenCalledWith([90, 10]);
      expect(onResizeEnd).toHaveBeenCalledTimes(1);
      expect(onResizeEnd).toHaveBeenCalledWith([90, 10]);

      // Left
      mockDrag(container.querySelector('.ant-splitter-bar-dragger')!, -200);
      expect(onResize).toHaveBeenCalledWith([0, 100]);
      expect(onResizeEnd).toHaveBeenCalledWith([0, 100]);

      // mask should hide
      expect(container.querySelector('.ant-splitter-mask')).toBeFalsy();
    });

    it('The touchMove should work fine', async () => {
      const onResize = jest.fn();
      const onResizeEnd = jest.fn();

      const { container } = render(
        <SplitterDemo items={[{}, {}]} onResize={onResize} onResizeEnd={onResizeEnd} />,
      );

      await resizeSplitter();

      // Right
      mockTouchDrag(container.querySelector('.ant-splitter-bar-dragger')!, 40);
      expect(onResize).toHaveBeenCalledWith([90, 10]);
      expect(onResizeEnd).toHaveBeenCalledTimes(1);
      expect(onResizeEnd).toHaveBeenCalledWith([90, 10]);

      // Left
      mockTouchDrag(container.querySelector('.ant-splitter-bar-dragger')!, -200);
      expect(onResize).toHaveBeenCalledWith([0, 100]);
      expect(onResizeEnd).toHaveBeenCalledWith([0, 100]);
    });

    it('with min', async () => {
      const onResize = jest.fn();
      const onResizeEnd = jest.fn();

      const { container } = render(
        <SplitterDemo items={[{ min: 10 }, {}]} onResize={onResize} onResizeEnd={onResizeEnd} />,
      );

      await resizeSplitter();

      mockDrag(container.querySelector('.ant-splitter-bar-dragger')!, -100);
      expect(onResize).toHaveBeenCalledWith([10, 90]);
      expect(onResizeEnd).toHaveBeenCalledWith([10, 90]);
    });

    it('with max', async () => {
      const onResize = jest.fn();
      const onResizeEnd = jest.fn();

      const { container } = render(
        <SplitterDemo items={[{ max: 90 }, {}]} onResize={onResize} onResizeEnd={onResizeEnd} />,
      );

      await resizeSplitter();

      mockDrag(container.querySelector('.ant-splitter-bar-dragger')!, 100);

      expect(onResize).toHaveBeenCalledWith([90, 10]);
      expect(onResizeEnd).toHaveBeenCalledWith([90, 10]);
    });

    it('both panel has min and max', async () => {
      const onResize = jest.fn();
      const onResizeEnd = jest.fn();

      const { container } = render(
        <SplitterDemo
          items={[
            { min: 10, max: 80 },
            { min: 10, max: 80 },
          ]}
          onResize={onResize}
          onResizeEnd={onResizeEnd}
        />,
      );

      await resizeSplitter();

      mockDrag(container.querySelector('.ant-splitter-bar-dragger')!, -100);
      expect(onResize).toHaveBeenCalledWith([20, 80]);
      expect(onResizeEnd).toHaveBeenCalledWith([20, 80]);

      mockDrag(container.querySelector('.ant-splitter-bar-dragger')!, 100);
      expect(onResize).toHaveBeenCalledWith([80, 20]);
      expect(onResizeEnd).toHaveBeenCalledWith([80, 20]);
    });

    it('rtl', async () => {
      const onResize = jest.fn();
      const onResizeEnd = jest.fn();

      const { container } = render(
        <ConfigProvider direction="rtl">
          <SplitterDemo items={[{}, {}]} onResize={onResize} onResizeEnd={onResizeEnd} />
        </ConfigProvider>,
      );

      await resizeSplitter();

      mockDrag(container.querySelector('.ant-splitter-bar-dragger')!, -40);
      expect(onResize).toHaveBeenCalledWith([90, 10]);
      expect(onResizeEnd).toHaveBeenCalledWith([90, 10]);
    });

    it('[true, 0, true] can be move left', async () => {
      const onResize = jest.fn();
      const onResizeEnd = jest.fn();

      const { container } = render(
        <SplitterDemo
          items={[{}, { defaultSize: 0 }, {}]}
          onResize={onResize}
          onResizeEnd={onResizeEnd}
        />,
      );

      await resizeSplitter();

      mockDrag(container.querySelectorAll<HTMLDivElement>('.ant-splitter-bar-dragger')[1], -100);
      expect(onResize).toHaveBeenCalledWith([0, 50, 50]);
      expect(onResizeEnd).toHaveBeenCalledWith([0, 50, 50]);
    });

    it('[false, 0, true] can not be move left', async () => {
      const onResize = jest.fn();
      const onResizeEnd = jest.fn();

      const { container } = render(
        <SplitterDemo
          items={[{ resizable: false }, { defaultSize: 0 }, {}]}
          onResize={onResize}
          onResizeEnd={onResizeEnd}
        />,
      );

      await resizeSplitter();

      mockDrag(container.querySelectorAll<HTMLDivElement>('.ant-splitter-bar-dragger')[1], -100);
      expect(onResize).toHaveBeenCalledWith([50, 0, 50]);
      expect(onResizeEnd).toHaveBeenCalledWith([50, 0, 50]);
    });

    it("aria-valuemin/aria-valuemax should not set NaN When container's width be setting zero", async () => {
      containerSize = 0;
      const App: React.FC = () => {
        return <SplitterDemo items={[{}, {}, {}]} />;
      };
      const { container } = render(<App />);

      await resizeSplitter();

      mockDrag(container.querySelectorAll<HTMLDivElement>('.ant-splitter-bar-dragger')[1], -100);
      triggerResize(container.querySelector('.ant-splitter')!);
      await act(async () => {
        await waitFakeTimer();
      });

      expect(errSpy).not.toHaveBeenCalled();
      expect(container.querySelector('[aria-valuemin]')?.getAttribute('aria-valuemin')).not.toBe(
        'NaN',
      );
      expect(container.querySelector('[aria-valuemax]')?.getAttribute('aria-valuemax')).not.toBe(
        'NaN',
      );
    });
  });

  // ============================= Collapsible =============================
  describe('collapsible', () => {
    it('Basic', async () => {
      const { container, rerender } = render(
        <SplitterDemo items={[{ size: 20, collapsible: true }, { collapsible: true }]} />,
      );

      await resizeSplitter();

      expect(container.querySelectorAll('.ant-splitter-bar-collapse-icon')).toHaveLength(2);
      expect(container.querySelector('.ant-splitter-bar-collapse-start')).toBeTruthy();
      expect(container.querySelector('.ant-splitter-bar-collapse-end')).toBeTruthy();

      // support collapsible is object
      rerender(
        <SplitterDemo
          items={[
            {
              size: 20,
              collapsible: true,
            },
            {
              collapsible: true,
            },
            {},
          ]}
        />,
      );

      expect(container.querySelectorAll('.ant-splitter-bar-collapse-start')).toHaveLength(2);
      expect(container.querySelectorAll('.ant-splitter-bar-collapse-end')).toHaveLength(1);
    });

    it('collapsible - true', async () => {
      const onResize = jest.fn();
      const onResizeEnd = jest.fn();

      const { container } = render(
        <SplitterDemo
          items={[
            {
              size: 20,
              collapsible: true,
            },
            {},
          ]}
          onResize={onResize}
          onResizeEnd={onResizeEnd}
        />,
      );

      await resizeSplitter();

      fireEvent.click(container.querySelector('.ant-splitter-bar-collapse-start')!);
      expect(onResize).toHaveBeenCalledWith([0, 100]);
      expect(onResizeEnd).toHaveBeenCalledWith([0, 100]);
    });

    it('collapsible - start:true', async () => {
      const onResize = jest.fn();
      const onResizeEnd = jest.fn();

      const { container } = render(
        <SplitterDemo
          items={[
            {},
            {
              size: 20,
              collapsible: {
                start: true,
              },
            },
            {},
          ]}
          onResize={onResize}
          onResizeEnd={onResizeEnd}
        />,
      );

      await resizeSplitter();

      expect(container.querySelector('.ant-splitter-bar-collapse-start')).toBeFalsy();
      expect(container.querySelector('.ant-splitter-bar-collapse-end')).toBeTruthy();

      fireEvent.click(container.querySelector('.ant-splitter-bar-collapse-end')!);
      expect(onResize).toHaveBeenCalledWith([60, 0, 40]);
      expect(onResizeEnd).toHaveBeenCalledWith([60, 0, 40]);
    });

    it('collapsible - end:true', async () => {
      const onResize = jest.fn();
      const onResizeEnd = jest.fn();

      const { container } = render(
        <SplitterDemo
          items={[
            {},
            {
              size: 20,
              collapsible: {
                end: true,
              },
            },
            {},
          ]}
          onResize={onResize}
          onResizeEnd={onResizeEnd}
        />,
      );

      await resizeSplitter();

      expect(container.querySelector('.ant-splitter-bar-collapse-start')).toBeTruthy();
      expect(container.querySelector('.ant-splitter-bar-collapse-end')).toBeFalsy();

      fireEvent.click(container.querySelector('.ant-splitter-bar-collapse-start')!);
      expect(onResize).toHaveBeenCalledWith([40, 0, 60]);
      expect(onResizeEnd).toHaveBeenCalledWith([40, 0, 60]);
    });

    it('collapsible - showCollapsibleIcon:true', async () => {
      const { container, rerender } = render(
        <SplitterDemo
          items={[
            {},
            {
              collapsible: {
                start: true,
                end: true,
                showCollapsibleIcon: true,
              },
            },
            {},
          ]}
        />,
      );
      await resizeSplitter();
      expect(
        container.querySelectorAll('.ant-splitter-bar-collapse-bar-always-visible'),
      ).toHaveLength(2);

      rerender(
        <SplitterDemo
          items={[
            {},
            {
              collapsible: {
                start: true,
                end: false,
                showCollapsibleIcon: true,
              },
            },
            {},
          ]}
        />,
      );
      await resizeSplitter();
      expect(
        container.querySelectorAll('.ant-splitter-bar-collapse-bar-always-visible'),
      ).toHaveLength(1);

      rerender(
        <SplitterDemo
          items={[
            {
              collapsible: {
                start: true,
                end: true,
                showCollapsibleIcon: true,
              },
            },
            {
              collapsible: {
                start: true,
                end: true,
                showCollapsibleIcon: true,
              },
            },
            {
              collapsible: {
                start: true,
                end: true,
                showCollapsibleIcon: true,
              },
            },
          ]}
        />,
      );
      await resizeSplitter();

      expect(
        container.querySelectorAll('.ant-splitter-bar-collapse-bar-always-visible'),
      ).toHaveLength(4);
      fireEvent.click(container.querySelectorAll('.ant-splitter-bar-collapse-start')[0]);
      expect(
        container.querySelectorAll('.ant-splitter-bar-collapse-bar-always-visible'),
      ).toHaveLength(3);
      expect(container.querySelectorAll('.ant-splitter-bar-collapse-bar-end')).toHaveLength(2);
      expect(container.querySelectorAll('.ant-splitter-bar-collapse-bar-start')).toHaveLength(1);

      fireEvent.click(container.querySelectorAll('.ant-splitter-bar-collapse-end')[0]);
      fireEvent.click(container.querySelectorAll('.ant-splitter-bar-collapse-end')[0]);
      expect(
        container.querySelectorAll('.ant-splitter-bar-collapse-bar-always-visible'),
      ).toHaveLength(2);
      expect(container.querySelectorAll('.ant-splitter-bar-collapse-bar-start')).toHaveLength(1);
      expect(container.querySelectorAll('.ant-splitter-bar-collapse-bar-end')).toHaveLength(1);

      fireEvent.click(container.querySelectorAll('.ant-splitter-bar-collapse-end')[0]);
      expect(
        container.querySelectorAll('.ant-splitter-bar-collapse-bar-always-visible'),
      ).toHaveLength(4);
    });

    it('collapsible - showCollapsibleIcon:false', async () => {
      const { container, rerender } = render(
        <SplitterDemo
          items={[
            {
              collapsible: {
                start: true,
                end: true,
                showCollapsibleIcon: false,
              },
            },
            {
              collapsible: {
                start: true,
                end: true,
                showCollapsibleIcon: false,
              },
            },
          ]}
        />,
      );
      await resizeSplitter();
      expect(
        container.querySelectorAll('.ant-splitter-bar-collapse-bar-always-hidden'),
      ).toHaveLength(2);

      rerender(
        <SplitterDemo
          items={[
            {
              collapsible: {
                start: true,
                end: true,
                showCollapsibleIcon: false,
              },
            },
            {
              size: 0,
              collapsible: {
                start: true,
                end: true,
                showCollapsibleIcon: false,
              },
            },
            {
              collapsible: {
                start: true,
                end: true,
                showCollapsibleIcon: false,
              },
            },
          ]}
        />,
      );

      await resizeSplitter();
      expect(
        container.querySelectorAll('.ant-splitter-bar-collapse-bar-always-hidden'),
      ).toHaveLength(2);
    });

    it('collapsible - showCollapsibleIcon:auto', async () => {
      // Default: auto
      const { container, rerender } = render(
        <SplitterDemo
          items={[
            {},
            {
              collapsible: true,
            },
            {},
          ]}
        />,
      );
      await resizeSplitter();
      expect(container.querySelectorAll('.ant-splitter-bar-collapse-bar-hover-only')).toHaveLength(
        2,
      );

      rerender(
        <SplitterDemo
          items={[
            {},
            {
              collapsible: {
                start: true,
              },
            },
            {},
          ]}
        />,
      );
      await resizeSplitter();
      expect(container.querySelectorAll('.ant-splitter-bar-collapse-bar-hover-only')).toHaveLength(
        1,
      );

      rerender(
        <SplitterDemo
          items={[
            {},
            {
              collapsible: {
                start: true,
                end: true,
                showCollapsibleIcon: 'auto',
              },
            },
            {},
          ]}
        />,
      );
      await resizeSplitter();
      expect(container.querySelectorAll('.ant-splitter-bar-collapse-bar-hover-only')).toHaveLength(
        2,
      );
    });

    it('both collapsible', async () => {
      const onResize = jest.fn();
      const onResizeEnd = jest.fn();

      const { container } = render(
        <SplitterDemo
          items={[
            {
              collapsible: true,
            },
            {
              collapsible: true,
            },
          ]}
          onResize={onResize}
          onResizeEnd={onResizeEnd}
        />,
      );

      await resizeSplitter();

      function expectClick(element: HTMLElement, size: number[]) {
        onResize.mockReset();
        onResizeEnd.mockReset();

        fireEvent.click(element);
        expect(onResize).toHaveBeenCalledWith(size);
        expect(onResizeEnd).toHaveBeenCalledWith(size);
      }

      expectClick(container.querySelector('.ant-splitter-bar-collapse-start')!, [0, 100]);
      expectClick(container.querySelector('.ant-splitter-bar-collapse-end')!, [50, 50]);
      expectClick(container.querySelector('.ant-splitter-bar-collapse-end')!, [100, 0]);
      expectClick(container.querySelector('.ant-splitter-bar-collapse-start')!, [50, 50]);
    });

    it('collapsible with cache', async () => {
      const onResize = jest.fn();
      const onResizeEnd = jest.fn();

      const { container } = render(
        <SplitterDemo
          items={[
            {
              defaultSize: 20,
              collapsible: true,
              min: 10,
            },
            {
              collapsible: true,
              min: '80%',
            },
          ]}
          onResize={onResize}
          onResizeEnd={onResizeEnd}
        />,
      );

      await resizeSplitter();

      // Collapse left
      fireEvent.click(container.querySelector('.ant-splitter-bar-collapse-start')!);
      expect(onResize).toHaveBeenCalledWith([0, 100]);
      expect(onResizeEnd).toHaveBeenCalledWith([0, 100]);
      expect(container.querySelector('.ant-splitter-bar-dragger-disabled')).toBeTruthy();

      // Collapse back
      onResize.mockReset();
      onResizeEnd.mockReset();
      fireEvent.click(container.querySelector('.ant-splitter-bar-collapse-end')!);
      expect(onResize).toHaveBeenCalledWith([20, 80]);
      expect(onResizeEnd).toHaveBeenCalledWith([20, 80]);
      expect(container.querySelector('.ant-splitter-bar-dragger-disabled')).toBeFalsy();

      // Collapse right
      onResize.mockReset();
      onResizeEnd.mockReset();
      fireEvent.click(container.querySelector('.ant-splitter-bar-collapse-end')!);
      expect(onResize).toHaveBeenCalledWith([100, 0]);
      expect(onResizeEnd).toHaveBeenCalledWith([100, 0]);
      expect(container.querySelector('.ant-splitter-bar-dragger-disabled')).toBeTruthy();
    });

    it('collapsible with fallback', async () => {
      const onResize = jest.fn();
      const onResizeEnd = jest.fn();

      containerSize = 500;

      const { container } = render(
        <SplitterDemo
          items={[
            {
              defaultSize: 300,
              collapsible: true,
              max: 200,
            },
            {
              collapsible: true,
            },
          ]}
          onResize={onResize}
          onResizeEnd={onResizeEnd}
        />,
      );

      await resizeSplitter();

      // Collapse left
      fireEvent.click(container.querySelector('.ant-splitter-bar-collapse-start')!);
      expect(onResize).toHaveBeenCalledWith([0, 500]);
      expect(onResizeEnd).toHaveBeenCalledWith([0, 500]);

      // Collapse back
      onResize.mockReset();
      onResizeEnd.mockReset();
      fireEvent.click(container.querySelector('.ant-splitter-bar-collapse-end')!);
      expect(onResize).toHaveBeenCalledWith([100, 400]);
      expect(onResizeEnd).toHaveBeenCalledWith([100, 400]);

      // Collapse right
      onResize.mockReset();
      onResizeEnd.mockReset();
      fireEvent.click(container.querySelector('.ant-splitter-bar-collapse-end')!);
      expect(onResize).toHaveBeenCalledWith([500, 0]);
      expect(onResizeEnd).toHaveBeenCalledWith([500, 0]);
    });

    it('collapsible with min', async () => {
      const onResize = jest.fn();
      const onResizeEnd = jest.fn();

      containerSize = 440;

      const { container } = render(
        <SplitterDemo
          items={[
            {
              defaultSize: 100,
              collapsible: true,
              min: 150,
            },
            {
              collapsible: true,
            },
          ]}
          onResize={onResize}
          onResizeEnd={onResizeEnd}
        />,
      );

      await resizeSplitter();

      // Collapse left
      fireEvent.click(container.querySelector('.ant-splitter-bar-collapse-start')!);
      expect(onResize).toHaveBeenCalledWith([0, 440]);
      expect(onResizeEnd).toHaveBeenCalledWith([0, 440]);

      // Collapse back
      onResize.mockReset();
      onResizeEnd.mockReset();
      fireEvent.click(container.querySelector('.ant-splitter-bar-collapse-end')!);
      expect(onResize).toHaveBeenCalledWith([150, 290]);
      expect(onResizeEnd).toHaveBeenCalledWith([150, 290]);

      // Collapse right
      onResize.mockReset();
      onResizeEnd.mockReset();
      fireEvent.click(container.querySelector('.ant-splitter-bar-collapse-end')!);
      expect(onResize).toHaveBeenCalledWith([440, 0]);
      expect(onResizeEnd).toHaveBeenCalledWith([440, 0]);
    });

    it('should trigger onCollapse when collapse button clicked', async () => {
      const onCollapse = jest.fn();
      const { container } = render(
        <SplitterDemo
          items={[{ collapsible: true }, { collapsible: true }]}
          onCollapse={onCollapse}
        />,
      );

      await resizeSplitter();

      fireEvent.click(container.querySelector('.ant-splitter-bar-collapse-start')!);
      expect(onCollapse).toHaveBeenCalledTimes(1);
      expect(onCollapse).toHaveBeenCalledWith([true, false], [0, 100]);

      fireEvent.click(container.querySelector('.ant-splitter-bar-collapse-end')!);
      expect(onCollapse).toHaveBeenCalledTimes(2);
      expect(onCollapse).toHaveBeenCalledWith([false, false], [50, 50]);
    });

    it('should not apply transition class by default', async () => {
      const { container } = render(
        <SplitterDemo items={[{ collapsible: true }, { collapsible: true }]} />,
      );
      await resizeSplitter();

      fireEvent.click(container.querySelector('.ant-splitter-bar-collapse-start')!);
      expect(container.querySelector('.ant-splitter-panel-transition')).toBeFalsy();
    });

    it('should apply transition class during collapse animation', async () => {
      const { container } = render(
        <SplitterDemo collapseAnimation items={[{ collapsible: true }, { collapsible: true }]} />,
      );
      await resizeSplitter();

      expect(container.querySelector('.ant-splitter-panel-transition')).toBeFalsy();

      fireEvent.click(container.querySelector('.ant-splitter-bar-collapse-start')!);
      expect(container.querySelectorAll('.ant-splitter-panel-transition')).toHaveLength(2);

      act(() => {
        jest.advanceTimersByTime(250);
      });
      expect(container.querySelector('.ant-splitter-panel-transition')).toBeFalsy();
    });

    it('should apply transition class during expand animation', async () => {
      const { container } = render(
        <SplitterDemo collapseAnimation items={[{ collapsible: true }, { collapsible: true }]} />,
      );
      await resizeSplitter();

      fireEvent.click(container.querySelector('.ant-splitter-bar-collapse-start')!);
      act(() => {
        jest.advanceTimersByTime(250);
      });

      fireEvent.click(container.querySelector('.ant-splitter-bar-collapse-end')!);
      expect(container.querySelectorAll('.ant-splitter-panel-transition')).toHaveLength(2);

      act(() => {
        jest.advanceTimersByTime(250);
      });
      expect(container.querySelector('.ant-splitter-panel-transition')).toBeFalsy();
    });

    it('should apply transition class in vertical layout', async () => {
      const { container } = render(
        <SplitterDemo
          collapseAnimation
          layout="vertical"
          items={[{ collapsible: true }, { collapsible: true }]}
        />,
      );
      await resizeSplitter();

      fireEvent.click(container.querySelector('.ant-splitter-bar-collapse-start')!);
      expect(container.querySelectorAll('.ant-splitter-panel-transition')).toHaveLength(2);

      act(() => {
        jest.advanceTimersByTime(250);
      });
      expect(container.querySelector('.ant-splitter-panel-transition')).toBeFalsy();
    });

    it('should apply transition class to all panels with multiple panels', async () => {
      const { container } = render(
        <SplitterDemo
          collapseAnimation
          items={[{ collapsible: true }, {}, { collapsible: true }]}
        />,
      );
      await resizeSplitter();

      fireEvent.click(container.querySelector('.ant-splitter-bar-collapse-start')!);
      expect(container.querySelectorAll('.ant-splitter-panel-transition')).toHaveLength(3);

      act(() => {
        jest.advanceTimersByTime(250);
      });
      expect(container.querySelector('.ant-splitter-panel-transition')).toBeFalsy();
    });

    it('should handle rapid collapse clicks correctly', async () => {
      const { container } = render(
        <SplitterDemo collapseAnimation items={[{ collapsible: true }, { collapsible: true }]} />,
      );
      await resizeSplitter();

      // Rapid clicks before animation completes
      fireEvent.click(container.querySelector('.ant-splitter-bar-collapse-start')!);
      expect(container.querySelectorAll('.ant-splitter-panel-transition')).toHaveLength(2);

      act(() => {
        jest.advanceTimersByTime(100);
      });

      // Click again before animation ends
      fireEvent.click(container.querySelector('.ant-splitter-bar-collapse-end')!);
      expect(container.querySelectorAll('.ant-splitter-panel-transition')).toHaveLength(2);

      // Wait for all animations to complete
      act(() => {
        jest.advanceTimersByTime(250);
      });
      expect(container.querySelector('.ant-splitter-panel-transition')).toBeFalsy();
    });

    it('should not apply transition class during drag resize', async () => {
      const { container } = render(
        <SplitterDemo collapseAnimation items={[{ collapsible: true }, { collapsible: true }]} />,
      );
      await resizeSplitter();

      // Simulate drag resize
      const dragger = container.querySelector('.ant-splitter-bar-dragger')!;
      fireEvent.mouseDown(dragger, { clientX: 50 });
      fireEvent.mouseMove(dragger, { clientX: 70 });
      fireEvent.mouseUp(dragger);

      // Should not have transition class during drag
      expect(container.querySelector('.ant-splitter-panel-transition')).toBeFalsy();
    });

    it('should apply transition class with min constraint', async () => {
      const { container } = render(
        <SplitterDemo
          collapseAnimation
          items={[{ collapsible: true, min: 50 }, { collapsible: true }]}
        />,
      );
      await resizeSplitter();

      fireEvent.click(container.querySelector('.ant-splitter-bar-collapse-start')!);
      expect(container.querySelectorAll('.ant-splitter-panel-transition')).toHaveLength(2);

      act(() => {
        jest.advanceTimersByTime(250);
      });
      expect(container.querySelector('.ant-splitter-panel-transition')).toBeFalsy();
    });
  });

  it('auto resize', async () => {
    containerSize = 200;

    const onResize = jest.fn();
    const { container } = render(
      <SplitterDemo
        items={[
          {
            collapsible: true,
          },
          {},
        ]}
        onResize={onResize}
      />,
    );

    triggerResize(container.querySelector('.ant-splitter')!);

    await act(async () => {
      await waitFakeTimer();
    });

    fireEvent.click(container.querySelector('.ant-splitter-bar-collapse-start')!);
    expect(onResize).toHaveBeenCalledWith([0, 200]);
  });

  // ============================= customize =============================
  describe('customize', () => {
    it('customize draggerIcon', () => {
      const { container } = render(
        <SplitterDemo draggerIcon={<ColumnWidthOutlined className="customize-dragger-icon" />} />,
      );
      const draggerEle = container.querySelector('.ant-splitter-bar-dragger')!;

      expect(draggerEle).toHaveClass('ant-splitter-bar-dragger-customize');
      expect(draggerEle.querySelector('.ant-splitter-bar-dragger-icon')).toBeTruthy();
      expect(draggerEle.querySelector('.customize-dragger-icon')).toBeTruthy();
    });

    it('customize collapsibleIcon', async () => {
      const { container } = render(
        <SplitterDemo
          items={[{ size: 20, collapsible: true }, { collapsible: true }]}
          collapsibleIcon={{
            start: <CaretLeftOutlined className="customize-icon-start" />,
            end: <CaretRightOutlined className="customize-icon-end" />,
          }}
        />,
      );

      await resizeSplitter();
      const startEle = container.querySelector('.ant-splitter-bar-collapse-bar-start')!;
      const endEle = container.querySelector('.ant-splitter-bar-collapse-bar-end')!;

      expect(startEle).toHaveClass('ant-splitter-bar-collapse-bar-customize');
      expect(endEle).toHaveClass('ant-splitter-bar-collapse-bar-customize');

      expect(startEle.querySelector('.customize-icon-start')).toBeTruthy();
      expect(endEle.querySelector('.customize-icon-end')).toBeTruthy();

      expect(startEle).toHaveStyle({ background: 'transparent' });
      expect(endEle).toHaveStyle({ background: 'transparent' });
    });

    it('styles', () => {
      const customStyles = {
        root: { background: 'red' },
        panel: { background: 'blue' },
        dragger: { background: 'green' },
      };
      const customClassNames = {
        root: 'custom-root',
        panel: 'custom-panel',
        dragger: { default: 'custom-dragger', active: 'custom-dragger-active' },
      };

      const { container } = render(
        <SplitterDemo styles={customStyles} classNames={customClassNames} />,
      );

      const root = container.querySelector('.ant-splitter');
      expect(root).toHaveStyle(customStyles.root);
      expect(root).toHaveClass(customClassNames.root);

      const panel = container.querySelector('.ant-splitter-panel');
      expect(panel).toHaveStyle(customStyles.panel);
      expect(panel).toHaveClass(customClassNames.panel);

      const dragger = container.querySelector('.ant-splitter-bar-dragger');
      expect(dragger).toHaveStyle(customStyles.dragger);
      expect(dragger).toHaveClass(customClassNames.dragger.default);
      expect(dragger).not.toHaveClass(customClassNames.dragger.active);

      // Dragging
      fireEvent.mouseDown(dragger!);
      expect(dragger).toHaveClass(customClassNames.dragger.default);
      expect(dragger).toHaveClass(customClassNames.dragger.active);
    });
  });

  // ============================= orientation =============================
  describe('orientation attribute', () => {
    const testCases: Array<
      [
        params: [orientation?: Orientation, defaultVertical?: boolean, layout?: Orientation],
        expected: string,
      ]
    > = [
      [[undefined, undefined, 'vertical'], 'vertical'],
      [['vertical', undefined, 'horizontal'], 'vertical'],
      [['vertical', undefined, undefined], 'vertical'],
      [['horizontal', true, undefined], 'horizontal'],
      [[undefined, true, undefined], 'vertical'],
    ];

    it.each(testCases)('with args %j should have %s node', (params, expected) => {
      const { container } = render(
        <SplitterDemo
          items={[{}, {}, {}]}
          orientation={params[0]}
          vertical={params[1]}
          {...(params[2] && { layout: params[2] })}
        />,
      );
      expect(container.querySelector<HTMLSpanElement>(`.ant-splitter-${expected}`)).toBeTruthy();
      if (params[2]) {
        expect(errSpy).toHaveBeenCalledWith(
          'Warning: [antd: Splitter] `layout` is deprecated. Please use `orientation` instead.',
        );
      }
    });
  });
});
