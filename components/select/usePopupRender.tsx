import React from 'react';

import ContextIsolator from '../_util/ContextIsolator';

type RenderFunction<T extends any[]> = (...args: T) => React.ReactNode;

function usePopupRender<T extends [React.ReactElement, ...any[]]>(
  renderFn?: RenderFunction<T>,
): ((...args: T) => React.ReactElement) | undefined {
  return React.useMemo(() => {
    if (!renderFn) {
      return undefined;
    }
    return (...args: T) => <ContextIsolator space>{renderFn(...args)}</ContextIsolator>;
  }, [renderFn]);
}

export default usePopupRender;
