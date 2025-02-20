import React from 'react';
import { spyElementPrototypes } from 'rc-util/lib/test/domHook';

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
  beforeAll(() => {
    jest.spyOn(window, 'matchMedia').mockImplementation(
      (query) =>
        ({
          addListener: (cb: (e: { matches: boolean }) => void) => {
            cb({ matches: query === '(min-width: 1200px)' });
          },
          removeListener: jest.fn(),
          matches: query === '(min-width: 1200px)',
        }) as any,
    );

    spyElementPrototypes(HTMLElement, {
      getBoundingClientRect() {
        const recordElement = (this as unknown as HTMLElement).querySelector(
          '.bamboo',
        ) as HTMLElement;
        return { height: Number(recordElement.getAttribute('data-height')) || 100, width: 100 };
      },
    });
  });

  beforeEach(() => {
    jest.useFakeTimers();

    (global as any).unsubscribeCnt = 0;
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  const DemoMasonry = (props: Partial<MasonryProps>) => {
    const heights = [150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80];

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
    const { container } = render(<DemoMasonry columns={3} />);
    await resizeMasonry();

    expect(container.querySelector('.ant-masonry')).toHaveStyle({
      height: '480px',
    });
  });

  it('should handle responsive columns', async () => {
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

    const { container } = render(<DemoMasonry columns={{ xs: 1, sm: 2, md: 3 }} />);

    await resizeMasonry();

    const elements = container.querySelectorAll('.bamboo');
    const columnOrders = Array.from(elements).map((element) => element.getAttribute('data-column'));

    expect(columnOrders[0]).toBe('0');
    expect(columnOrders[1]).toBe('1');
    expect(columnOrders[2]).toBe('1');

    mockMatchMedia.mockRestore();
  });

  it('should rearrange after item update', async () => {
    const items = [20, 10, 30, 40, 10].map((height, index) => ({
      key: index,
      data: { height, id: index },
    }));

    const renderDemo = (nextItems: typeof items) => (
      <DemoMasonry
        items={nextItems}
        itemRender={({
          data: { height, id },
          column,
        }: (typeof items)[number] & {
          column: number;
        }) => (
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
});
