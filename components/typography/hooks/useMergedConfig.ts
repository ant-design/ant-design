import * as React from 'react';

import { isPlainObject } from '../../_util/is';

const useMergedConfig = <Target>(propConfig?: boolean | Target, templateConfig?: Target) => {
  const support = Boolean(propConfig);

  return React.useMemo<readonly [boolean, Target]>(() => {
    const config = {
      ...(support ? templateConfig : null),
      ...(support && isPlainObject(propConfig) ? propConfig : null),
    } as Target;
    return [support, config] as const;
  }, [support, propConfig, templateConfig]);
};

export default useMergedConfig;
