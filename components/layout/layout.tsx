import React from 'react';
import classNames from 'classnames';

export interface BasicProps {
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
  name: string;
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
        return <Basic prefixCls={prefixCls} name={props.name} {...this.props}/>;
      }
    };
  };
}

class Basic extends React.Component<BasicProps, any> {
  render() {
    const { prefixCls, className, children, name, ...others } = this.props;
    let hasSider;
    if (name === 'Layout') {
      React.Children.forEach(children, (ele: React.ReactElement<any>) => {
        if (ele && ele.props && ele.props.name === 'Sider') {
          hasSider = true;
        }
      });
    }
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
  name: 'Layout',
})(Basic);

const Header = generator({
  prefixCls: 'ant-layout-header',
  name: 'Header',
})(Basic);

const Footer = generator({
  prefixCls: 'ant-layout-footer',
  name: 'Footer',
})(Basic);

const Content = generator({
  prefixCls: 'ant-layout-content',
  name: 'Content',
})(Basic);

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;

export default Layout;
