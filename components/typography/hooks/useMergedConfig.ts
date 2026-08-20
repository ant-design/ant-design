import * as React from 'react';

import { isPlainObject } from '../../_util/is';

const useMergedConfig = <Target>(
  propConfig?: boolean | Target,
  templateConfig?: Target,
  falseConfig?: Target,
) => {
  const support = Boolean(propConfig);

  return React.useMemo<readonly [boolean, Target]>(() => {
    const config = {
      ...(support ? templateConfig : (falseConfig ?? templateConfig)),
      ...(support && isPlainObject(propConfig) ? propConfig : null),
    } as Target;
    return [support, config] as const;
  }, [support, propConfig, templateConfig, falseConfig]);
};

export default useMergedConfig;
