import classNames from 'classnames';

import type { FlexProps } from './interface';

export const flexDirectionValues = ['row', 'row-reverse', 'column', 'column-reverse'] as const;

export const flexWrapValues = ['wrap', 'nowrap', 'wrap-reverse'] as const;

export const justifyContentValues = [
  'flex-start',
  'flex-end',
  'start',
  'end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
  'stretch',
  'normal',
  'left',
  'right',
] as const;

export const alignItemsValues = [
  'center',
  'start',
  'end',
  'flex-start',
  'flex-end',
  'self-start',
  'self-end',
  'baseline',
  'normal',
  'stretch',
] as const;

const genClsWrap = (prefixCls: string, wrap: React.CSSProperties['flexWrap']) => {
  const wrapCls: Record<PropertyKey, boolean> = {};
  flexWrapValues.forEach((cssKey) => {
    wrapCls[`${prefixCls}-wrap-${cssKey}`] = wrap === cssKey;
  });
  return wrapCls;
};

const genClsAlign = (prefixCls: string, align: React.CSSProperties['alignItems']) => {
  const alignCls: Record<PropertyKey, boolean> = {};
  alignItemsValues.forEach((cssKey) => {
    alignCls[`${prefixCls}-align-${cssKey}`] = align === cssKey;
  });
  return alignCls;
};

const genClsJustify = (prefixCls: string, justify: React.CSSProperties['justifyContent']) => {
  const justifyCls: Record<PropertyKey, boolean> = {};
  justifyContentValues.forEach((cssKey) => {
    justifyCls[`${prefixCls}-justify-${cssKey}`] = justify === cssKey;
  });
  return justifyCls;
};

const genClsDirection = (prefixCls: string, direction: React.CSSProperties['flexDirection']) => {
  const directionCls: Record<PropertyKey, boolean> = {};
  flexDirectionValues.forEach((cssKey) => {
    directionCls[`${prefixCls}-direction-${cssKey}`] = direction === cssKey;
  });
  return directionCls;
};

const genMergedAlignCls = (
  prefixCls: string,
  align: React.CSSProperties['alignItems'],
  direction: React.CSSProperties['flexDirection'],
) => {
  if (align) {
    return genClsAlign(prefixCls, align);
  }
  return {
    ...genClsAlign(prefixCls, align),
    [`${prefixCls}-align-stretch`]: direction === 'column' || direction === 'column-reverse',
  };
};

const createFlexClassNames = (prefixCls: string, props: FlexProps) => {
  const { direction, wrap, justify, align } = props;
  return classNames({
    ...genClsWrap(prefixCls, wrap),
    ...genClsJustify(prefixCls, justify),
    ...genClsDirection(prefixCls, direction),
    ...genMergedAlignCls(prefixCls, align, direction),
  });
};

export default createFlexClassNames;
