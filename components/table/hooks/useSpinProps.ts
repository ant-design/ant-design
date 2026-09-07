import React from 'react';

import { isPlainObject } from '../../_util/is';
import type { SpinProps } from '../../spin';

const useSpinProps = (loading?: boolean | SpinProps) => {
  const spinProps = React.useMemo<SpinProps>(() => {
    if (typeof loading === 'boolean') {
      return { spinning: loading };
    }
    if (isPlainObject<SpinProps>(loading)) {
      return { spinning: true, ...loading };
    }
    return {};
  }, [loading]);
  return spinProps;
};

export default useSpinProps;
