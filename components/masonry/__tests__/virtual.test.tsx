import React from 'react';

import Masonry from '..';
import { fireEvent, render, triggerResize, waitFakeTimer } from '../../../tests/utils';

jest.mock('@rc-component/virtual-list', () => {
  const ReactLib: typeof import('react') = jest.requireActual('react');

  const MockVirtualList = ({
    data,
    height,
    itemHeight,
    itemKey,
    children,
    onScroll,
  }: {
    data: any[];
    height: number;
    itemHeight: number;
    itemKey: string;
    children: (item: any) => React.ReactNode;
    onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
  }) => {
    const [scrollTop, setScrollTop] = ReactLib.useState(0);
    const start = Math.max(0, Math.floor(scrollTop / itemHeight));
    const count = Math.max(1, Math.ceil(height / itemHeight));
    const visibleData = data.slice(start, start + count + 1);

    return (
      <div
        data-testid="virtual-list"
        style={{ maxHeight: height, overflow: 'auto' }}
        onScroll={(event) => {
          const target = event.currentTarget as HTMLDivElement;
          setScrollTop(target.scrollTop);
          onScroll?.(event);
        }}
      >
        {visibleData.map((item) => (
          <div key={item[itemKey]}>{children(item)}</div>
        ))}
      </div>
    );
  };

  return {
    __esModule: true,
    default: MockVirtualList,
  };
});

const resizeMasonry = async () => {
  triggerResize(document.body.querySelector('.ant-masonry')!);
  await waitFakeTimer();
};

describe('Masonry.virtual', () => {
  const heights = Array.from({ length: 80 }, (_, index) => 60 + ((index * 37) % 160));

  beforeAll(() => {
    jest
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

  const Demo = ({
    dynamicHeights = heights,
    ...props
  }: Partial<any> & { dynamicHeights?: number[] }) => {
    const items = dynamicHeights.map((height, index) => ({
      key: `item-${index}`,
      data: height,
    }));

    return (
      <Masonry
        virtual
        fresh
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
});
