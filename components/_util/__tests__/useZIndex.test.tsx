import type { PropsWithChildren } from 'react';
import React, { useEffect } from 'react';
import { render } from '@testing-library/react';

import { renderHook } from '../../../tests/utils';
import type { ZIndexConsumer } from '../hooks/useZIndex';
import { baseZIndexOffset, useZIndex } from '../hooks/useZIndex';
import { ZIndexContextProvider } from '../zindexContext';

const WrapWithProvider: React.FC<PropsWithChildren<{ zIndex: number }>> = ({
  children,
  zIndex,
}) => {
  const { curZIndex } = useZIndex();
  return (
    <ZIndexContextProvider
      value={{
        zIndex: (curZIndex || 0) + zIndex,
      }}
    >
      {children}
    </ZIndexContextProvider>
  );
};

describe('Test useZIndex hooks', () => {
  it('parentZIndex should be null when no parent', () => {
    const { result } = renderHook(() => useZIndex());
    expect(result.current!.parentZIndex).toBe(null);
    expect(result.current!.curZIndex).toBe(1000);
  });
  Object.keys(baseZIndexOffset).forEach((key) => {
    describe(`Test ${key} offset`, () => {
      it('parentZIndex should be parent zIndex', () => {
        const fn = jest.fn();
        const Child = () => {
          const { parentZIndex, curZIndex } = useZIndex(key as ZIndexConsumer);
          useEffect(() => {
            fn(parentZIndex, curZIndex);
          }, [parentZIndex, curZIndex]);
          return <div>Child</div>;
        };

        // const containerZIndex = (token.zIndexPopupBase + 100) * 3 = (1000 + 100) * 3 = 3300
        // const childZIndex = baseZIndexOffset["Select"] = 50;
        // const realZIndex = containerZIndex + childZIndex = 3350
        const App = () => (
          <WrapWithProvider zIndex={100}>
            <WrapWithProvider zIndex={100}>
              <WrapWithProvider zIndex={100}>
                <Child />
              </WrapWithProvider>
            </WrapWithProvider>
          </WrapWithProvider>
        );
        render(<App />);
        expect(fn).toHaveBeenLastCalledWith(3300, 3300 + baseZIndexOffset[key as ZIndexConsumer]);
      });
    });
  });
});
