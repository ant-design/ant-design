import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { SiderProps } from './Sider';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface GeneratorProps {
  suffixCls: string;
}
export interface BasicProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  hasSider?: boolean;
}

function generator({ suffixCls }: GeneratorProps) {
  return (BasicComponent: React.ComponentClass<BasicProps>): any => {
    return class Adapter extends React.Component<BasicProps, any> {
      static Header: any;
      static Footer: any;
      static Content: any;
      static Sider: any;

      renderComponent = ({ getPrefixCls }: ConfigConsumerProps) => {
        const { prefixCls: customizePrefixCls } = this.props;
        const prefixCls = getPrefixCls(suffixCls, customizePrefixCls);

        return <BasicComponent prefixCls={prefixCls} {...this.props} />;
      };

      render() {
        return <ConfigConsumer>{this.renderComponent}</ConfigConsumer>;
      }
    };
  };
}

class Basic extends React.Component<BasicProps, any> {
  render() {
    const { prefixCls, className, children, ...others } = this.props;
    const divCls = classNames(className, prefixCls);
    return (
      <div className={divCls} {...others}>
        {children}
      </div>
    );
  }
}

interface BasicLayoutState {
  siders: string[];
}

class BasicLayout extends React.Component<BasicProps, BasicLayoutState> {
  static childContextTypes = {
    siderHook: PropTypes.object,
  };
  state = { siders: [] };

  getChildContext() {
    return {
      siderHook: {
        addSider: (id: string) => {
          this.setState(state => ({
            siders: [...state.siders, id],
          }));
        },
        removeSider: (id: string) => {
          this.setState(state => ({
            siders: state.siders.filter(currentId => currentId !== id),
          }));
        },
      },
    };
  }

  render() {
    const { prefixCls, className, children, hasSider, ...others } = this.props;
    const divCls = classNames(className, prefixCls, {
      [`${prefixCls}-has-sider`]: hasSider || this.state.siders.length > 0,
    });
    return (
      <div className={divCls} {...others}>
        {children}
      </div>
    );
  }
}

const Layout: React.ComponentClass<BasicProps> & {
  Header: React.ComponentClass<BasicProps>;
  Footer: React.ComponentClass<BasicProps>;
  Content: React.ComponentClass<BasicProps>;
  Sider: React.ComponentClass<SiderProps>;
} = generator({
  suffixCls: 'layout',
})(BasicLayout);

const Header = generator({
  suffixCls: 'layout-header',
})(Basic);

const Footer = generator({
  suffixCls: 'layout-footer',
})(Basic);

const Content = generator({
  suffixCls: 'layout-content',
})(Basic);

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;

export default Layout;
