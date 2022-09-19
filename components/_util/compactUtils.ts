/* eslint-disable import/prefer-default-export */
import classNames from 'classnames';

import type { SpaceCompactItemContextType } from '../space/Compact';

export function getCompactClassNames(
  prefixCls: string,
  compactItemContext: Omit<SpaceCompactItemContextType, 'size'> = {},
) {
  const { direction, isItem, isFirstItem, isLastItem } = compactItemContext;
  const joiner = direction === 'vertical' ? 'vertical-' : '-';

  return classNames({
    [`${prefixCls}-compact${joiner}item`]: isItem,
    [`${prefixCls}-compact${joiner}first-item`]: isFirstItem,
    [`${prefixCls}-compact${joiner}last-item`]: isLastItem,
  });
}
