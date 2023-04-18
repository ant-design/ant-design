import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { useLayoutEffect } from 'react';
import type { TourProps } from './interface';

interface Props {
  defaultType?: string;
  steps?: TourProps['steps'];
  current?: number;
  defaultCurrent?: number;
}

/**
 * returns the merged type of a step or the default type.
 */
const useMergedType = ({ defaultType, steps = [], current, defaultCurrent }: Props) => {
  const [innerCurrent, updateInnerCurrent] = useMergedState<number | undefined>(defaultCurrent, {
    value: current,
  });

  useLayoutEffect(() => {
    if (current === undefined) return;
    updateInnerCurrent(current);
  }, [current]);

  const innerType = typeof innerCurrent === 'number' ? steps[innerCurrent]?.type : defaultType;
  const currentMergedType = innerType ?? defaultType;

  return { currentMergedType, updateInnerCurrent };
};

export default useMergedType;
