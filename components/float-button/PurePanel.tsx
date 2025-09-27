/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import { clsx } from 'clsx';

import { ConfigContext } from '../config-provider';
import BackTop from './BackTop';
import FloatButton, { floatButtonPrefixCls } from './FloatButton';
import type { FloatButtonProps } from './FloatButton';
import FloatButtonGroup from './FloatButtonGroup';
import type { FloatButtonGroupProps } from './FloatButtonGroup';

export interface PureFloatButtonProps extends Omit<FloatButtonProps, 'target'> {
  backTop?: boolean;
}

type ClassNamesType = PureFloatButtonProps['classNames'] | FloatButtonGroupProps['classNames'];
type StylesType = PureFloatButtonProps['styles'] | FloatButtonGroupProps['styles'];

export interface PurePanelProps
  extends Omit<PureFloatButtonProps, 'classNames' | 'styles'>,
    Omit<FloatButtonGroupProps, 'children' | 'classNames' | 'styles'> {
  /** Convert to FloatGroup when configured */
  items?: PureFloatButtonProps[];
  classNames?: ClassNamesType;
  styles?: StylesType;
}

const PureFloatButton: React.FC<PureFloatButtonProps> = ({ backTop, ...props }) =>
  backTop ? <BackTop {...props} visibilityHeight={0} /> : <FloatButton {...props} />;

/** @private Internal Component. Do not use in your production. */
const PurePanel: React.FC<PurePanelProps> = ({
  className,
  items,
  classNames: cls,
  styles,
  prefixCls: customizePrefixCls,
  ...restProps
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls(floatButtonPrefixCls, customizePrefixCls);
  const pureCls = `${prefixCls}-pure`;

  if (items) {
    return (
      <FloatButtonGroup
        className={clsx(className, pureCls)}
        classNames={cls as FloatButtonGroupProps['classNames']}
        styles={styles as FloatButtonGroupProps['styles']}
        {...restProps}
      >
        {items.map((item, index) => (
          <PureFloatButton key={index} {...item} />
        ))}
      </FloatButtonGroup>
    );
  }

  return (
    <PureFloatButton
      className={clsx(className, pureCls)}
      classNames={cls as FloatButtonProps['classNames']}
      styles={styles as FloatButtonProps['styles']}
      {...restProps}
    />
  );
};

export default PurePanel;
