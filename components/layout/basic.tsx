import React from 'react';
import classNames from 'classnames';
import splitObject from '../_util/splitObject';

interface AdapterProps {
  props: Object;
}

function generator(props) {
  return (Basic) : any => {
    return class Adapter extends React.Component<AdapterProps, any> {
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

export interface BasicProps {
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
}

class Basic extends React.Component<BasicProps, any> {
  render() {
    const [{ prefixCls, className }, others] = splitObject(this.props,
      ['prefixCls', 'className']);
    const divCls = classNames(className, {
      [prefixCls]: true,
    });
    return (
      <div className={divCls} {...others} />
    );
  }
}

const Layout = generator({
  prefixCls: 'ant-layout',
  layout: true,
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
