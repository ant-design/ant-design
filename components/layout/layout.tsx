import * as React from 'react';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';

import { ConfigContext } from '../config-provider';
import { LayoutContext } from './context';
import useHasSider from './hooks/useHasSider';
import useStyle from './style';

export interface GeneratorProps {
  suffixCls?: string;
  tagName: 'header' | 'footer' | 'main' | 'div';
  displayName: string;
}
export interface BasicProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  suffixCls?: string;
  rootClassName?: string;
  hasSider?: boolean;
}

interface BasicPropsWithTagName extends BasicProps {
  tagName: 'header' | 'footer' | 'main' | 'div';
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

const Basic = React.forwardRef<HTMLDivElement, BasicPropsWithTagName>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    suffixCls,
    className,
    tagName: TagName,
    ...others
  } = props;

  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('layout', customizePrefixCls);

  const [wrapSSR, hashId] = useStyle(prefixCls);

  const prefixWithSuffixCls = suffixCls ? `${prefixCls}-${suffixCls}` : prefixCls;

  return wrapSSR(
    <TagName
      className={classNames(customizePrefixCls || prefixWithSuffixCls, className, hashId)}
      ref={ref}
      {...others}
    />,
  );
});

const BasicLayout = React.forwardRef<HTMLDivElement, BasicPropsWithTagName>((props, ref) => {
  const { direction } = React.useContext(ConfigContext);

  const [siders, setSiders] = React.useState<string[]>([]);

  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    children,
    hasSider,
    tagName: Tag,
    style,
    ...others
  } = props;

  const passedProps = omit(others, ['suffixCls']);

  const { getPrefixCls, layout } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('layout', customizePrefixCls);

  const mergedHasSider = useHasSider(siders, children, hasSider);

  const [wrapSSR, hashId] = useStyle(prefixCls);
  const classString = classNames(
    prefixCls,
    {
      [`${prefixCls}-has-sider`]: mergedHasSider,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    layout?.className,
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
      <Tag
        ref={ref}
        className={classString}
        style={{ ...layout?.style, ...style }}
        {...passedProps}
      >
        {children}
      </Tag>
    </LayoutContext.Provider>,
  );
});

const Layout = generator({
  tagName: 'div',
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

export { Content, Footer, Header };

export default Layout;
