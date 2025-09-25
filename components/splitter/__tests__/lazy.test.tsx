import React from 'react';
import { warning } from '@rc-component/util';
import { spyElementPrototypes } from '@rc-component/util/lib/test/domHook';
import { createEvent, fireEvent, render } from '@testing-library/react';
import { Splitter } from 'antd';

import { triggerResize, waitFakeTimer } from '../../../tests/utils';
import type { PanelProps, SplitterProps } from '../interface';

const { resetWarned } = warning;

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

describe('Splitter lazy', () => {
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

  const mockDrag = (
    draggerEle: HTMLElement,
    onResize: jest.Mock,
    offset: number,
    container?: HTMLElement,
  ) => {
    // Down
    const downEvent = createEvent.mouseDown(draggerEle);
    Object.defineProperty(downEvent, 'pageX', { value: 0 });
    Object.defineProperty(downEvent, 'pageY', { value: 0 });
    fireEvent(draggerEle, downEvent);

    // Move
    const moveEvent = createEvent.mouseMove(window);
    Object.defineProperty(moveEvent, 'pageX', { value: offset });
    Object.defineProperty(moveEvent, 'pageY', { value: offset });
    fireEvent(window, moveEvent);

    // mask should exist
    if (container) {
      expect(container.querySelector('.ant-splitter-mask')).toBeTruthy();
    }

    expect(onResize).not.toHaveBeenCalled();

    // Up
    fireEvent.mouseUp(window);
  };

  const mockTouchDrag = (draggerEle: HTMLElement, onResize: jest.Mock, offset: number) => {
    const touchStart = createEvent.touchStart(draggerEle, {
      touches: [{ pageX: 0, pageY: 0 }],
    });
    fireEvent(draggerEle, touchStart);

    // Touch Move
    const touchMove = createEvent.touchMove(window, {
      touches: [{ pageX: offset, pageY: offset }],
    });
    fireEvent(window, touchMove);

    // onResize should not be called during drag
    expect(onResize).not.toHaveBeenCalled();

    // Touch End
    fireEvent.touchEnd(window);
  };

  it('should only update after mouse up when lazy is true', async () => {
    const onResize = jest.fn();
    const onResizeEnd = jest.fn();

    const { container } = render(
      <SplitterDemo
        items={[
          {
            defaultSize: '50%',
            min: '30%',
            max: '70%',
          },
          {
            defaultSize: '50%',
            min: '30%',
            max: '70%',
          },
        ]}
        onResize={onResize}
        onResizeEnd={onResizeEnd}
        lazy
      />,
    );

    await resizeSplitter();

    // Right
    mockDrag(container.querySelector('.ant-splitter-bar-dragger')!, onResize, 1000, container);
    expect(onResizeEnd).toHaveBeenCalledTimes(1);
    expect(onResizeEnd).toHaveBeenCalledWith([70, 30]);

    // Left
    onResize.mockReset();
    mockDrag(container.querySelector('.ant-splitter-bar-dragger')!, onResize, -1000);
    expect(onResizeEnd).toHaveBeenCalledWith([30, 70]);

    // mask should hide
    expect(container.querySelector('.ant-splitter-mask')).toBeFalsy();
  });

  it('should work with touch events when lazy', async () => {
    const onResize = jest.fn();
    const onResizeEnd = jest.fn();

    const { container } = render(
      <SplitterDemo
        items={[
          {
            defaultSize: '50%',
            min: '20%',
            max: '70%',
          },
          {
            defaultSize: '50%',
            min: '20%',
            max: '70%',
          },
        ]}
        onResize={onResize}
        onResizeEnd={onResizeEnd}
        lazy
      />,
    );

    await resizeSplitter();

    // Right
    mockTouchDrag(container.querySelector('.ant-splitter-bar-dragger')!, onResize, 1000);
    expect(onResizeEnd).toHaveBeenCalledWith([70, 30]);

    // Left
    onResize.mockReset();
    mockTouchDrag(container.querySelector('.ant-splitter-bar-dragger')!, onResize, -1000);
    expect(onResizeEnd).toHaveBeenCalledWith([30, 70]);
  });

  it('should work with vertical splitter', async () => {
    const onResize = jest.fn();
    const onResizeEnd = jest.fn();

    const { container } = render(
      <SplitterDemo
        items={[
          {
            defaultSize: '50%',
            min: '30%',
            max: '70%',
          },
          {
            defaultSize: '50%',
            min: '30%',
            max: '70%',
          },
        ]}
        onResize={onResize}
        onResizeEnd={onResizeEnd}
        layout="vertical"
        lazy
      />,
    );

    await resizeSplitter();

    // Drag Down
    mockDrag(container.querySelector('.ant-splitter-bar-dragger')!, onResize, 1000);
    expect(onResizeEnd).toHaveBeenCalledWith([70, 30]);

    // Drag Up
    onResize.mockReset();
    mockDrag(container.querySelector('.ant-splitter-bar-dragger')!, onResize, -1000);
    expect(onResizeEnd).toHaveBeenCalledWith([30, 70]);

    // Touch Drag Down
    onResize.mockReset();
    mockTouchDrag(container.querySelector('.ant-splitter-bar-dragger')!, onResize, 1000);
    expect(onResizeEnd).toHaveBeenCalledWith([70, 30]);

    // Touch Drag Up
    onResize.mockReset();
    mockTouchDrag(container.querySelector('.ant-splitter-bar-dragger')!, onResize, -1000);
    expect(onResizeEnd).toHaveBeenCalledWith([30, 70]);
  });
});
