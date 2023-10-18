import type { PropsWithChildren } from 'react';
import React, { useEffect } from 'react';
import { render } from '@testing-library/react';

import type { ZIndexConsumer, ZIndexContainer } from '../hooks/useZIndex';
import { consumerBaseZIndexOffset, containerBaseZIndexOffset, useZIndex } from '../hooks/useZIndex';
import { ZIndexContextProvider } from '../zindexContext';

const WrapWithProvider: React.FC<PropsWithChildren<{ containerType: ZIndexContainer }>> = ({
  children,
  containerType,
}) => {
  const { containerZIndex } = useZIndex(containerType);
  return <ZIndexContextProvider value={containerZIndex}>{children}</ZIndexContextProvider>;
};

describe('Test useZIndex hooks', () => {
  Object.keys(containerBaseZIndexOffset).forEach((containerKey) => {
    Object.keys(consumerBaseZIndexOffset).forEach((key) => {
      describe(`Test ${key} zIndex in ${containerKey}`, () => {
        it('parentZIndex should be parent zIndex', () => {
          const fn = jest.fn();
          const Child = () => {
            const { zIndex } = useZIndex(key as ZIndexConsumer);
            useEffect(() => {
              fn(zIndex);
            }, [zIndex]);
            return <div>Child</div>;
          };

          const App = () => (
            <WrapWithProvider containerType={containerKey as ZIndexContainer}>
              <WrapWithProvider containerType={containerKey as ZIndexContainer}>
                <WrapWithProvider containerType={containerKey as ZIndexContainer}>
                  <Child />
                </WrapWithProvider>
              </WrapWithProvider>
            </WrapWithProvider>
          );
          render(<App />);
          expect(fn).toHaveBeenLastCalledWith(
            (1000 + containerBaseZIndexOffset[containerKey as ZIndexContainer]) * 3 +
              consumerBaseZIndexOffset[key as ZIndexConsumer],
          );
        });
      });
    });
  });
});
