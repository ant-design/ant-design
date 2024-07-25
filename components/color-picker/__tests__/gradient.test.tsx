import React from 'react';
import { render } from '@testing-library/react';
import { spyElementPrototypes } from 'rc-util/lib/test/domHook';

import { resetWarned } from '../../_util/warning';
import { createEvent, fireEvent } from '../../../tests/utils';
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
    query = '.ant-slider-handle',
    skipEventCheck = false,
  ) {
    const ele = container.querySelector(query)!;
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
    query = '.ant-slider-handle',
    skipEventCheck = false,
  ) {
    doMouseDown(container, start, query, skipEventCheck);

    // Drag
    doMouseMove(end);

    // Up
    fireEvent.mouseUp(container.querySelector(query)!);
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

  it('change color', async () => {
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
            color: '#0000FF',
            percent: 100,
          },
        ]}
        open
        onChange={onChange}
      />,
    );

    // Move
    doDrag(container, 0, 9999999, '.ant-slider', true);

    expect(onChange).toHaveBeenCalledWith(
      expect.anything(),
      'linear-gradient(90deg, rgb(0,255,0) 50%, rgb(0,0,255) 100%)',
    );
  });

  it('invalid not crash', async () => {
    render(<ColorPicker mode={['single', 'gradient']} defaultValue={[]} open />);
  });
});
