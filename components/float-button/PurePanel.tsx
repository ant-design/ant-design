/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import classNames from 'classnames';
import FloatButton, { floatButtonPrefixCls } from './FloatButton';
import FloatButtonGroup from './FloatButtonGroup';
import BackTop from './BackTop';
import type { FloatButtonProps, FloatButtonGroupProps } from './interface';
import { ConfigContext } from '../config-provider';

export interface PureFloatButtonProps extends Omit<FloatButtonProps, 'target'> {
  backTop?: boolean;
}

export interface PurePanelProps
  extends PureFloatButtonProps,
    Omit<FloatButtonGroupProps, 'children'> {
  /** Convert to FloatGroup when configured */
  items?: PureFloatButtonProps[];
}

const PureFloatButton: React.FC<PureFloatButtonProps> = ({ backTop, ...props }) =>
  backTop ? <BackTop {...props} visibilityHeight={0} /> : <FloatButton {...props} />;

function PurePanel({ className, items, ...props }: PurePanelProps) {
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

export default React.memo(PurePanel);
