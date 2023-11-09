import classNames from 'classnames';
import { Divider } from 'rc-menu';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import useCSSVar from './style/cssVar';

export interface MenuDividerProps extends React.HTMLAttributes<HTMLLIElement> {
  className?: string;
  prefixCls?: string;
  style?: React.CSSProperties;
  dashed?: boolean;
}

const MenuDivider: React.FC<MenuDividerProps> = (props) => {
  const { prefixCls: customizePrefixCls, className, dashed, ...restProps } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('menu', customizePrefixCls);
  const wrapCSSVar = useCSSVar(prefixCls);
  const classString = classNames(
    {
      [`${prefixCls}-item-divider-dashed`]: !!dashed,
    },
    className,
  );

  return wrapCSSVar(<Divider className={classString} {...restProps} />);
};

export default MenuDivider;
