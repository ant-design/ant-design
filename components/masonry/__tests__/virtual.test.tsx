import React from 'react';

import Masonry from '..';
import { fireEvent, render, triggerResize, waitFakeTimer } from '../../../tests/utils';

const resizeMasonry = async () => {
  triggerResize(document.body.querySelector('.ant-masonry')!);
  await waitFakeTimer();
};

describe('Masonry.virtual', () => {
  const heights = Array.from({ length: 80 }, (_, index) => 60 + ((index * 37) % 160));
  let rectSpy: jest.SpyInstance<DOMRect, []>;

  beforeAll(() => {
    rectSpy = jest
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockImplementation(function mockGetBoundingClientRect(this: HTMLElement) {
        const node = this.querySelector('.masonry-cell') as HTMLElement | null;
        const elementHeight = node?.hasAttribute('data-height')
          ? Number(node.getAttribute('data-height'))
          : 100;

        return {
          x: 0,
          y: 0,
          width: 100,
          height: elementHeight,
          top: 0,
          left: 0,
          right: 100,
          bottom: elementHeight,
          toJSON: () => ({}),
        } as DOMRect;
      });
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(async () => {
    await waitFakeTimer();
    jest.clearAllTimers();
    jest.useRealTimers();
    document.body.innerHTML = '';
  });

  afterAll(() => {
    rectSpy.mockRestore();
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
        fresh
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

  const DemoWithoutDeclaredHeight = (
    props: Partial<React.ComponentProps<typeof Masonry<number>>>,
  ) => {
    const items = heights.map((height, index) => ({
      key: `no-height-item-${index}`,
      data: height,
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

  it('renders correctly when virtual is enabled', async () => {
    const { container } = render(<Demo />);
    await resizeMasonry();

    expect(container.querySelector('.ant-masonry')).toBeTruthy();
    expect(container.querySelectorAll('.masonry-cell').length).toBeGreaterThan(0);
  });

  it('renders only one virtual-list container', async () => {
    const { getAllByTestId } = render(<Demo />);
    await resizeMasonry();

    expect(getAllByTestId('virtual-list')).toHaveLength(1);
  });

  it('does not render invisible items in DOM', async () => {
    const { container } = render(<Demo />);
    await resizeMasonry();

    expect(container.querySelectorAll('.masonry-cell').length).toBeLessThan(heights.length);
  });

  it('recycles and creates elements on scroll', async () => {
    const { container, getByTestId } = render(<Demo />);
    await resizeMasonry();

    const beforeTexts = Array.from(container.querySelectorAll('.masonry-cell')).map(
      (node) => node.textContent,
    );

    fireEvent.scroll(getByTestId('virtual-list'), { target: { scrollTop: 300 } });
    await waitFakeTimer();

    const afterTexts = Array.from(container.querySelectorAll('.masonry-cell')).map(
      (node) => node.textContent,
    );

    expect(afterTexts).not.toEqual(beforeTexts);
  });

  it('handles deep scroll range lookups', async () => {
    const { getByTestId, container } = render(<Demo />);
    await resizeMasonry();

    fireEvent.scroll(getByTestId('virtual-list'), { target: { scrollTop: 2200 } });
    await waitFakeTimer();

    expect(container.querySelectorAll('.masonry-cell').length).toBeGreaterThan(0);
  });

  it('triggers onLayoutChange callback', async () => {
    const onLayoutChange = jest.fn();
    render(<Demo onLayoutChange={onLayoutChange} />);
    await resizeMasonry();

    expect(onLayoutChange).toHaveBeenCalled();
    expect(onLayoutChange.mock.calls[0][0][0]).toEqual(
      expect.objectContaining({
        key: 'item-0',
      }),
    );
  });

  it('onLayoutChange only reports measured items in virtual mode', async () => {
    const onLayoutChange = jest.fn();
    const { getByTestId } = render(<DemoWithoutDeclaredHeight onLayoutChange={onLayoutChange} />);
    await resizeMasonry();

    expect(onLayoutChange).toHaveBeenCalled();
    const firstCallItems = onLayoutChange.mock.calls[0][0];
    expect(firstCallItems.length).toBeGreaterThan(0);
    expect(firstCallItems.length).toBeLessThan(heights.length);

    const firstCount = firstCallItems.length;
    fireEvent.scroll(getByTestId('virtual-list'), { target: { scrollTop: 1200 } });
    await waitFakeTimer();

    const lastCallItems = onLayoutChange.mock.calls[onLayoutChange.mock.calls.length - 1][0];
    expect(lastCallItems.length).toBeGreaterThan(firstCount);
    expect(lastCallItems.length).toBeLessThan(heights.length);
  });

  it('updates layout when item height changes and on window resize', async () => {
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
    fireEvent(window, new Event('resize'));
    await waitFakeTimer();

    expect(onLayoutChange.mock.calls.length).toBeGreaterThan(firstCount);
  });

  it('handles collect calls during active scrolling', async () => {
    const { container, getByTestId } = render(<DemoWithoutDeclaredHeight />);
    await resizeMasonry();

    const virtualList = getByTestId('virtual-list');
    const root = container.querySelector('.ant-masonry') as HTMLElement;

    fireEvent.scroll(virtualList, { target: { scrollTop: 120 } });
    fireEvent.load(root);
    fireEvent.error(root);
    fireEvent.scroll(virtualList, { target: { scrollTop: 260 } });
    fireEvent.scroll(virtualList, { target: { scrollTop: 320 } });

    triggerResize(virtualList);
    await waitFakeTimer();

    expect(container.querySelectorAll('.masonry-cell').length).toBeGreaterThan(0);
  });
});
