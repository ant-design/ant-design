/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import classNames from 'classnames';
import FloatButton, { floatButtonPrefixCls } from './FloatButton';
import FloatButtonGroup from './FloatButtonGroup';
import BackTop from './BackTop';
import type { FloatButtonProps, FloatButtonGroupProps } from './interface';
import { ConfigContext } from '../config-provider';

export interface PureFloatButtonProps extends FloatButtonProps {
  backTop?: boolean;
}

export interface PurePanelProps
  extends PureFloatButtonProps,
    Omit<FloatButtonGroupProps, 'children'> {
  /** Convert to FloatGroup when configured */
  items?: PureFloatButtonProps[];
}

function PureFloatButton({ backTop, ...props }: PureFloatButtonProps) {
  return backTop ? <BackTop {...props} visible target={undefined} /> : <FloatButton {...props} />;
}

export default function PurePanel({ className, items, ...props }: PurePanelProps) {
  const { prefixCls: customizePrefixCls } = props;

  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls(floatButtonPrefixCls, customizePrefixCls);
  const pureCls = `${prefixCls}-pure`;

  if (items) {
    return (
      <FloatButtonGroup className={classNames(className, pureCls)} {...props}>
        {items.map((item, index) => (
          <PureFloatButton key={index} {...item} />
        ))}
      </FloatButtonGroup>
    );
  }

  return <PureFloatButton className={classNames(className, pureCls)} {...props} />;
}
