/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import classNames from 'classnames';
import FloatButton, { floatButtonPrefixCls } from './FloatButton';
import FloatButtonGroup from './FloatButtonGroup';
import type { FloatButtonProps, FloatButtonGroupProps } from './interface';
import { ConfigContext } from '../config-provider';

export interface PurePanelProps extends FloatButtonProps, FloatButtonGroupProps {
  /** Convert to FloatGroup when configured */
  items?: FloatButtonProps[];
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
          <FloatButton key={index} {...item} />
        ))}
      </FloatButtonGroup>
    );
  }

  return <FloatButton className={classNames(className, pureCls)} {...props} />;
}
