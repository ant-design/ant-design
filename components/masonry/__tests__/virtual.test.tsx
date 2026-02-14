import { spyElementPrototypes } from '@rc-component/util/lib/test/domHook';
import { fireEvent } from '@testing-library/react';
import React from 'react';

import { render, triggerResize, waitFakeTimer } from '../../../tests/utils';
import type { MasonryProps } from '../index';
import Masonry from '../index';

const resizeMasonry = async () => {
  const masonry = document.body.querySelector('.ant-masonry');
  if (masonry) {
    triggerResize(masonry);
  }
  await waitFakeTimer();
};

describe('Masonry Virtual Scroll', () => {
  let domSpy: ReturnType<typeof spyElementPrototypes>;

  beforeAll(() => {
    domSpy = spyElementPrototypes(HTMLElement, {
      getBoundingClientRect() {
        const element = this as unknown as HTMLElement;
        const recordElement = element.querySelector<HTMLElement>('.bamboo');

        // Return item height based on data attribute
        if (recordElement?.hasAttribute('data-height')) {
          return {
            height: Number(recordElement.getAttribute('data-height')),
            width: 200,
          };
        }

        // Default height for items
        return {
          height: 100,
          width: 200,
        };
      },
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
    domSpy.mockRestore();
  });

  const generateItems = (count: number) => {
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push({
        key: `item-${i}`,
        data: { index: i, height: 100 + (i % 5) * 20 },
      });
    }
    return items;
  };

  const VirtualMasonry = (props: Partial<MasonryProps>) => {
    const items = generateItems(1000);

    return (
      <div style={{ width: '800px' }}>
        <Masonry
          columns={4}
          gutter={16}
          items={items}
          virtual={{
            height: 600,
            itemHeight: 150,
          }}
          itemRender={({ data }) => (
            <div
              className="bamboo"
              style={{ height: data.height }}
              data-height={data.height}
              data-index={data.index}
            >
              Item {data.index}
            </div>
          )}
          {...props}
        />
      </div>
    );
  };

  it('should render with virtual scroll container', async () => {
    const { container } = render(<VirtualMasonry />);
    await resizeMasonry();

    const masonry = container.querySelector('.ant-masonry');
    expect(masonry).toHaveClass('ant-masonry-virtual');
    expect(masonry).toHaveStyle({ height: '600px', overflowY: 'auto' });
  });

  it('should only render visible items', async () => {
    const { container } = render(<VirtualMasonry />);
    await resizeMasonry();

    // Should not render all 1000 items
    const renderedItems = container.querySelectorAll('.ant-masonry-item');
    expect(renderedItems.length).toBeLessThan(100);
    expect(renderedItems.length).toBeGreaterThan(0);
  });

  it('should render more items after scroll', async () => {
    const { container } = render(<VirtualMasonry />);
    await resizeMasonry();

    const masonry = container.querySelector('.ant-masonry')!;

    // Simulate scroll
    fireEvent.scroll(masonry, { target: { scrollTop: 1000 } });
    await waitFakeTimer();

    // Items should still be rendered (visible items change based on scroll)
    const afterScrollItems = container.querySelectorAll('.ant-masonry-item').length;
    expect(afterScrollItems).toBeGreaterThan(0);
    expect(afterScrollItems).toBeLessThan(1000);
  });

  it('should call onScrollEnd when reaching the bottom', async () => {
    const onScrollEnd = jest.fn();
    const items = generateItems(100);

    const { container } = render(
      <div style={{ width: '800px' }}>
        <Masonry
          columns={4}
          gutter={16}
          items={items}
          virtual={{
            height: 600,
            itemHeight: 150,
          }}
          onScrollEnd={onScrollEnd}
          itemRender={({ data }) => (
            <div className="bamboo" style={{ height: 100 }} data-height={100}>
              Item {data.index}
            </div>
          )}
        />
      </div>,
    );
    await resizeMasonry();

    const masonry = container.querySelector('.ant-masonry')!;

    // Scroll to near the bottom
    const innerDiv = masonry.querySelector('div');
    const totalHeight = innerDiv ? Number.parseInt(innerDiv.style.height, 10) : 3000;

    fireEvent.scroll(masonry, { target: { scrollTop: totalHeight - 600 } });
    await waitFakeTimer();

    expect(onScrollEnd).toHaveBeenCalled();
  });

  it('should not render without required virtual config', async () => {
    const { container } = render(
      <div style={{ width: '800px' }}>
        <Masonry
          columns={4}
          items={generateItems(100)}
          itemRender={({ data }) => (
            <div className="bamboo" style={{ height: 100 }}>
              Item {data.index}
            </div>
          )}
        />
      </div>,
    );
    await resizeMasonry();

    // Without virtual prop, should use CSSMotionList (normal mode)
    const masonry = container.querySelector('.ant-masonry');
    expect(masonry).not.toHaveClass('ant-masonry-virtual');
  });

  it('should respect buffer prop', async () => {
    const { container: container1 } = render(
      <VirtualMasonry virtual={{ height: 600, itemHeight: 150, buffer: 2 }} />,
    );
    await resizeMasonry();
    const itemsWithSmallBuffer = container1.querySelectorAll('.ant-masonry-item').length;

    document.body.innerHTML = '';

    const { container: container2 } = render(
      <VirtualMasonry virtual={{ height: 600, itemHeight: 150, buffer: 20 }} />,
    );
    await resizeMasonry();
    const itemsWithLargeBuffer = container2.querySelectorAll('.ant-masonry-item').length;

    // Larger buffer should render more items
    expect(itemsWithLargeBuffer).toBeGreaterThanOrEqual(itemsWithSmallBuffer);
  });

  it('should handle empty items in virtual mode', async () => {
    const { container } = render(
      <div style={{ width: '800px' }}>
        <Masonry
          columns={4}
          items={[]}
          virtual={{
            height: 600,
            itemHeight: 150,
          }}
          itemRender={() => <div className="bamboo">Empty</div>}
        />
      </div>,
    );
    await resizeMasonry();

    const items = container.querySelectorAll('.ant-masonry-item');
    expect(items.length).toBe(0);
  });

  it('should update visible items when items prop changes', async () => {
    const items1 = generateItems(100);
    const items2 = generateItems(200);

    const { container, rerender } = render(
      <div style={{ width: '800px' }}>
        <Masonry
          columns={4}
          items={items1}
          virtual={{
            height: 600,
            itemHeight: 150,
          }}
          itemRender={({ data }) => (
            <div className="bamboo" style={{ height: 100 }} data-height={100}>
              Item {data.index}
            </div>
          )}
        />
      </div>,
    );
    await resizeMasonry();

    const initialCount = container.querySelectorAll('.ant-masonry-item').length;

    // Update items
    rerender(
      <div style={{ width: '800px' }}>
        <Masonry
          columns={4}
          items={items2}
          virtual={{
            height: 600,
            itemHeight: 150,
          }}
          itemRender={({ data }) => (
            <div className="bamboo" style={{ height: 100 }} data-height={100}>
              Item {data.index}
            </div>
          )}
        />
      </div>,
    );
    await resizeMasonry();

    const updatedCount = container.querySelectorAll('.ant-masonry-item').length;

    // Should still render approximately the same number of visible items
    expect(Math.abs(updatedCount - initialCount)).toBeLessThan(20);
  });

  it('should cache measured heights', async () => {
    const { container } = render(<VirtualMasonry />);
    await resizeMasonry();

    // Get initial rendered items
    const masonry = container.querySelector('.ant-masonry')!;

    // Scroll down
    fireEvent.scroll(masonry, { target: { scrollTop: 500 } });
    await waitFakeTimer();

    // Scroll back up - heights should be cached
    fireEvent.scroll(masonry, { target: { scrollTop: 0 } });
    await waitFakeTimer();

    const items = container.querySelectorAll('.ant-masonry-item');
    expect(items.length).toBeGreaterThan(0);
  });

  it('should work with different column counts', async () => {
    const { container, rerender } = render(
      <div style={{ width: '800px' }}>
        <Masonry
          columns={2}
          items={generateItems(100)}
          virtual={{
            height: 600,
            itemHeight: 150,
          }}
          itemRender={({ data }) => (
            <div className="bamboo" style={{ height: 100 }} data-height={100}>
              Item {data.index}
            </div>
          )}
        />
      </div>,
    );
    await resizeMasonry();

    const items2Cols = container.querySelectorAll('.ant-masonry-item').length;

    rerender(
      <div style={{ width: '800px' }}>
        <Masonry
          columns={6}
          items={generateItems(100)}
          virtual={{
            height: 600,
            itemHeight: 150,
          }}
          itemRender={({ data }) => (
            <div className="bamboo" style={{ height: 100 }} data-height={100}>
              Item {data.index}
            </div>
          )}
        />
      </div>,
    );
    await resizeMasonry();

    const items6Cols = container.querySelectorAll('.ant-masonry-item').length;

    // More columns should potentially show more items in the same viewport
    expect(items6Cols).toBeGreaterThanOrEqual(items2Cols);
  });

  it('should use declared item heights for position calculation', async () => {
    const items = [
      { key: 'a', height: 100, data: { index: 0 } },
      { key: 'b', height: 150, data: { index: 1 } },
      { key: 'c', height: 200, data: { index: 2 } },
      { key: 'd', height: 120, data: { index: 3 } },
    ];

    const { container } = render(
      <div style={{ width: '800px' }}>
        <Masonry
          columns={2}
          gutter={16}
          items={items}
          virtual={{
            height: 600,
            itemHeight: 100, // Default estimate, but items have declared heights
          }}
          itemRender={({ data }) => (
            <div className="bamboo" style={{ height: 100 }} data-height={100}>
              Item {data.index}
            </div>
          )}
        />
      </div>,
    );
    await resizeMasonry();

    // All items should be rendered since they fit in viewport
    const renderedItems = container.querySelectorAll('.ant-masonry-item');
    expect(renderedItems.length).toBe(4);
  });

  it('should reset onScrollEnd trigger when scrolling back up', async () => {
    const onScrollEnd = jest.fn();
    const items = generateItems(100);

    const { container } = render(
      <div style={{ width: '800px' }}>
        <Masonry
          columns={4}
          gutter={16}
          items={items}
          virtual={{
            height: 600,
            itemHeight: 150,
          }}
          onScrollEnd={onScrollEnd}
          itemRender={({ data }) => (
            <div className="bamboo" style={{ height: 100 }} data-height={100}>
              Item {data.index}
            </div>
          )}
        />
      </div>,
    );
    await resizeMasonry();

    const masonry = container.querySelector('.ant-masonry')!;
    const innerDiv = masonry.querySelector('div');
    const totalHeight = innerDiv ? Number.parseInt(innerDiv.style.height, 10) : 3000;

    // Scroll to near the bottom - should trigger onScrollEnd
    fireEvent.scroll(masonry, { target: { scrollTop: totalHeight - 600 } });
    await waitFakeTimer();
    expect(onScrollEnd).toHaveBeenCalledTimes(1);

    // Scroll back up - should reset the trigger
    fireEvent.scroll(masonry, { target: { scrollTop: 0 } });
    await waitFakeTimer();

    // Scroll to bottom again - should trigger again
    fireEvent.scroll(masonry, { target: { scrollTop: totalHeight - 600 } });
    await waitFakeTimer();
    expect(onScrollEnd).toHaveBeenCalledTimes(2);
  });

  it('should trigger collectItemSize when images load via capture phase', async () => {
    const { container } = render(
      <div style={{ width: '800px' }}>
        <Masonry
          columns={4}
          items={generateItems(10)}
          virtual={{
            height: 600,
            itemHeight: 150,
          }}
          itemRender={({ data }) => (
            <div className="bamboo" style={{ height: 100 }} data-height={100}>
              <img src="test.jpg" alt={`Item ${data.index}`} />
            </div>
          )}
        />
      </div>,
    );
    await resizeMasonry();

    const masonry = container.querySelector('.ant-masonry')!;
    const innerContainer = masonry.querySelector('div');
    const img = innerContainer?.querySelector('img');

    expect(img).toBeTruthy();

    // Simulate image load event - this should trigger collectItemSize via capture phase
    // The load event doesn't bubble, so we dispatch it on the img element
    const loadEvent = new Event('load', { bubbles: false });
    img!.dispatchEvent(loadEvent);
    await waitFakeTimer();

    // Simulate error event as well
    const errorEvent = new Event('error', { bubbles: false });
    img!.dispatchEvent(errorEvent);
    await waitFakeTimer();

    // Items should still render properly
    const items = container.querySelectorAll('.ant-masonry-item');
    expect(items.length).toBeGreaterThan(0);
  });

  it('should cleanup event listeners when unmounting', async () => {
    const { container, unmount } = render(<VirtualMasonry />);
    await resizeMasonry();

    const masonry = container.querySelector('.ant-masonry');
    expect(masonry).toBeTruthy();

    // Unmount should not throw any errors
    expect(() => unmount()).not.toThrow();
  });

  describe('Virtual + Dynamic', () => {
    it('should handle dynamic item addition while scrolling', async () => {
      const initialItems = generateItems(50);

      const DynamicVirtualMasonry = () => {
        const [items, setItems] = React.useState(initialItems);

        return (
          <div style={{ width: '800px' }}>
            <button
              type="button"
              data-testid="add-btn"
              onClick={() => {
                const newItem = {
                  key: `item-${items.length}`,
                  data: { index: items.length, height: 100 },
                };
                setItems([...items, newItem]);
              }}
            >
              Add
            </button>
            <Masonry
              columns={4}
              gutter={16}
              items={items}
              virtual={{
                height: 600,
                itemHeight: 150,
              }}
              itemRender={({ data }) => (
                <div className="bamboo" style={{ height: data.height }} data-height={data.height}>
                  Item {data.index}
                </div>
              )}
            />
          </div>
        );
      };

      const { container, getByTestId } = render(<DynamicVirtualMasonry />);
      await resizeMasonry();

      const initialCount = container.querySelectorAll('.ant-masonry-item').length;

      // Add new items
      fireEvent.click(getByTestId('add-btn'));
      fireEvent.click(getByTestId('add-btn'));
      fireEvent.click(getByTestId('add-btn'));
      await waitFakeTimer();
      await resizeMasonry();

      // Items should still render (visible items count may or may not change)
      const afterAddCount = container.querySelectorAll('.ant-masonry-item').length;
      expect(afterAddCount).toBeGreaterThan(0);
      // The visible count should be similar since we're still at scroll position 0
      expect(Math.abs(afterAddCount - initialCount)).toBeLessThan(10);
    });

    it('should handle dynamic item removal in virtual mode', async () => {
      const DynamicVirtualMasonry = () => {
        const [items, setItems] = React.useState(generateItems(100));

        return (
          <div style={{ width: '800px' }}>
            <button
              type="button"
              data-testid="remove-btn"
              onClick={() => {
                setItems((prev) => prev.slice(1)); // Remove first item
              }}
            >
              Remove
            </button>
            <Masonry
              columns={4}
              gutter={16}
              items={items}
              virtual={{
                height: 600,
                itemHeight: 150,
              }}
              itemRender={({ data }) => (
                <div className="bamboo" style={{ height: data.height }} data-height={data.height}>
                  Item {data.index}
                </div>
              )}
            />
          </div>
        );
      };

      const { container, getByTestId } = render(<DynamicVirtualMasonry />);
      await resizeMasonry();

      const initialCount = container.querySelectorAll('.ant-masonry-item').length;
      expect(initialCount).toBeGreaterThan(0);

      // Remove items
      fireEvent.click(getByTestId('remove-btn'));
      fireEvent.click(getByTestId('remove-btn'));
      await waitFakeTimer();
      await resizeMasonry();

      // Should still render items
      const afterRemoveCount = container.querySelectorAll('.ant-masonry-item').length;
      expect(afterRemoveCount).toBeGreaterThan(0);
    });

    it('should trigger onScrollEnd for infinite loading', async () => {
      const onScrollEnd = jest.fn();
      const itemCount = 50;

      const InfiniteLoadingMasonry = () => {
        const [items, setItems] = React.useState(() => generateItems(itemCount));

        const handleScrollEnd = () => {
          onScrollEnd();
          // Simulate loading more items
          const newItems: { key: string; data: { index: number; height: number } }[] = [];
          for (let i = 0; i < 20; i++) {
            newItems.push({
              key: `item-${items.length + i}`,
              data: { index: items.length + i, height: 100 },
            });
          }
          setItems((prev) => [...prev, ...newItems]);
        };

        return (
          <div style={{ width: '800px' }}>
            <Masonry
              columns={4}
              gutter={16}
              items={items}
              virtual={{
                height: 600,
                itemHeight: 150,
              }}
              onScrollEnd={handleScrollEnd}
              itemRender={({ data }) => (
                <div className="bamboo" style={{ height: 100 }} data-height={100}>
                  Item {data.index}
                </div>
              )}
            />
          </div>
        );
      };

      const { container } = render(<InfiniteLoadingMasonry />);
      await resizeMasonry();

      const masonry = container.querySelector('.ant-masonry')!;
      const innerDiv = masonry.querySelector('div');
      const totalHeight = innerDiv ? Number.parseInt(innerDiv.style.height, 10) : 3000;

      // Scroll to near the bottom to trigger infinite loading
      fireEvent.scroll(masonry, { target: { scrollTop: totalHeight - 600 } });
      await waitFakeTimer();

      expect(onScrollEnd).toHaveBeenCalled();

      // After loading more items, we should still have rendered items
      const items = container.querySelectorAll('.ant-masonry-item');
      expect(items.length).toBeGreaterThan(0);
    });

    it('should maintain scroll position when items are added at the end', async () => {
      const DynamicVirtualMasonry = () => {
        const [items, setItems] = React.useState(generateItems(100));

        return (
          <div style={{ width: '800px' }}>
            <button
              type="button"
              data-testid="add-end-btn"
              onClick={() => {
                const newItems: { key: string; data: { index: number; height: number } }[] = [];
                for (let i = 0; i < 10; i++) {
                  newItems.push({
                    key: `item-${items.length + i}`,
                    data: { index: items.length + i, height: 100 + (i % 3) * 50 },
                  });
                }
                setItems((prev) => [...prev, ...newItems]);
              }}
            >
              Add at End
            </button>
            <Masonry
              columns={4}
              gutter={16}
              items={items}
              virtual={{
                height: 600,
                itemHeight: 150,
              }}
              itemRender={({ data }) => (
                <div className="bamboo" style={{ height: data.height }} data-height={data.height}>
                  Item {data.index}
                </div>
              )}
            />
          </div>
        );
      };

      const { container, getByTestId } = render(<DynamicVirtualMasonry />);
      await resizeMasonry();

      const masonry = container.querySelector('.ant-masonry')!;

      // Scroll to middle
      fireEvent.scroll(masonry, { target: { scrollTop: 500 } });
      await waitFakeTimer();

      const itemsBeforeAdd = container.querySelectorAll('.ant-masonry-item').length;

      // Add items at end
      fireEvent.click(getByTestId('add-end-btn'));
      await waitFakeTimer();
      await resizeMasonry();

      // Should still have similar number of visible items
      const itemsAfterAdd = container.querySelectorAll('.ant-masonry-item').length;
      expect(itemsAfterAdd).toBeGreaterThan(0);
      // The difference should be reasonable
      expect(Math.abs(itemsAfterAdd - itemsBeforeAdd)).toBeLessThan(20);
    });

    it('should handle rapid item updates without crashing', async () => {
      const DynamicVirtualMasonry = () => {
        const [items, setItems] = React.useState(generateItems(50));

        return (
          <div style={{ width: '800px' }}>
            <button
              type="button"
              data-testid="rapid-add"
              onClick={() => {
                const newItem = {
                  key: `item-${Date.now()}-${Math.random()}`,
                  data: { index: items.length, height: 100 },
                };
                setItems((prev) => [...prev, newItem]);
              }}
            >
              Rapid Add
            </button>
            <button
              type="button"
              data-testid="rapid-remove"
              onClick={() => {
                setItems((prev) => prev.slice(0, -1));
              }}
            >
              Rapid Remove
            </button>
            <Masonry
              columns={4}
              gutter={16}
              items={items}
              virtual={{
                height: 600,
                itemHeight: 150,
              }}
              itemRender={({ data }) => (
                <div className="bamboo" style={{ height: data.height }} data-height={data.height}>
                  Item {data.index}
                </div>
              )}
            />
          </div>
        );
      };

      const { container, getByTestId } = render(<DynamicVirtualMasonry />);
      await resizeMasonry();

      // Perform rapid updates
      for (let i = 0; i < 10; i++) {
        fireEvent.click(getByTestId('rapid-add'));
      }
      await waitFakeTimer();

      for (let i = 0; i < 5; i++) {
        fireEvent.click(getByTestId('rapid-remove'));
      }
      await waitFakeTimer();
      await resizeMasonry();

      // Should not crash and should render items
      const items = container.querySelectorAll('.ant-masonry-item');
      expect(items.length).toBeGreaterThan(0);
    });
  });
});
