import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import useStyle from './style';

export interface GeneratorProps {
  suffixCls?: string;
  tagName: 'header' | 'footer' | 'main' | 'section';
  displayName: string;
}
export interface BasicProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  suffixCls?: string;
  rootClassName?: string;
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
    const Adapter = React.forwardRef<HTMLElement, BasicProps>((props, ref) => (
      <BasicComponent ref={ref} suffixCls={suffixCls} tagName={tagName} {...props} />
    ));
    if (process.env.NODE_ENV !== 'production') {
      Adapter.displayName = displayName;
    }
    return Adapter;
  };
}

const Basic = React.forwardRef<HTMLElement, BasicPropsWithTagName>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    suffixCls,
    className,
    tagName: TagName,
    ...others
  } = props;

  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('layout', customizePrefixCls);

  const [wrapSSR, hashId] = useStyle(prefixCls as string);

  const prefixWithSuffixCls = suffixCls ? `${prefixCls}-${suffixCls}` : prefixCls;

  return wrapSSR(
    <TagName
      className={classNames(customizePrefixCls || prefixWithSuffixCls, className, hashId)}
      ref={ref}
      {...others}
    />,
  );
});

const BasicLayout = React.forwardRef<HTMLElement, BasicPropsWithTagName>((props, ref) => {
  const { direction } = React.useContext(ConfigContext);

  const [siders, setSiders] = React.useState<string[]>([]);

  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    children,
    hasSider,
    tagName: Tag,
    ...others
  } = props;

  const passedProps = omit(others, ['suffixCls']);

  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('layout', customizePrefixCls);

  const [wrapSSR, hashId] = useStyle(prefixCls as string);
  const classString = classNames(
    prefixCls,
    {
      [`${prefixCls}-has-sider`]: typeof hasSider === 'boolean' ? hasSider : siders.length > 0,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
    rootClassName,
    hashId,
  );

  const contextValue = React.useMemo(
    () => ({
      siderHook: {
        addSider: (id: string) => {
          setSiders((prev) => [...prev, id]);
        },
        removeSider: (id: string) => {
          setSiders((prev) => prev.filter((currentId) => currentId !== id));
        },
      },
    }),
    [],
  );

  return wrapSSR(
    <LayoutContext.Provider value={contextValue}>
      <Tag ref={ref} className={classString} {...passedProps}>
        {children}
      </Tag>
    </LayoutContext.Provider>,
  );
});

const Layout = generator({
  tagName: 'section',
  displayName: 'Layout',
})(BasicLayout);

const Header = generator({
  suffixCls: 'header',
  tagName: 'header',
  displayName: 'Header',
})(Basic);

const Footer = generator({
  suffixCls: 'footer',
  tagName: 'footer',
  displayName: 'Footer',
})(Basic);

const Content = generator({
  suffixCls: 'content',
  tagName: 'main',
  displayName: 'Content',
})(Basic);

export { Header, Footer, Content };

export default Layout;
