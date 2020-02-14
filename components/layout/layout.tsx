import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { SiderProps } from './Sider';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import { AppLayoutVariant, AppLayoutContext }  from './AppLayoutContext';

export interface GeneratorProps {
  suffixCls: string;
  tagName: 'header' | 'footer' | 'main' | 'section';
  displayName: string;
}
export interface BasicProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  hasSider?: boolean;
}

export interface LayoutContextProps {
  siderHook: {
    addSider: (id: string) => void;
    removeSider: (id: string) => void;
  };
}
export const LayoutContext = React.createContext<LayoutContextProps>({
  siderHook: {
    addSider: () => null,
    removeSider: () => null,
  },
});

interface BasicPropsWithTagName extends BasicProps {
  tagName: 'header' | 'footer' | 'main' | 'section';
}

function generator({ suffixCls, tagName, displayName }: GeneratorProps) {
  return (BasicComponent: any) => {
    return class Adapter extends React.Component<BasicProps, any> {
      static displayName: string = displayName;

      static Header: any;

      static Footer: any;

      static Content: any;

      static Sider: any;

      renderComponent = ({ getPrefixCls }: ConfigConsumerProps) => {
        const { prefixCls: customizePrefixCls } = this.props;
        const prefixCls = getPrefixCls(suffixCls, customizePrefixCls);

        return <BasicComponent prefixCls={prefixCls} tagName={tagName} {...this.props} />;
      };

      render() {
        return <ConfigConsumer>{this.renderComponent}</ConfigConsumer>;
      }
    };
  };
}

const Basic = (props: BasicPropsWithTagName) => {
  const { prefixCls, className, children, tagName, ...others } = props;
  const classString = classNames(prefixCls, className);
  return React.createElement(tagName, { className: classString, ...others }, children);
};

interface BasicLayoutState {
  siders: string[];
}

class BasicLayout extends React.Component<BasicPropsWithTagName, BasicLayoutState> {
  state = { siders: [] };

  getSiderHook() {
    return {
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
    };
  }

  renderComponent = ({ direction }: ConfigConsumerProps) => {
    const { prefixCls, className, children, hasSider, tagName: Tag, ...others } = this.props;
    const classString = classNames(
      prefixCls,
      {
        [`${prefixCls}-has-sider`]:
          typeof hasSider === 'boolean' ? hasSider : this.state.siders.length > 0,
        [`${prefixCls}-rtl`]: direction === 'rtl',
      },
      className,
    );

    return (
      <LayoutContext.Provider value={{ siderHook: this.getSiderHook() }}>
        <Tag className={classString} {...others}>
          {children}
        </Tag>
      </LayoutContext.Provider>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderComponent}</ConfigConsumer>;
  }
}

const AntdLayout: React.ComponentClass<BasicProps> & {
  Header: React.ComponentClass<BasicProps>;
  Footer: React.ComponentClass<BasicProps>;
  Content: React.FunctionComponent<BasicProps>;
  Sider: React.ComponentClass<SiderProps>;
} = generator({
    suffixCls: 'layout',
    tagName: 'section',
    displayName: 'Layout',
  })(BasicLayout);

const Layout = styled(AntdLayout)<{ bgcolor?: string }>`
  && {
      background: ${({ theme, bgcolor }) => (bgcolor ? theme.color[bgcolor] : 'none')};
  }
`;

const Header = generator({
  suffixCls: 'layout-header',
  tagName: 'header',
  displayName: 'Header',
})(Basic);

const Footer = generator({
  suffixCls: 'layout-footer',
  tagName: 'footer',
  displayName: 'Footer',
})(Basic);

const AntdContent = generator({
  suffixCls: 'layout-content',
  tagName: 'main',
  displayName: 'Content',
})(Basic);

interface ContentProps extends BasicProps {
  children: React.ReactNode | React.ReactNodeArray;
  className?: string;
}

export const Content = ({ children, className, ...basicProps }: ContentProps) => (
  <AppLayoutContext.Consumer>
      {({ appLayoutVariant }) => (
          <ContentContainer layout={appLayoutVariant} className={className} {...basicProps}>
              {children}
          </ContentContainer>
      )}
  </AppLayoutContext.Consumer>
);

const ContentContainer = styled(AntdContent)<{ layout?: AppLayoutVariant }>`
  max-width: ${({ theme, layout }) => (layout === 'hcenter' ? theme.breakpoints.xl : null)};
  ${({ layout }) => (layout === 'hcenter' ? 'margin: 0 auto;' : '')}
  padding: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      padding: ${({ theme }) => theme.spacing.sm};
  }
`;

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;

export default Layout;
