import React from 'react';
import { clsx } from 'clsx';
import RcFooter from 'rc-footer';
import { ConfigContext } from '../config-provider';
import useStyle from './style';

export interface FooterColumnItem {
  title: React.ReactNode;
  url?: string;
  openExternal?: boolean;
  icon?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  LinkComponent?: React.ComponentType<any>;
}

export interface FooterColumn {
  prefixCls?: string;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  items?: FooterColumnItem[];
  className?: string;
  style?: React.CSSProperties;
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  prefixCls?: string;
  bottom?: React.ReactNode;
  maxColumnsPerRow?: number;
  columns?: FooterColumn[];
  theme?: 'dark' | 'light';
  className?: string;
  style?: React.CSSProperties;
  backgroundColor?: string;
  columnLayout?: 'space-around' | 'space-between';
}

const Footer: React.FC<FooterProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    style,
    theme,
    ...restProps
  } = props;

  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('footer', customizePrefixCls);

  const [hashId, cssVarCls] = useStyle(prefixCls);

  const classString = clsx(
    prefixCls,
    hashId,
    cssVarCls,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  );

  return (
    <RcFooter
      {...restProps}
      prefixCls={prefixCls}
      theme={theme}
      className={classString}
      style={style}
    />
  );
};

export default Footer;
