import React from 'react';
import { spyElementPrototypes } from '@rc-component/util/lib/test/domHook';
import { createEvent, fireEvent, render } from '@testing-library/react';
import { Splitter } from 'antd';

import { triggerResize, waitFakeTimer } from '../../../tests/utils';
import type { PanelProps, SplitterProps } from '../interface';

const SplitterDemo = ({ items = [{}, {}], ...props }: { items?: PanelProps[] } & SplitterProps) => (
  <Splitter {...props}>
    {items?.map((item, idx) => {
      const key = `panel-${idx}`;
      return <Splitter.Panel key={key} {...item} />;
    })}
  </Splitter>
);

const resizeSplitter = async () => {
  triggerResize(document.body.querySelector('.ant-splitter')!);
  await waitFakeTimer();
};

describe('Splitter step', () => {
  const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  let containerSize = 1000;

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
    containerSize = 1000;
    errSpy.mockReset();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  function mockDrag(draggerEle: HTMLElement, offset: number, container?: HTMLElement) {
    const downEvent = createEvent.mouseDown(draggerEle);
    Object.defineProperty(downEvent, 'pageX', { value: 0 });
    Object.defineProperty(downEvent, 'pageY', { value: 0 });
    fireEvent(draggerEle, downEvent);

    // Event listener is on window, not draggerEle
    const moveEvent = createEvent.mouseMove(window);
    Object.defineProperty(moveEvent, 'pageX', { value: offset });
    Object.defineProperty(moveEvent, 'pageY', { value: offset });
    fireEvent(window, moveEvent);

    if (container) {
      expect(container.querySelector('.ant-splitter-mask')).toBeTruthy();
    }

    fireEvent.mouseUp(window);
  }

  describe('two panels with step percentage', () => {
    it('should snap to step positions when dragging', async () => {
      const onResize = jest.fn();
      const onResizeEnd = jest.fn();

      const { container } = render(
        <SplitterDemo
          items={[{ defaultSize: '30%', min: '0', max: '100%' }, { defaultSize: '70%' }]}
          step="10%"
          onResize={onResize}
          onResizeEnd={onResizeEnd}
        />,
      );

      await resizeSplitter();

      mockDrag(container.querySelector('.ant-splitter-bar-dragger')!, 50);
      expect(onResize).toHaveBeenCalled();
      const firstCall = onResize.mock.calls[0];
      const [panel1Size] = firstCall[0];
      expect(panel1Size).toBe(300);
      expect(onResizeEnd).toHaveBeenCalled();

      mockDrag(container.querySelector('.ant-splitter-bar-dragger')!, 90);
      expect(onResize).toHaveBeenCalledWith([400, 600]);
      expect(onResizeEnd).toHaveBeenCalledWith([400, 600]);

      onResize.mockReset();
      onResizeEnd.mockReset();

      mockDrag(container.querySelector('.ant-splitter-bar-dragger')!, 110);
      expect(onResize).toHaveBeenCalledWith([500, 500]);
      expect(onResizeEnd).toHaveBeenCalledWith([500, 500]);

      onResize.mockReset();
      onResizeEnd.mockReset();

      mockDrag(container.querySelector('.ant-splitter-bar-dragger')!, -90);
      expect(onResize).toHaveBeenCalledWith([400, 600]);
      expect(onResizeEnd).toHaveBeenCalledWith([400, 600]);
    });

    it('should snap to 0 when dragging left to near zero', async () => {
      const onResize = jest.fn();
      const onResizeEnd = jest.fn();

      const { container } = render(
        <SplitterDemo
          items={[{ defaultSize: '10%', min: '0', max: '100%' }, { defaultSize: '90%' }]}
          step="10%"
          onResize={onResize}
          onResizeEnd={onResizeEnd}
        />,
      );

      await resizeSplitter();

      mockDrag(container.querySelector('.ant-splitter-bar-dragger')!, -50);
      expect(onResize).toHaveBeenCalled();
      const firstCall = onResize.mock.calls[0];
      const [panel1Size] = firstCall[0];
      expect(panel1Size).toBe(100);
      expect(onResizeEnd).toHaveBeenCalled();

      mockDrag(container.querySelector('.ant-splitter-bar-dragger')!, -95);
      expect(onResize).toHaveBeenCalledWith([0, 1000]);
      expect(onResizeEnd).toHaveBeenCalledWith([0, 1000]);
    });

    it('should snap to 100% when dragging right to near max', async () => {
      const onResize = jest.fn();
      const onResizeEnd = jest.fn();

      const { container } = render(
        <SplitterDemo
          items={[{ defaultSize: '90%', min: '0', max: '100%' }, { defaultSize: '10%' }]}
          step="10%"
          onResize={onResize}
          onResizeEnd={onResizeEnd}
        />,
      );

      await resizeSplitter();

      mockDrag(container.querySelector('.ant-splitter-bar-dragger')!, 50);
      expect(onResize).toHaveBeenCalled();
      const firstCall = onResize.mock.calls[0];
      const [panel1Size] = firstCall[0];
      expect(panel1Size).toBe(900);
      expect(onResizeEnd).toHaveBeenCalled();

      mockDrag(container.querySelector('.ant-splitter-bar-dragger')!, 95);
      expect(onResize).toHaveBeenCalledWith([1000, 0]);
      expect(onResizeEnd).toHaveBeenCalledWith([1000, 0]);
    });
  });

  describe('two panels with step pixels', () => {
    it('should snap to step positions when dragging', async () => {
      const onResize = jest.fn();
      const onResizeEnd = jest.fn();

      const { container } = render(
        <SplitterDemo
          items={[{ defaultSize: 300, min: 0, max: 1000 }, { defaultSize: 700 }]}
          step={100}
          onResize={onResize}
          onResizeEnd={onResizeEnd}
        />,
      );

      await resizeSplitter();

      mockDrag(container.querySelector('.ant-splitter-bar-dragger')!, 50);
      expect(onResize).toHaveBeenCalled();
      const firstCall = onResize.mock.calls[0];
      const [panel1Size] = firstCall[0];
      expect(panel1Size).toBe(300);
      expect(onResizeEnd).toHaveBeenCalled();

      mockDrag(container.querySelector('.ant-splitter-bar-dragger')!, 90);
      expect(onResize).toHaveBeenCalledWith([400, 600]);
      expect(onResizeEnd).toHaveBeenCalledWith([400, 600]);

      onResize.mockReset();
      onResizeEnd.mockReset();

      mockDrag(container.querySelector('.ant-splitter-bar-dragger')!, 110);
      expect(onResize).toHaveBeenCalledWith([500, 500]);
      expect(onResizeEnd).toHaveBeenCalledWith([500, 500]);

      onResize.mockReset();
      onResizeEnd.mockReset();

      mockDrag(container.querySelector('.ant-splitter-bar-dragger')!, -90);
      expect(onResize).toHaveBeenCalledWith([400, 600]);
      expect(onResizeEnd).toHaveBeenCalledWith([400, 600]);
    });
  });

  describe('lazy mode with step', () => {
    it('should work with lazy mode and step', async () => {
      const onResize = jest.fn();
      const onResizeEnd = jest.fn();

      const { container } = render(
        <SplitterDemo
          items={[{ defaultSize: '30%', min: '0', max: '100%' }, { defaultSize: '70%' }]}
          step="10%"
          lazy
          onResize={onResize}
          onResizeEnd={onResizeEnd}
        />,
      );

      await resizeSplitter();

      const draggerEle = container.querySelector('.ant-splitter-bar-dragger')!;
      const downEvent = createEvent.mouseDown(draggerEle);
      Object.defineProperty(downEvent, 'pageX', { value: 0 });
      Object.defineProperty(downEvent, 'pageY', { value: 0 });
      fireEvent(draggerEle, downEvent);

      const moveEvent = createEvent.mouseMove(window);
      Object.defineProperty(moveEvent, 'pageX', { value: 90 });
      Object.defineProperty(moveEvent, 'pageY', { value: 90 });
      fireEvent(window, moveEvent);

      // In lazy mode, onResize should not be called during drag
      expect(onResize).not.toHaveBeenCalled();

      fireEvent.mouseUp(window);
      expect(onResizeEnd).toHaveBeenCalledWith([400, 600]);
    });

    it('should show preview line with step snapping in lazy mode', async () => {
      const { container } = render(
        <SplitterDemo
          items={[{ defaultSize: '30%', min: '0', max: '100%' }, { defaultSize: '70%' }]}
          step="10%"
          lazy
        />,
      );

      await resizeSplitter();

      const draggerEle = container.querySelector('.ant-splitter-bar-dragger')!;
      const downEvent = createEvent.mouseDown(draggerEle);
      Object.defineProperty(downEvent, 'pageX', { value: 0 });
      Object.defineProperty(downEvent, 'pageY', { value: 0 });
      fireEvent(draggerEle, downEvent);

      const moveEvent = createEvent.mouseMove(window);
      Object.defineProperty(moveEvent, 'pageX', { value: 90 });
      Object.defineProperty(moveEvent, 'pageY', { value: 90 });
      fireEvent(window, moveEvent);
      expect(container.querySelector('.ant-splitter-bar-preview')).toBeTruthy();

      fireEvent.mouseUp(window);
    });
  });

  describe('prevent snapping when space is less than step', () => {
    it('should not snap when dragging left and panel width is less than step', async () => {
      const onResize = jest.fn();
      const onResizeEnd = jest.fn();

      const { container } = render(
        <SplitterDemo
          items={[{ defaultSize: '5%', min: '0', max: '100%' }, { defaultSize: '95%' }]}
          step="10%"
          onResize={onResize}
          onResizeEnd={onResizeEnd}
        />,
      );

      await resizeSplitter();

      mockDrag(container.querySelector('.ant-splitter-bar-dragger')!, -20);
      expect(onResize).toHaveBeenCalled();
      const lastCall = onResize.mock.calls[onResize.mock.calls.length - 1];
      const [panel1Size] = lastCall[0];
      expect(panel1Size).toBe(50);
    });

    it('should not snap when dragging right and next panel width is less than step', async () => {
      const onResize = jest.fn();
      const onResizeEnd = jest.fn();

      const { container } = render(
        <SplitterDemo
          items={[{ defaultSize: '95%', min: '0', max: '100%' }, { defaultSize: '5%' }]}
          step="10%"
          onResize={onResize}
          onResizeEnd={onResizeEnd}
        />,
      );

      await resizeSplitter();

      mockDrag(container.querySelector('.ant-splitter-bar-dragger')!, 20);
      expect(onResize).toHaveBeenCalled();
      const lastCall = onResizeEnd.mock.calls[onResizeEnd.mock.calls.length - 1];
      const [panel1Size, panel2Size] = lastCall[0];
      expect(panel1Size).toBe(950);
      expect(panel2Size).toBe(50);
    });

    it('should allow snapping to 0 even when panel width is less than step', async () => {
      const onResize = jest.fn();
      const onResizeEnd = jest.fn();

      const { container } = render(
        <SplitterDemo
          items={[{ defaultSize: '5%', min: '0', max: '100%' }, { defaultSize: '95%' }]}
          step="10%"
          onResize={onResize}
          onResizeEnd={onResizeEnd}
        />,
      );

      await resizeSplitter();

      mockDrag(container.querySelector('.ant-splitter-bar-dragger')!, -60);
      expect(onResize).toHaveBeenCalledWith([50, 950]);
      expect(onResizeEnd).toHaveBeenCalledWith([50, 950]);
    });

    it('should not snap when panel width is less than step and dragging left', async () => {
      const onResize = jest.fn();
      const onResizeEnd = jest.fn();

      containerSize = 1000;

      const { container } = render(
        <SplitterDemo
          items={[{ defaultSize: '10%', min: '0', max: '100%' }, { defaultSize: '90%' }]}
          step="15%"
          onResize={onResize}
          onResizeEnd={onResizeEnd}
        />,
      );

      await resizeSplitter();

      mockDrag(container.querySelector('.ant-splitter-bar-dragger')!, -20);
      expect(onResize).toHaveBeenCalled();
      const lastCall = onResize.mock.calls[onResize.mock.calls.length - 1];
      const [panel1Size] = lastCall[0];
      expect(panel1Size).toBe(100);
    });
  });

  describe('multiple panels with step', () => {
    it('should snap correctly with three panels', async () => {
      const onResizeEnd = jest.fn();

      const { container } = render(
        <SplitterDemo
          items={[
            { defaultSize: '20%', min: '0', max: '100%' },
            { defaultSize: '30%', min: '0', max: '100%' },
            { defaultSize: '50%' },
          ]}
          step="10%"
          onResizeEnd={onResizeEnd}
        />,
      );

      await resizeSplitter();

      const draggers = container.querySelectorAll('.ant-splitter-bar-dragger');
      mockDrag(draggers[0] as HTMLElement, 50);
      expect(onResizeEnd).toHaveBeenCalled();
      const lastCall = onResizeEnd.mock.calls[onResizeEnd.mock.calls.length - 1];
      const [panel1Size] = lastCall[0];
      expect(panel1Size % 100).toBe(0);
    });

    it('should find effective index when dragging left with overlapping panels', async () => {
      const onResize = jest.fn();
      const onResizeEnd = jest.fn();

      const { container } = render(
        <SplitterDemo
          items={[
            { defaultSize: '80%', min: '0', max: '100%' },
            { defaultSize: '0%', min: '0', max: '100%' },
            { defaultSize: '20%' },
          ]}
          step="10%"
          onResize={onResize}
          onResizeEnd={onResizeEnd}
        />,
      );

      await resizeSplitter();

      const draggers = container.querySelectorAll('.ant-splitter-bar-dragger');
      mockDrag(draggers[1] as HTMLElement, -90);
      expect(onResize).toHaveBeenCalled();
      expect(onResizeEnd).toHaveBeenCalled();
    });

    it('should return lastSnappedOffset when ideal step is outside boundaries', async () => {
      const onResize = jest.fn();
      const onResizeEnd = jest.fn();

      const { container } = render(
        <SplitterDemo
          items={[{ defaultSize: '5%', min: '0', max: '5%' }, { defaultSize: '95%' }]}
          step="10%"
          onResize={onResize}
          onResizeEnd={onResizeEnd}
        />,
      );

      await resizeSplitter();
      mockDrag(container.querySelector('.ant-splitter-bar-dragger')!, 95);
      expect(onResize).toHaveBeenCalled();
      const firstCall = onResize.mock.calls[0];
      const [panel1Size] = firstCall[0];
      // Should remain at 50px (no movement when ideal step is outside boundaries)
      expect(panel1Size).toBe(50);
    });
  });
});
