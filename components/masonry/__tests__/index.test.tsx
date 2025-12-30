import React from 'react';
import { spyElementPrototypes } from '@rc-component/util/lib/test/domHook';
import { act, fireEvent, render } from '@testing-library/react';

import Masonry from '..';
import type { MasonryProps } from '..';
import { triggerResize, render as utilRender, waitFakeTimer } from '../../../tests/utils';

const resizeMasonry = async () => {
  triggerResize(document.body.querySelector('.ant-masonry')!);
  await waitFakeTimer();
};

jest.mock('../../_util/throttleByAnimationFrame', () => (cb: any) => {
  const func = () => cb();
  (func as any).cancel = () => {};
  return func;
});

// Mock for `responsiveObserve` to test `unsubscribe` call
jest.mock('../../_util/responsiveObserver', () => {
  const modules = jest.requireActual('../../_util/responsiveObserver');
  const originHook = modules.default;

  const useMockResponsiveObserver = (...args: any[]) => {
    const entity = originHook(...args);
    if (!entity.unsubscribe.mocked) {
      const originUnsubscribe = entity.unsubscribe;
      entity.unsubscribe = (...uArgs: any[]) => {
        const inst = global as any;
        inst.unsubscribeCnt = (inst.unsubscribeCnt || 0) + 1;

        originUnsubscribe.call(entity, ...uArgs);
      };
      entity.unsubscribe.mocked = true;
    }

    return entity;
  };

  return {
    ...modules,
    __esModule: true,
    default: useMockResponsiveObserver,
  };
});

