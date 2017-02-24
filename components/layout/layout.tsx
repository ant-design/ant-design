import React from 'react';
import classNames from 'classnames';

export interface BasicProps {
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
}

function generator(props) {
  return (Basic) : any => {
    return class Adapter extends React.Component<BasicProps, any> {
      static Header: any;
      static Footer: any;
      static Content: any;
      static Sider: any;
      render() {
        const { prefixCls } = props;
        return <Basic prefixCls={prefixCls} {...this.props}/>;
      }
    };
  };
}

class Basic extends React.Component<BasicProps, any> {
  render() {
    const { prefixCls, className, children, ...others } = this.props;
    let hasSider;
    React.Children.forEach(children, (element: any) => {
      if (element && element.type && element.type.__ANT_LAYOUT_SIDER) {
        hasSider = true;
      }
    });
    const divCls = classNames(className, prefixCls, {
      [`${prefixCls}-has-sider`]: hasSider,
    });
    return (
      <div className={divCls} {...others}>{children}</div>
    );
  }
}

const Layout = generator({
  prefixCls: 'ant-layout',
})(Basic);

const Header = generator({
  prefixCls: 'ant-layout-header',
})(Basic);

const Footer = generator({
  prefixCls: 'ant-layout-footer',
})(Basic);

const Content = generator({
  prefixCls: 'ant-layout-content',
})(Basic);

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;

export default Layout;
