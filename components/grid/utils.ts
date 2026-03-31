import { clsx } from 'clsx';

import type { CSSGridProps } from './css-grid';

// CSS Grid alignment values - keep in sync with style/index.ts
export const justifyItemsValues = [
  'start',
  'end',
  'center',
  'stretch',
  'flex-start',
  'flex-end',
  'self-start',
  'self-end',
];

export const alignItemsValues = [
  'start',
  'end',
  'center',
  'stretch',
  'baseline',
  'flex-start',
  'flex-end',
  'self-start',
  'self-end',
];

export const justifyContentValues = [
  'start',
  'end',
  'center',
  'stretch',
  'space-between',
  'space-around',
  'space-evenly',
  'flex-start',
  'flex-end',
];

export const alignContentValues = [
  'start',
  'end',
  'center',
  'stretch',
  'space-between',
  'space-around',
  'space-evenly',
  'flex-start',
  'flex-end',
];

// Generate class names for alignment props
const genClsJustifyItems = (prefixCls: string, props: CSSGridProps) => {
  const cls: Record<string, boolean> = {};
  justifyItemsValues.forEach((value) => {
    cls[`${prefixCls}-justify-items-${value}`] = props.justifyItems === value;
  });
  return cls;
};

const genClsAlignItems = (prefixCls: string, props: CSSGridProps) => {
  const cls: Record<string, boolean> = {};
  alignItemsValues.forEach((value) => {
    cls[`${prefixCls}-align-items-${value}`] = props.alignItems === value;
  });
  return cls;
};

const genClsJustifyContent = (prefixCls: string, props: CSSGridProps) => {
  const cls: Record<string, boolean> = {};
  justifyContentValues.forEach((value) => {
    cls[`${prefixCls}-justify-content-${value}`] = props.justifyContent === value;
  });
  return cls;
};

const genClsAlignContent = (prefixCls: string, props: CSSGridProps) => {
  const cls: Record<string, boolean> = {};
  alignContentValues.forEach((value) => {
    cls[`${prefixCls}-align-content-${value}`] = props.alignContent === value;
  });
  return cls;
};

const createCSSGridClassNames = (prefixCls: string, props: CSSGridProps) => {
  return clsx(
    genClsJustifyItems(prefixCls, props),
    genClsAlignItems(prefixCls, props),
    genClsJustifyContent(prefixCls, props),
    genClsAlignContent(prefixCls, props),
  );
};

export default createCSSGridClassNames;
