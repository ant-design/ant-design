import * as React from 'react';

export default function useMergedConfig<Target>(
  propConfig: any,
  templateConfig?: Target,
): [boolean, Target] {
  return React.useMemo(() => {
    const support = !!origin;

    return [
      support,
      {
        ...templateConfig,
        ...(support && typeof propConfig === 'object' ? propConfig : null),
      },
    ];
  }, [origin]);
}
