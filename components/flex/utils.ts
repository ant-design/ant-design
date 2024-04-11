import classNames from 'classnames';

import type { FlexProps } from './interface';

export const flexWrapValues: React.CSSProperties['flexWrap'][] = ['wrap', 'nowrap', 'wrap-reverse'];

export const justifyContentValues: React.CSSProperties['justifyContent'][] = [
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
];

export const alignItemsValues: React.CSSProperties['alignItems'][] = [
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
];

const genClsWrap = (prefixCls: string, props: FlexProps) => {
  const wrap = props.wrap === true ? 'wrap' : props.wrap;
  return wrap && flexWrapValues.includes(wrap) && `${prefixCls}-wrap-${wrap}`;
};

function genClsAlign(prefixCls: string, props: FlexProps) {
  return alignItemsValues.reduce<Record<PropertyKey, boolean>>((alignCls, cssKey) => {
    alignCls[`${prefixCls}-align-${cssKey}`] = props.align === cssKey;
    alignCls[`${prefixCls}-align-stretch`] = !props.align && !!props.vertical;
    return alignCls;
  }, {});
}

function genClsJustify(prefixCls: string, props: FlexProps) {
  return justifyContentValues.reduce<Record<PropertyKey, boolean>>((justifyCls, cssKey) => {
    justifyCls[`${prefixCls}-justify-${cssKey}`] = props.justify === cssKey;
    return justifyCls;
  }, {});
}

function createFlexClassNames(prefixCls: string, props: FlexProps) {
  return classNames(genClsWrap(prefixCls, props), {
    ...genClsAlign(prefixCls, props),
    ...genClsJustify(prefixCls, props),
  });
}

export default createFlexClassNames;
