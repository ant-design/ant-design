import React from 'react';

import Segmented from '..';
import { act, fireEvent, render } from '../../../tests/utils';

const prefixCls = 'ant-segmented';

interface MockRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

function mockRect(element: Element, rect: MockRect) {
  (element as HTMLElement).getBoundingClientRect = () =>
    ({
      ...rect,
      right: rect.left + rect.width,
      bottom: rect.top + rect.height,
      x: rect.left,
      y: rect.top,
      toJSON: () => {},
    }) as DOMRect;
}

// Three horizontal items: [0..100], [100..200], [200..300], all 32px tall
function mockLayout(container: HTMLElement) {
  const root = container.querySelector<HTMLElement>(`.${prefixCls}`)!;
  mockRect(root, { left: 0, top: 0, width: 300, height: 32 });
  mockRect(root.querySelector(`.${prefixCls}-group`)!, { left: 0, top: 0, width: 300, height: 32 });
  root.querySelectorAll(`.${prefixCls}-item`).forEach((item, index) => {
    mockRect(item, { left: index * 100, top: 0, width: 100, height: 32 });
  });
  return root;
}

function moveMouse(root: HTMLElement, clientX: number, clientY: number) {
  fireEvent.mouseMove(root, { clientX, clientY });
  act(() => {
    jest.advanceTimersByTime(100);
  });
}

function getHoverThumb(container: HTMLElement) {
  return container.querySelector<HTMLElement>(`.${prefixCls}-hover-thumb`);
}

describe('Segmented fluid hover', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should not render hover thumb without hoverMotion', () => {
    const { container } = render(<Segmented options={['Daily', 'Weekly', 'Monthly']} />);
    const root = mockLayout(container);

    expect(root).not.toHaveClass(`${prefixCls}-hover-fluid`);
    moveMouse(root, 50, 16);
    expect(getHoverThumb(container)).toBeNull();
  });

  it('should glide hover thumb to the nearest item', () => {
    const { container } = render(
      <Segmented hoverMotion="fluid" options={['Daily', 'Weekly', 'Monthly']} />,
    );
    const root = mockLayout(container);

    expect(root).toHaveClass(`${prefixCls}-hover-fluid`);
    expect(getHoverThumb(container)).toBeNull();

    moveMouse(root, 50, 16);
    const thumb = getHoverThumb(container)!;
    expect(thumb).toBeTruthy();
    expect(thumb.style.transform).toBe('translate(0px, 0px)');
    expect(thumb.style.width).toBe('100px');
    expect(thumb.style.height).toBe('32px');

    moveMouse(root, 250, 16);
    expect(getHoverThumb(container)!.style.transform).toBe('translate(200px, 0px)');
  });

  it('should pick the nearest item when hovering a gap', () => {
    const { container } = render(
      <Segmented hoverMotion="fluid" options={['Daily', 'Weekly', 'Monthly']} />,
    );
    const root = mockLayout(container);

    // Below the items but horizontally within the second one
    moveMouse(root, 150, 60);
    expect(getHoverThumb(container)!.style.transform).toBe('translate(100px, 0px)');
  });

  it('should disable travel transition on fresh entry only', () => {
    const { container } = render(
      <Segmented hoverMotion="fluid" options={['Daily', 'Weekly', 'Monthly']} />,
    );
    const root = mockLayout(container);

    moveMouse(root, 50, 16);
    // `fresh` is reset right after placement so the next move can animate
    expect(getHoverThumb(container)!.style.transition).toBe('');

    moveMouse(root, 150, 16);
    expect(getHoverThumb(container)!.style.transition).toBe('');
  });

  it('should skip disabled items', () => {
    const { container } = render(
      <Segmented
        hoverMotion="fluid"
        options={['Daily', { label: 'Weekly', value: 'Weekly', disabled: true }, 'Monthly']}
      />,
    );
    const root = mockLayout(container);

    // Pointer over the disabled middle item: nearest enabled item wins
    moveMouse(root, 140, 16);
    expect(getHoverThumb(container)!.style.transform).toBe('translate(0px, 0px)');

    moveMouse(root, 160, 16);
    expect(getHoverThumb(container)!.style.transform).toBe('translate(200px, 0px)');
  });

  it('should hide hover thumb on mouse leave', () => {
    const { container } = render(
      <Segmented hoverMotion="fluid" options={['Daily', 'Weekly', 'Monthly']} />,
    );
    const root = mockLayout(container);

    moveMouse(root, 50, 16);
    expect(getHoverThumb(container)).toBeTruthy();

    fireEvent.mouseLeave(root);
    expect(getHoverThumb(container)).toBeNull();
  });

  it('should not track hover when Segmented is disabled', () => {
    const { container } = render(
      <Segmented hoverMotion="fluid" disabled options={['Daily', 'Weekly', 'Monthly']} />,
    );
    const root = mockLayout(container);

    moveMouse(root, 50, 16);
    expect(getHoverThumb(container)).toBeNull();
  });

  it('should still forward ref to root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = render(
      <Segmented ref={ref} hoverMotion="fluid" options={['Daily', 'Weekly']} />,
    );
    expect(ref.current).toBe(container.querySelector(`.${prefixCls}`));
  });
});
