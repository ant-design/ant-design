import type { DividerProps } from '../divider';
import Divider from '../divider';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import OverrideContext from './OverrideContext';

export type MenuDividerProps = Omit<DividerProps, 'type' | 'component'>;

const MenuDivider: React.FC<MenuDividerProps> = (props) => {
  const { prefixCls: customizePrefixCls, ...restProps } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);
  const override = React.useContext(OverrideContext);

  const prefixCls = getPrefixCls('menu', customizePrefixCls || override?.prefixCls);

  return <Divider prefixCls={`${prefixCls}-item-divider`} plain {...restProps} component="li" />;
};

export default MenuDivider;
