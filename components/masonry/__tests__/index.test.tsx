import React from 'react';
import { render } from '@testing-library/react';

import Masonry from '..';

const marginProperty = '--ant-masonry-item-margin';
const orderProperty = '--ant-masonry-item-order';

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
  beforeEach(() => {
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
    (global as any).unsubscribeCnt = 0;
  });

  const Demo = () => {
    const heights = [150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80];

    return (
      <>
        {heights.map((height, index) => {
          const key = `item-${index}`;
          return (
            <div key={key} style={{ height }}>
              {index + 1}
            </div>
          );
        })}
      </>
    );
  };

  it('should render correctly', () => {
    const { container } = render(
      <Masonry columns={3}>
        <Demo />
      </Masonry>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should handle responsive columns', () => {
    jest.spyOn(window, 'matchMedia').mockImplementation(
      (query) =>
        ({
          addListener: (cb: (e: { matches: boolean }) => void) => {
            cb({ matches: query === '(min-width: 576px)' });
          },
          removeListener: jest.fn(),
          matches: query === '(min-width: 576px)',
        }) as any,
    );

    const { container } = render(
      <Masonry columns={{ xs: 1, sm: 2, md: 3 }}>
        <Demo />
      </Masonry>,
    );

    const elements = container.querySelectorAll('.ant-masonry > *');
    const styles = Array.from(elements).map((element) => window.getComputedStyle(element));

    expect(styles[0].getPropertyValue(orderProperty)).toBe('1');
    expect(styles[1].getPropertyValue(orderProperty)).toBe('2');
    expect(styles[2].getPropertyValue(orderProperty)).not.toBe('3');
  });

  it('should handle gutter prop', () => {
    const { container } = render(
      <Masonry columns={2} gutter={16}>
        <Demo />
      </Masonry>,
    );

    const firstElement = container.querySelectorAll('.ant-masonry > *')[0] as HTMLElement;

    const style = window.getComputedStyle(firstElement);

    expect(style.getPropertyValue(marginProperty)).toBe('8px 8px');
  });

  it('should handle sequential layout', () => {
    const { container } = render(
      <Masonry columns={2} sequential>
        <Demo />
      </Masonry>,
    );

    const columns = container.querySelectorAll('.ant-masonry > *');
    expect(columns[0].textContent).toBe('1');
    expect(columns[1].textContent).toBe('2');
    expect(columns[2].textContent).toBe('3');
    expect(columns[3].textContent).toBe('4');
  });

  it('should handle responsive gutter', () => {
    jest.spyOn(window, 'matchMedia').mockImplementation(
      (query) =>
        ({
          addListener: (cb: (e: { matches: boolean }) => void) => {
            cb({ matches: query === '(min-width: 576px)' });
          },
          removeListener: jest.fn(),
          matches: query === '(min-width: 576px)',
        }) as any,
    );

    const { container } = render(
      <Masonry columns={2} gutter={{ sm: 8, md: 16 }}>
        <Demo />
      </Masonry>,
    );

    const firstElement = container.querySelectorAll('.ant-masonry > *')[0] as HTMLElement;

    const style = window.getComputedStyle(firstElement);

    expect(style.getPropertyValue(marginProperty)).toBe('4px 4px');
  });

  it('should handle large columns', () => {
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

    const { container } = render(
      <Masonry columns={{ xs: 1, sm: 2, md: 3 }}>
        <Demo />
      </Masonry>,
    );

    const elements = container.querySelectorAll('.ant-masonry > *');
    const styles = Array.from(elements).map((element) => window.getComputedStyle(element));

    expect(styles[0].getPropertyValue(orderProperty)).toBe('1');
    expect(styles[1].getPropertyValue(orderProperty)).toBe('2');
    expect(styles[2].getPropertyValue(orderProperty)).toBe('3');
    expect(styles[3].getPropertyValue(orderProperty)).not.toBe('4');
  });

  it('should handle array gutter', () => {
    const { container } = render(
      <Masonry columns={2} gutter={[8, 16]}>
        <Demo />
      </Masonry>,
    );

    const firstElement = container.querySelectorAll('.ant-masonry > *')[0] as HTMLElement;

    const style = window.getComputedStyle(firstElement);

    expect(style.getPropertyValue(marginProperty)).toBe('8px 4px');
  });
});
