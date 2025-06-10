import React from 'react';
import { render } from '@testing-library/react';
import { spyElementPrototypes } from 'rc-util/lib/test/domHook';

import { resetWarned } from '../../_util/warning';
import { createEvent, fireEvent } from '../../../tests/utils';
import { AggregationColor } from '../color';
import ColorPicker from '../ColorPicker';

describe('ColorPicker.gradient', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  beforeAll(() => {
    spyElementPrototypes(HTMLElement, {
      getBoundingClientRect: () => ({
        width: 100,
        height: 100,
        left: 0,
        top: 0,
        bottom: 100,
        right: 100,
      }),
    });
  });

  beforeEach(() => {
    resetWarned();
    jest.useFakeTimers();
  });

  afterEach(() => {
    errorSpy.mockReset();
    jest.useRealTimers();
  });

  function doMouseDown(
    container: HTMLElement,
    start: number,
    query: string | HTMLElement = '.ant-slider-handle',
    skipEventCheck = false,
  ) {
    const ele = typeof query === 'object' ? query : container.querySelector(query)!;
    const mouseDown = createEvent.mouseDown(ele);
    (mouseDown as any).pageX = start;
    (mouseDown as any).pageY = start;

    const preventDefault = jest.fn();

    Object.defineProperties(mouseDown, {
      clientX: { get: () => start },
      clientY: { get: () => start },
      preventDefault: { value: preventDefault },
    });

    fireEvent.mouseEnter(ele);
    fireEvent(ele, mouseDown);

    // Should not prevent default since focus will not change
    if (!skipEventCheck) {
      expect(preventDefault).not.toHaveBeenCalled();
    }

    fireEvent.focus(ele);
  }

  function doMouseMove(end: number) {
    const mouseMove = createEvent.mouseMove(document);
    (mouseMove as any).pageX = end;
    (mouseMove as any).pageY = end;
    fireEvent(document, mouseMove);
  }

  function doDrag(
    container: HTMLElement,
    start: number,
    end: number,
    query: string | HTMLElement = '.ant-slider-handle',
    skipEventCheck = false,
  ) {
    doMouseDown(container, start, query, skipEventCheck);

    // Drag
    doMouseMove(end);

    // Up
    fireEvent.mouseUp(typeof query === 'object' ? query : container.querySelector(query)!);
  }

  it('switch', async () => {
    const onChange = jest.fn();

    const { container } = render(
      <ColorPicker mode={['single', 'gradient']} defaultValue="#123456" open onChange={onChange} />,
    );

    // Switch to gradient
    fireEvent.click(container.querySelectorAll(`.ant-segmented-item-input`)[1]);

    expect(onChange).toHaveBeenCalledWith(
      expect.anything(),
      'linear-gradient(90deg, rgb(18,52,86) 0%, rgb(18,52,86) 100%)',
    );
  });

  it('change color position', async () => {
    const onChange = jest.fn();

    const { container } = render(
      <ColorPicker
        mode={['single', 'gradient']}
        defaultValue={[
          {
            color: '#FF0000',
            percent: 0,
          },
          {
            color: '#0000FF',
            percent: 100,
          },
        ]}
        open
        onChange={onChange}
      />,
    );

    // Move
    doDrag(container, 0, 80);

    expect(onChange).toHaveBeenCalledWith(
      expect.anything(),
      'linear-gradient(90deg, rgb(255,0,0) 80%, rgb(0,0,255) 100%)',
    );
  });

  it('change color hex', async () => {
    const onChange = jest.fn();

    const { container } = render(
      <ColorPicker
        mode={['single', 'gradient']}
        defaultValue={[
          {
            color: '#FF0000',
            percent: 0,
          },
          {
            color: '#0000FF',
            percent: 100,
          },
        ]}
        open
        onChange={onChange}
      />,
    );

    // Move
    doDrag(
      container,
      0,
      80,
      container.querySelector<HTMLElement>(
        '.ant-color-picker-slider-container .ant-slider-handle',
      )!,
      true,
    );

    expect(onChange).toHaveBeenCalledWith(
      expect.anything(),
      'linear-gradient(90deg, rgb(200,0,255) 0%, rgb(0,0,255) 100%)',
    );
  });

  it('new color', async () => {
    const onChange = jest.fn();

    const { container } = render(
      <ColorPicker
        mode={['single', 'gradient']}
        defaultValue={[
          {
            color: '#FF0000',
            percent: 0,
          },
          {
            color: '#0000FF',
            percent: 100,
          },
        ]}
        open
        onChange={onChange}
      />,
    );

    // Move
    doDrag(container, 20, 30, '.ant-slider', true);

    expect(onChange).toHaveBeenCalledWith(
      expect.anything(),
      'linear-gradient(90deg, rgb(255,0,0) 0%, rgb(204,0,51) 20%, rgb(0,0,255) 100%)',
    );
    expect(onChange).toHaveBeenCalledWith(
      expect.anything(),
      'linear-gradient(90deg, rgb(255,0,0) 0%, rgb(204,0,51) 30%, rgb(0,0,255) 100%)',
    );
  });

  it('remove color', async () => {
    const onChange = jest.fn();

    const { container } = render(
      <ColorPicker
        mode={['single', 'gradient']}
        defaultValue={[
          {
            color: '#FF0000',
            percent: 0,
          },
          {
            color: '#00FF00',
            percent: 50,
          },
          {
            color: '#000FF0',
            percent: 80,
          },
          {
            color: '#0000FF',
            percent: 100,
          },
        ]}
        open
        onChange={onChange}
      />,
    );

    // Delete remove first
    fireEvent.keyDown(container.querySelector<HTMLElement>('.ant-slider-handle-1')!, {
      key: 'Delete',
    });
    expect(onChange).toHaveBeenCalledWith(
      expect.anything(),
      'linear-gradient(90deg, rgb(0,255,0) 50%, rgb(0,15,240) 80%, rgb(0,0,255) 100%)',
    );

    // Drag remove last
    onChange.mockReset();
    doDrag(
      container,
      0,
      9999999,
      container.querySelector<HTMLElement>('.ant-slider-handle-3')!,
      true,
    );

    expect(onChange).toHaveBeenCalledWith(
      expect.anything(),
      'linear-gradient(90deg, rgb(0,255,0) 50%, rgb(0,15,240) 80%)',
    );
  });

  it('invalid not crash', async () => {
    render(<ColorPicker mode={['single', 'gradient']} defaultValue={[]} open />);
  });

  it('change to single', async () => {
    const onChange = jest.fn();

    const { container } = render(
      <ColorPicker
        mode={['single', 'gradient']}
        defaultValue={[
          {
            color: '#FF0000',
            percent: 0,
          },
          {
            color: '#0000FF',
            percent: 100,
          },
        ]}
        open
        onChange={onChange}
      />,
    );

    // Switch to gradient
    fireEvent.click(container.querySelector(`.ant-segmented-item-input`)!);

    expect(onChange).toHaveBeenCalledWith(expect.anything(), 'rgb(255,0,0)');
  });

  it('not crash when pass gradient color', async () => {
    const color = new AggregationColor([
      {
        color: '#FF0000',
        percent: 0,
      },
    ]);

    const newColor = new AggregationColor(color);
    expect(newColor.toCssString()).toEqual('linear-gradient(90deg, rgb(255,0,0) 0%)');
  });

  it('mode fallback', () => {
    const { container } = render(<ColorPicker mode={['gradient']} defaultValue="#F00" open />);

    expect(container.querySelector('.ant-color-picker-gradient-slider')).toBeTruthy();
  });

  // This test case may easily break by jsdom update
  // https://github.com/ant-design/ant-design/issues/51159
  it('change color 2 should not be color 1', () => {
    const { container } = render(
      <ColorPicker
        mode={['gradient']}
        open
        defaultValue={[
          {
            color: '#FF0000',
            percent: 0,
          },
          {
            color: '#0000FF',
            percent: 100,
          },
        ]}
      />,
    );

    // Select second one
    const handle2 = container.querySelector<HTMLElement>('.ant-slider-handle-2')!;
    doDrag(container, 0, 0, handle2, true);

    // Drag in the color panel
    const panelHandle = container.querySelector('.ant-color-picker-saturation')!;
    const mouseDown = createEvent.mouseDown(panelHandle);
    fireEvent(panelHandle, mouseDown);

    expect(handle2).not.toHaveStyle({
      backgroundColor: 'rgb(255,0,0)',
    });
  });
});
