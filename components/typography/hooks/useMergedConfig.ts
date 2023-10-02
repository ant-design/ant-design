import * as React from 'react';

export default function useMergedConfig<Target>(
  propConfig: any,
  templateConfig?: Target,
): readonly [boolean, Target] {
  return React.useMemo<readonly [boolean, Target]>(() => {
    const support = !!propConfig;

    return [
      support,
      {
        ...templateConfig,
        ...(support && typeof propConfig === 'object' ? propConfig : null),
      },
    ] as const;
  }, [propConfig]);
}
