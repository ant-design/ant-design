import React from 'react';
import Masonry from '..';
import { render, waitFakeTimer } from '../../../tests/utils';

jest.mock('../hooks/useDelay', () => {
  return (callback: VoidFunction) => callback;
});

jest.mock('../VirtualMasonry', () => {
  const ReactLib: typeof import('react') = jest.requireActual('react');

  const MockVirtualMasonry = ({
    onScrollStateChange,
    collectItemSize,
  }: {
    onScrollStateChange?: (scrolling: boolean) => void;
    collectItemSize: VoidFunction;
  }) => {
    ReactLib.useEffect(() => {
      onScrollStateChange?.(true);
      collectItemSize();
      onScrollStateChange?.(false);
    }, [collectItemSize, onScrollStateChange]);

    return <div data-testid="mock-virtual-masonry" />;
  };

  return {
    __esModule: true,
    default: MockVirtualMasonry,
  };
});

describe('Masonry.virtual coverage branches', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(async () => {
    await waitFakeTimer();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('covers pending collect branch while scrolling', async () => {
    render(
      <Masonry
        virtual
        items={[
          { key: '1', data: 10 },
          { key: '2', data: 20 },
        ]}
        itemRender={({ data }) => <div style={{ height: data }}>{data}</div>}
      />,
    );

    await waitFakeTimer();
  });
});
