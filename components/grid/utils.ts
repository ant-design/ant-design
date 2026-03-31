import { clsx } from 'clsx';

import type { CSSGridProps } from './css-grid';

// CSS Grid alignment values - keep in sync with style/index.ts
export const justifyItemsValues: React.CSSProperties['justifyItems'][] = [
  'start',
  'end',
  'center',
  'stretch',
  'flex-start',
  'flex-end',
  'self-start',
  'self-end',
  'normal',
  'legacy',
];

export const alignItemsValues: React.CSSProperties['alignItems'][] = [
  'start',
  'end',
  'center',
  'stretch',
  'baseline',
  'flex-start',
  'flex-end',
  'self-start',
  'self-end',
  'normal',
  'legacy',
];

export const justifyContentValues: React.CSSProperties['justifyContent'][] = [
  'start',
  'end',
  'center',
  'stretch',
  'space-between',
  'space-around',
  'space-evenly',
  'flex-start',
  'flex-end',
  'normal',
  'baseline',
];

export const alignContentValues: React.CSSProperties['alignContent'][] = [
  'start',
  'end',
  'center',
  'stretch',
  'space-between',
  'space-around',
  'space-evenly',
  'flex-start',
  'flex-end',
  'normal',
  'baseline',
];

// Generate class names for alignment props (preset values only)
const createCSSGridClassNames = (prefixCls: string, props: CSSGridProps) => {
  const { justifyItems, alignItems, justifyContent, alignContent } = props;
  return clsx(
    justifyItems &&
      justifyItemsValues.includes(justifyItems) &&
      `${prefixCls}-justify-items-${justifyItems}`,
    alignItems && alignItemsValues.includes(alignItems) && `${prefixCls}-align-items-${alignItems}`,
    justifyContent &&
      justifyContentValues.includes(justifyContent) &&
      `${prefixCls}-justify-content-${justifyContent}`,
    alignContent &&
      alignContentValues.includes(alignContent) &&
      `${prefixCls}-align-content-${alignContent}`,
  );
};

export default createCSSGridClassNames;
