import React from 'react';
import { spyElementPrototypes } from '@rc-component/util/lib/test/domHook';

import Masonry from '..';
import type { MasonryProps } from '..';
import { render, triggerResize, waitFakeTimer } from '../../../tests/utils';

const resizeMasonry = async () => {
  triggerResize(document.body.querySelector('.ant-masonry')!);
  await waitFakeTimer();
};

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

  beforeAll(() => {
    jest.spyOn(window, 'matchMedia').mockImplementation(
      (query) =>
        ({
          addListener: (cb: (e: { matches: boolean }) => void) => {
            cb({ matches: query === `(min-width: ${minWidth})` });
          },
          removeListener: jest.fn(),
          matches: query === `(min-width: ${minWidth})`,
        }) as any,
    );

    spyElementPrototypes(HTMLElement, {
      getBoundingClientRect() {
        const recordElement = (this as unknown as HTMLElement).querySelector(
          '.bamboo',
        ) as HTMLElement;
        return {
          height: recordElement.hasAttribute('data-height')
            ? Number(recordElement.getAttribute('data-height'))
            : 100,
          width: 100,
        };
      },
    });
  });

  beforeEach(() => {
    jest.useFakeTimers();
    minWidth = '1200px';
    (global as any).unsubscribeCnt = 0;
  });

  afterEach(async () => {
    await waitFakeTimer();

    jest.clearAllTimers();
    jest.useRealTimers();
    jest.restoreAllMocks();
    document.body.innerHTML = '';
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

  it('should render correctly', async () => {
    const onLayoutChange = jest.fn();
    const { container } = render(<DemoMasonry columns={3} onLayoutChange={onLayoutChange} />);
    await resizeMasonry();

    expect(container.querySelector('.ant-masonry')).toHaveStyle({
      height: '480px',
    });

    const columns = Array.from(container.querySelectorAll('.bamboo')).map((ele) =>
      Number(ele.getAttribute('data-column')),
    );

    expect(onLayoutChange).toHaveBeenCalledWith(
      heights.map((height, index) =>
        expect.objectContaining({
          column: columns[index],
          data: height,
          key: `item-${index}`,
        }),
      ),
    );
  });

  it('should handle responsive columns', async () => {
    minWidth = '576px';

    const { container } = render(<DemoMasonry columns={{ xs: 1, sm: 2, md: 3 }} />);

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

    const { container, rerender } = render(renderDemo(items));
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
    render(<Masonry />);
    await resizeMasonry();
  });

  describe('gutter', () => {
    const getGutter = () => {
      const itemElements = document.body.querySelectorAll<HTMLElement>('.ant-masonry-item');

      const horizontalGutter = itemElements[0].style
        .getPropertyValue('--item-width')
        .match(/\d+px/)![0];
      const verticalGutter = itemElements[2].style.top.match(/\d+px/)![0];

      return [parseInt(horizontalGutter, 10), parseInt(verticalGutter, 10)];
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
      render(renderGutter([8, 16]));
      await resizeMasonry();

      expect(getGutter()).toEqual([8, 16]);
    });

    it('should handle responsive gutter', async () => {
      minWidth = '576px';

      render(renderGutter({ sm: 8, md: 16 }));
      await resizeMasonry();

      expect(getGutter()).toEqual([8, 8]);
    });

    it('should handle responsive gutter with array', async () => {
      const mockMatchMedia = jest.spyOn(window, 'matchMedia').mockImplementation(
        (query) =>
          ({
            addListener: (cb: (e: { matches: boolean }) => void) => {
              cb({ matches: query === '(min-width: 576px)' });
            },
            removeListener: jest.fn(),
            matches: query === '(min-width: 576px)',
          }) as any,
      );

      render(renderGutter([{ sm: 8, md: 32 }, 23]));
      await resizeMasonry();

      expect(getGutter()).toEqual([8, 23]);

      mockMatchMedia.mockRestore();
    });
  });

  it('should support classNames and styles props types', () => {
    const customClassNames = {
      root: 'custom-root-class',
      item: 'custom-item-class',
    };

    const customStyles = {
      root: {
        border: '2px solid red',
        backgroundColor: 'blue',
      },
      item: {
        padding: '10px',
        margin: '5px',
      },
    };

    const classNamesFn = ({ props }: { props: MasonryProps }) => ({
      root: `dynamic-root-${typeof props.columns === 'number' ? props.columns : 'default'}`,
      item: 'dynamic-item',
    });

    const stylesFn = ({ props }: { props: MasonryProps }) => ({
      root: {
        backgroundColor: props.columns ? 'lightblue' : 'lightgray',
      },
      item: {
        padding: '12px',
      },
    });

    // These should compile without TypeScript errors
    expect(customClassNames.root).toBe('custom-root-class');
    expect(customClassNames.item).toBe('custom-item-class');
    expect(customStyles.root.border).toBe('2px solid red');
    expect(customStyles.item.padding).toBe('10px');

    // Function types should also work
    expect(typeof classNamesFn).toBe('function');
    expect(typeof stylesFn).toBe('function');

    // Test the function calls
    const mockProps = { columns: 3 } as MasonryProps;
    const dynamicClassNames = classNamesFn({ props: mockProps });
    const dynamicStyles = stylesFn({ props: mockProps });

    expect(dynamicClassNames.root).toBe('dynamic-root-3');
    expect(dynamicStyles.root.backgroundColor).toBe('lightblue');
  });

  it('should support function form classNames and styles with different props', () => {
    // Test function behavior with different prop values
    const classNamesFn = ({ props }: { props: MasonryProps }) => ({
      root: `cols-${typeof props.columns === 'number' ? props.columns : 'responsive'}`,
      item: `gutter-${Array.isArray(props.gutter) ? props.gutter[0] : props.gutter || 0}`,
    });

    const stylesFn = ({ props }: { props: MasonryProps }) => {
      const isWideLayout = typeof props.columns === 'number' && props.columns >= 4;
      return {
        root: {
          backgroundColor: isWideLayout ? '#e6f7ff' : '#f6ffed',
          padding: isWideLayout ? '24px' : '16px',
        },
        item: {
          borderRadius: isWideLayout ? '8px' : '4px',
        },
      };
    };

    // Test with columns = 4 (wide layout)
    const wideProps = { columns: 4, gutter: 16 } as MasonryProps;
    const wideClassNames = classNamesFn({ props: wideProps });
    const wideStyles = stylesFn({ props: wideProps });

    expect(wideClassNames.root).toBe('cols-4');
    expect(wideClassNames.item).toBe('gutter-16');
    expect(wideStyles.root.backgroundColor).toBe('#e6f7ff');
    expect(wideStyles.root.padding).toBe('24px');
    expect(wideStyles.item.borderRadius).toBe('8px');

    // Test with columns = 2 (narrow layout)
    const narrowProps = { columns: 2, gutter: [8, 12] } as MasonryProps;
    const narrowClassNames = classNamesFn({ props: narrowProps });
    const narrowStyles = stylesFn({ props: narrowProps });

    expect(narrowClassNames.root).toBe('cols-2');
    expect(narrowClassNames.item).toBe('gutter-8');
    expect(narrowStyles.root.backgroundColor).toBe('#f6ffed');
    expect(narrowStyles.root.padding).toBe('16px');
    expect(narrowStyles.item.borderRadius).toBe('4px');

    // Test with responsive columns
    const responsiveProps = { columns: { xs: 1, md: 3 }, gutter: 0 } as MasonryProps;
    const responsiveClassNames = classNamesFn({ props: responsiveProps });
    const responsiveStyles = stylesFn({ props: responsiveProps });

    expect(responsiveClassNames.root).toBe('cols-responsive');
    expect(responsiveClassNames.item).toBe('gutter-0');
    expect(responsiveStyles.root.backgroundColor).toBe('#f6ffed');
  });
});