describe('Masonry', () => {
  let minWidth = '';
  let domSpy: ReturnType<typeof spyElementPrototypes>;
  let originResizeObserver: any;

  beforeAll(() => {
    originResizeObserver = global.ResizeObserver;
    global.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    };

    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      return setTimeout(cb, 16) as unknown as number;
    });
    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => {
      clearTimeout(id);
    });

    // Mock scrollTo which is used in virtualization
    if (!HTMLElement.prototype.scrollTo) {
      (HTMLElement.prototype as any).scrollTo = jest.fn();
    }

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => {
        const match = query.match(/\(min-width: (\d+)px\)/);
        const queryWidth = match ? Number.parseInt(match[1], 10) : 0;
        const currentWidth = Number.parseInt(minWidth, 10) || 0;
        const matches = currentWidth >= queryWidth;

        return {
          matches,
          media: query,
          onchange: null,
          addListener: jest.fn(), // Deprecated but used in older antd/browsers
          removeListener: jest.fn(), // Deprecated
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        };
      }),
    });
  });

  beforeEach(() => {
    jest.useFakeTimers();
    minWidth = '1200px';
    (global as any).unsubscribeCnt = 0;

    domSpy = spyElementPrototypes(HTMLElement, {
      getBoundingClientRect() {
        const element = this as unknown as HTMLElement;
        let height = 100;

        // Check if the element itself is the item (has bamboo class)
        if (
          element.classList &&
          element.classList.contains('bamboo') &&
          element.hasAttribute('data-height')
        ) {
          height = Number(element.getAttribute('data-height'));
        } else {
          // Fallback to checking children
          const recordElement = element.querySelector?.<HTMLElement>('.bamboo');
          if (recordElement?.hasAttribute('data-height')) {
            height = Number(recordElement.getAttribute('data-height'));
          }
        }

        return {
          height,
          width: 100,
          top: 0,
          left: 0,
          bottom: height,
          right: 100,
          x: 0,
          y: 0,
          toJSON: () => {},
        };
      },

      offsetHeight: {
        get() {
          const element = this as unknown as HTMLElement;
          if (
            element.classList &&
            element.classList.contains('bamboo') &&
            element.hasAttribute('data-height')
          ) {
            return Number(element.getAttribute('data-height'));
          }
          return 100;
        },
      },

      clientWidth: {
        get() {
          return 100;
        },
      },
    });
  });

  afterEach(async () => {
    await waitFakeTimer();

    domSpy.mockRestore();

    jest.clearAllTimers();
    jest.useRealTimers();
    document.body.innerHTML = '';
  });

  afterAll(() => {
    global.ResizeObserver = originResizeObserver;
    jest.restoreAllMocks();
  });

  const heights = [150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80];

  const DemoMasonry = (props: Partial<MasonryProps>) => {
    const items = heights.map((height, index) => ({
      key: `item-${index}`,
      data: height,
    }));

    return (
      <div
        style={{
          width: '820px',
        }}
      >
        <Masonry
          columns={3}
          itemRender={({ data, index, column }) => (
            <div
              style={{ height: data }}
              data-height={data}
              className="bamboo"
              data-column={column}
            >
              {index + 1}
            </div>
          )}
          items={items}
          {...props}
        />
      </div>
    );
  };

  it('should utilRender correctly', async () => {
    const onLayoutChange = jest.fn();
    const { container } = utilRender(<DemoMasonry columns={3} onLayoutChange={onLayoutChange} />);

    await resizeMasonry();

    expect(container.querySelector('.ant-masonry')).toHaveStyle({
      height: '480px',
    });

    const columns = Array.from(container.querySelectorAll('.bamboo')).map((ele) =>
      Number(ele.getAttribute('data-column')),
    );

    expect(onLayoutChange).toHaveBeenCalledWith(
      heights.map((_, index) =>
        expect.objectContaining({
          column: columns[index],
          key: `item-${index}`,
        }),
      ),
    );
  });

  it('should handle responsive columns', async () => {
    minWidth = '576px';

    const { container } = utilRender(<DemoMasonry columns={{ xs: 1, sm: 2, md: 3 }} />);

    await resizeMasonry();

    const elements = container.querySelectorAll('.bamboo');
    const columnOrders = Array.from(elements).map((element) => element.getAttribute('data-column'));

    expect(columnOrders[0]).toBe('0');
    expect(columnOrders[1]).toBe('1');
    expect(columnOrders[2]).toBe('1');
  });

  it('should rearrange after item update', async () => {
    const items = [20, 10, 30, 40, 10].map((height, index) => ({
      key: index,
      data: { height, id: index },
    }));

    const renderDemo = (nextItems: typeof items) => (
      <DemoMasonry
        items={nextItems}
        itemRender={({ data: { height, id }, column }: any) => (
          <div className="bamboo" style={{ height }} data-height={height} data-column={column}>
            {id}
          </div>
        )}
      />
    );

    const { container, rerender } = utilRender(renderDemo(items));

    await resizeMasonry();

    const getColumns = () =>
      Array.from(container.querySelectorAll('.bamboo')).map((ele) =>
        [ele.textContent, ele.getAttribute('data-column')].join('-'),
      );

    // Origin
    expect(getColumns()).toEqual(['0-0', '1-1', '2-2', '3-1', '4-0']);

    // remove one
    items[1].data.height = 50;
    rerender(renderDemo([...items]));
    await resizeMasonry();
    expect(getColumns()).toEqual(['0-0', '1-1', '2-2', '3-0', '4-2']);
  });

  it('not crash for empty items', async () => {
    utilRender(<Masonry />);
    await resizeMasonry();
  });

  describe('gutter', () => {
    const getGutter = () => {
      const itemElements = document.body.querySelectorAll<HTMLElement>('.ant-masonry-item');

      const horizontalGutter = itemElements[0].style
        .getPropertyValue('--item-width')
        .match(/\d+px/)![0];
      const verticalGutter = itemElements[2].style.top.match(/\d+px/)![0];

      return [Number.parseInt(horizontalGutter, 10), Number.parseInt(verticalGutter, 10)];
    };

    const renderGutter = (gutter: MasonryProps['gutter']) => (
      <DemoMasonry
        columns={2}
        items={[
          {
            key: 0,
            data: 0,
          },
          {
            key: 1,
            data: 23,
          },
          {
            key: 2,
            data: 33,
          },
        ]}
        gutter={gutter}
      />
    );

    it('should handle array gutter', async () => {
      utilRender(renderGutter([8, 16]));
      await resizeMasonry();

      expect(getGutter()).toEqual([8, 16]);
    });

    it('should handle responsive gutter', async () => {
      minWidth = '576px';

      utilRender(renderGutter({ sm: 8, md: 16 }));
      await resizeMasonry();

      expect(getGutter()).toEqual([8, 8]);
    });

    it('should handle responsive gutter with array', async () => {
      minWidth = '576px';

      utilRender(renderGutter([{ sm: 8, md: 32 }, 23]));
      await resizeMasonry();

      expect(getGutter()).toEqual([8, 23]);
    });

    it('should use cached height for unmounted items in virtual list', async () => {
      const items = Array.from({ length: 100 }).map((_, i) => ({
        key: i,
        data: 50,
      }));

      const { container } = render(
        <div style={{ height: 200, overflow: 'auto' }} className="virtual-container">
          <Masonry
            items={items}
            columns={1}
            itemRender={(item) => (
              <div className="bamboo" data-height="50" style={{ height: 50 }}>
                {item.key}
              </div>
            )}
          />
        </div>,
      );

      const virtualContainer = container.querySelector('.virtual-container') as HTMLElement;

      // Mock properties for virtualization
      Object.defineProperty(virtualContainer, 'clientHeight', { value: 200, configurable: true });
      Object.defineProperty(virtualContainer, 'scrollTop', {
        value: 0,
        configurable: true,
        writable: true,
      });

      // Initial load
      await resizeMasonry();

      // Scroll down to hide top items
      Object.defineProperty(virtualContainer, 'scrollTop', {
        value: 2000,
        configurable: true,
        writable: true,
      });
      fireEvent.scroll(virtualContainer);
      await waitFakeTimer();

      // End animations for leaving items
      act(() => {
        const leavingItems = container.querySelectorAll('.ant-masonry-item-fade-leave');
        leavingItems.forEach((item) => {
          fireEvent.transitionEnd(item);
          fireEvent.animationEnd(item);
        });
      });
      await waitFakeTimer();

      // Trigger resize to force re-measure
      await resizeMasonry();

      expect(container.querySelector('.ant-masonry')).toHaveStyle({
        height: '8450px',
      });
    });
  });
});
