/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import BackTop from './BackTop';
import FloatButton, { floatButtonPrefixCls } from './FloatButton';
import FloatButtonGroup from './FloatButtonGroup';
import type { FloatButtonGroupProps, FloatButtonProps } from './interface';

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

/** @private Internal Component. Do not use in your production. */
const PurePanel: React.FC<PurePanelProps> = ({ className, items, ...props }) => {
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
};

export default PurePanel;
