import React from 'react';

import Masonry from '..';
import { resetWarned } from '../../_util/warning';
import { fireEvent, render, triggerResize, waitFakeTimer } from '../../../tests/utils';

const resizeMasonry = async () => {
  triggerResize(document.body.querySelector('.ant-masonry')!);
  const virtualHolder = document.body.querySelector('.ant-masonry-virtual-holder');
  if (virtualHolder) {
    triggerResize(virtualHolder);
  }
  await waitFakeTimer();
};

describe('Masonry.virtual', () => {
  const heights = Array.from({ length: 80 }, (_, index) => 60 + ((index * 37) % 160));

  beforeEach(() => {
    jest.useFakeTimers();
    resetWarned();
  });

  afterEach(async () => {
    await waitFakeTimer();
    jest.clearAllTimers();
    jest.useRealTimers();
    document.body.innerHTML = '';
  });

  interface DemoProps extends Partial<React.ComponentProps<typeof Masonry<number>>> {
    dynamicHeights?: number[];
  }

  const Demo = ({ dynamicHeights = heights, ...props }: DemoProps) => {
    const items = dynamicHeights.map((height, index) => ({
      key: `item-${index}`,
      data: height,
      height,
    }));

    return (
      <Masonry
        virtual
        style={{ height: 400 }}
        columns={2}
        gutter={12}
        items={items}
        itemRender={({ data, index, column }) => (
          <div className="masonry-cell" data-height={data} data-column={column}>
            {index + 1}
          </div>
        )}
        {...props}
      />
    );
  };

  it('does not render invisible items in DOM', async () => {
    const { container } = render(<Demo />);
    await resizeMasonry();

    expect(container.querySelectorAll('.masonry-cell').length).toBeLessThan(heights.length);
    expect(container.querySelector('.ant-masonry-virtual-holder')).toBeTruthy();
  });

  it('recycles and creates elements on scroll', async () => {
    const { container } = render(<Demo />);
    await resizeMasonry();

    const virtualList = container.querySelector('.ant-masonry-virtual-holder')!;
    const beforeTexts = Array.from(container.querySelectorAll('.masonry-cell')).map(
      (node) => node.textContent,
    );

    fireEvent.scroll(virtualList, { target: { scrollTop: 300 } });
    await waitFakeTimer();

    const afterTexts = Array.from(container.querySelectorAll('.masonry-cell')).map(
      (node) => node.textContent,
    );

    expect(afterTexts).not.toEqual(beforeTexts);
  });

  it('applies upward overscan when scrolling back up', async () => {
    const { container } = render(<Demo />);
    await resizeMasonry();

    const virtualList = container.querySelector('.ant-masonry-virtual-holder')!;
    fireEvent.scroll(virtualList, { target: { scrollTop: 1200 } });
    await waitFakeTimer();

    fireEvent.scroll(virtualList, { target: { scrollTop: 800 } });
    // Fire again before rAF flushes to cover pending-frame cancellation.
    fireEvent.scroll(virtualList, { target: { scrollTop: 600 } });
    await waitFakeTimer();

    const texts = Array.from(container.querySelectorAll('.masonry-cell')).map((node) =>
      Number(node.textContent),
    );
    expect(Math.min(...texts)).toBeLessThan(30);
  });

  it('cancels pending scroll frame on unmount', async () => {
    const { container, unmount } = render(<Demo />);
    await resizeMasonry();

    const virtualList = container.querySelector('.ant-masonry-virtual-holder')!;
    fireEvent.scroll(virtualList, { target: { scrollTop: 400 } });
    unmount();
    await waitFakeTimer();
  });

  it('renders later items after deep scroll', async () => {
    const { container } = render(<Demo />);
    await resizeMasonry();

    const virtualList = container.querySelector('.ant-masonry-virtual-holder')!;
    fireEvent.scroll(virtualList, { target: { scrollTop: 2200 } });
    await waitFakeTimer();

    const texts = Array.from(container.querySelectorAll('.masonry-cell')).map((node) =>
      Number(node.textContent),
    );
    expect(Math.max(...texts)).toBeGreaterThan(20);
  });

  it('clamps scroll offset when items shrink after deep scroll', async () => {
    const { container, rerender } = render(<Demo />);
    await resizeMasonry();

    const virtualList = container.querySelector('.ant-masonry-virtual-holder') as HTMLElement;
    fireEvent.scroll(virtualList, { target: { scrollTop: 2200 } });
    await waitFakeTimer();

    Object.defineProperty(virtualList, 'clientHeight', {
      configurable: true,
      get: () => 400,
    });
    Object.defineProperty(virtualList, 'scrollTop', {
      configurable: true,
      writable: true,
      value: 2200,
    });

    rerender(<Demo dynamicHeights={[120, 160]} />);
    await waitFakeTimer();

    expect(container.querySelectorAll('.masonry-cell').length).toBe(2);
    expect(virtualList.scrollTop).toBeLessThanOrEqual(400);
  });

  it('triggers onLayoutChange callback with all items', async () => {
    const onLayoutChange = jest.fn();
    render(<Demo onLayoutChange={onLayoutChange} />);
    await resizeMasonry();

    expect(onLayoutChange).toHaveBeenCalled();
    expect(onLayoutChange.mock.calls[0][0]).toHaveLength(heights.length);
    expect(onLayoutChange.mock.calls[0][0][0]).toEqual(
      expect.objectContaining({
        key: 'item-0',
        column: expect.any(Number),
      }),
    );
  });

  it('supports itemHeight getter when MasonryItem.height is absent', async () => {
    const onLayoutChange = jest.fn();
    const { container } = render(
      <Masonry
        virtual
        style={{ height: 400 }}
        columns={2}
        gutter={12}
        itemHeight={(item) => item.data as number}
        items={heights.map((height, index) => ({
          key: `getter-item-${index}`,
          data: height,
        }))}
        itemRender={({ data, index }) => (
          <div className="masonry-cell" data-height={data}>
            {index + 1}
          </div>
        )}
        onLayoutChange={onLayoutChange}
      />,
    );
    await resizeMasonry();

    expect(container.querySelectorAll('.masonry-cell').length).toBeLessThan(heights.length);
    expect(onLayoutChange.mock.calls[0][0]).toHaveLength(heights.length);
  });

  it('prefers MasonryItem.height over itemHeight getter', async () => {
    const itemHeight = jest.fn(() => 200);
    const onLayoutChange = jest.fn();

    render(
      <Masonry
        virtual
        style={{ height: 400 }}
        columns={2}
        gutter={0}
        itemHeight={itemHeight}
        items={[
          { key: 'a', data: 1, height: 100 },
          { key: 'b', data: 2, height: 100 },
        ]}
        itemRender={({ key }) => <div className="masonry-cell">{String(key)}</div>}
        onLayoutChange={onLayoutChange}
      />,
    );
    await resizeMasonry();

    expect(itemHeight).not.toHaveBeenCalled();
    expect(onLayoutChange).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ key: 'a' }),
        expect.objectContaining({ key: 'b' }),
      ]),
    );
  });

  it('updates layout when item height changes', async () => {
    const onLayoutChange = jest.fn();
    const { rerender } = render(<Demo onLayoutChange={onLayoutChange} />);
    await resizeMasonry();
    const firstCount = onLayoutChange.mock.calls.length;

    rerender(
      <Demo
        dynamicHeights={heights.map((value, index) => value + ((index % 3) + 1) * 10)}
        onLayoutChange={onLayoutChange}
      />,
    );
    await resizeMasonry();
    await waitFakeTimer();

    expect(onLayoutChange.mock.calls.length).toBeGreaterThan(firstCount);
  });

  it('warns when virtual items miss known height', () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <Masonry
        virtual
        style={{ height: 400 }}
        items={[{ key: 'missing', data: 1 }]}
        itemRender={() => <div>item</div>}
      />,
    );

    expect(errSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        'Virtual mode requires a known height for each item. Provide `MasonryItem.height` or `itemHeight`.',
      ),
    );

    errSpy.mockRestore();
  });

  it('warns when fresh is used with virtual', () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <Masonry
        virtual
        fresh
        style={{ height: 400 }}
        items={[{ key: 'a', data: 1, height: 100 }]}
        itemRender={() => <div>item</div>}
      />,
    );

    expect(errSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        '`fresh` is not supported in virtual mode. Update `MasonryItem.height` or `itemHeight` instead.',
      ),
    );

    errSpy.mockRestore();
  });
});
