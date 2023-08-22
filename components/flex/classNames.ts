import classNames from 'classnames';

import type { FlexProps } from './interface';

const directionValues = ['row', 'row-reverse', 'column', 'column-reverse'] as const;

const wrapValues = ['wrap', 'nowrap', 'wrap-reverse'] as const;

const justifyValues = [
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

const alignValues = [
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
  wrapValues.forEach((cssKey) => {
    wrapCls[`${prefixCls}-${cssKey}`] = wrap === cssKey;
  });
  return wrapCls;
};

const genClsAlign = (prefixCls: string, align: React.CSSProperties['alignItems']) => {
  const alignCls: Record<PropertyKey, boolean> = {};
  alignValues.forEach((cssKey) => {
    alignCls[`${prefixCls}-align-${cssKey}`] = align === cssKey;
  });
  return alignCls;
};

const genClsJustify = (prefixCls: string, justify: React.CSSProperties['justifyContent']) => {
  const justifyCls: Record<PropertyKey, boolean> = {};
  justifyValues.forEach((cssKey) => {
    justifyCls[`${prefixCls}-justify-${cssKey}`] = justify === cssKey;
  });
  return justifyCls;
};

const genClsDirection = (prefixCls: string, direction: React.CSSProperties['flexDirection']) => {
  const directionCls: Record<PropertyKey, boolean> = {};
  directionValues.forEach((cssKey) => {
    directionCls[`${prefixCls}-direction-${cssKey}`] = direction === cssKey;
  });
  return directionCls;
};

const createFlexClassNames = (prefixCls: string, props: FlexProps) => {
  const { direction, wrap, justify, align } = props;
  return classNames({
    ...genClsWrap(prefixCls, wrap),
    ...genClsAlign(prefixCls, align),
    ...genClsJustify(prefixCls, justify),
    ...genClsDirection(prefixCls, direction),
  });
};

export default createFlexClassNames;
