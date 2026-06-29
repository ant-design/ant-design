import * as React from 'react';
import type { StackConfig } from '@rc-component/notification';

import { isPlainObject } from '../../_util/is';

export type StackConfigInput = boolean | StackConfig | undefined;

const useStackConfig = (
  stackConfig: StackConfigInput,
  defaultStackConfig: StackConfigInput,
): false | StackConfig =>
  React.useMemo(() => {
    const mergedStackConfig = stackConfig ?? defaultStackConfig;

    if (!mergedStackConfig) {
      return false;
    }

    return {
      ...(isPlainObject(defaultStackConfig) ? defaultStackConfig : {}),
      ...(isPlainObject(mergedStackConfig) ? mergedStackConfig : {}),
    };
  }, [stackConfig, defaultStackConfig]);

export default useStackConfig;
