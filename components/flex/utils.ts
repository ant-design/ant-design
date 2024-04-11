import classNames from 'classnames';

import type { FlexProps } from './interface';

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

const genClsWrap = (prefixCls: string, wrap: FlexProps['wrap']) => {
  if (typeof wrap === 'boolean') {
    return {
      [`${prefixCls}-wrap-wrap`]: wrap,
      [`${prefixCls}-wrap-nowrap`]: !wrap,
    };
  }
  return {
    [`${prefixCls}-wrap-${wrap}`]: flexWrapValues.includes(wrap as any),
  };
};

const genClsAlign = (prefixCls: string, props: FlexProps) => {
  const alignCls: Record<PropertyKey, boolean> = {};
  alignItemsValues.forEach((cssKey) => {
    alignCls[`${prefixCls}-align-${cssKey}`] = props.align === cssKey;
  });
  alignCls[`${prefixCls}-align-stretch`] = !props.align && !!props.vertical;
  return alignCls;
};

const genClsJustify = (prefixCls: string, props: FlexProps) => {
  const justifyCls: Record<PropertyKey, boolean> = {};
  justifyContentValues.forEach((cssKey) => {
    justifyCls[`${prefixCls}-justify-${cssKey}`] = props.justify === cssKey;
  });
  return justifyCls;
};

function createFlexClassNames(prefixCls: string, props: FlexProps) {
  return classNames({
    ...genClsWrap(prefixCls, props.wrap),
    ...genClsAlign(prefixCls, props),
    ...genClsJustify(prefixCls, props),
  });
}

export default createFlexClassNames;
