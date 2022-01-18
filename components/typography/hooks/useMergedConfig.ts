import * as React from 'react';

export default function useMergedConfig<Target>(
  propConfig: any,
  templateConfig?: Target,
): [boolean, Target] {
  return React.useMemo(() => {
    const support = !!propConfig;

    return [
      support,
      {
        ...templateConfig,
        ...(support && typeof propConfig === 'object' ? propConfig : null),
      },
    ];
  }, [propConfig]);
}
