import * as React from 'react';
import classNames from 'classnames';
import type { Tab } from 'rc-tabs/lib/interface';
import omit from 'rc-util/lib/omit';

import { ConfigContext } from '../config-provider';
import useSize from '../config-provider/hooks/useSize';
import Skeleton from '../skeleton';
import type { TabsProps } from '../tabs';
import Tabs from '../tabs';
import Grid from './Grid';
import useStyle from './style';

export type CardType = 'inner';
export type CardSize = 'default' | 'small';

export interface CardTabListType extends Omit<Tab, 'label'> {
  key: string;
  /** @deprecated Please use `label` instead */
  tab?: React.ReactNode;
  label?: React.ReactNode;
}

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  prefixCls?: string;
  title?: React.ReactNode;
  extra?: React.ReactNode;
  bordered?: boolean;
  headStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  loading?: boolean;
  hoverable?: boolean;
  children?: React.ReactNode;
  id?: string;
  className?: string;
  rootClassName?: string;
  size?: CardSize;
  type?: CardType;
  cover?: React.ReactNode;
  actions?: React.ReactNode[];
  tabList?: CardTabListType[];
  tabBarExtraContent?: React.ReactNode;
  onTabChange?: (key: string) => void;
  activeTabKey?: string;
  defaultActiveTabKey?: string;
  tabProps?: TabsProps;
  classNames?: {
    head?: string;
    body?: string;
    extra?: string;
    title?: string;
    tabs?: string;
    actions?: string;
    cover?: string;
    headWrapper?: string;
  };
  styles?: {
    head?: React.CSSProperties;
    body?: React.CSSProperties;
    extra?: React.CSSProperties;
    title?: React.CSSProperties;
    tabs?: React.CSSProperties;
    actions?: React.CSSProperties;
    cover?: React.CSSProperties;
    headWrapper?: React.CSSProperties;
  };
}

const ActionNode: React.FC<{
  actionClasses: string;
  actions: React.ReactNode[];
  actionStyle: React.CSSProperties;
}> = (props) => {
  const { actionClasses, actions = [], actionStyle } = props;
  return (
    <ul className={actionClasses} style={actionStyle}>
      {actions.map<React.ReactNode>((action, index) => {
        // Move this out since eslint not allow index key
        // And eslint-disable makes conflict with rollup
        // ref https://github.com/ant-design/ant-design/issues/46022
        const key = `action-${index}`;
        return (
          <li style={{ width: `${100 / actions.length}%` }} key={key}>
            <span>{action}</span>
          </li>
        );
      })}
    </ul>
  );
};

const Card = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    style,
    extra,
    headStyle = {},
    bodyStyle = {},
    title,
    loading,
    bordered = true,
    size: customizeSize,
    type,
    cover,
    actions,
    tabList,
    children,
    activeTabKey,
    defaultActiveTabKey,
    tabBarExtraContent,
    hoverable,
    tabProps = {},
    classNames: customClassNames,
    styles: customStyles,
    ...others
  } = props;

  const { getPrefixCls, direction, card } = React.useContext(ConfigContext);

  const onTabChange = (key: string) => {
    props.onTabChange?.(key);
  };

  const isContainGrid = React.useMemo<boolean>(() => {
    let containGrid = false;
    React.Children.forEach(children, (element: JSX.Element) => {
      if (element && element.type && element.type === Grid) {
        containGrid = true;
      }
    });
    return containGrid;
  }, [children]);

  const prefixCls = getPrefixCls('card', customizePrefixCls);
  const [wrapCSSVar, hashId] = useStyle(prefixCls);

  const loadingBlock = (
    <Skeleton loading active paragraph={{ rows: 4 }} title={false}>
      {children}
    </Skeleton>
  );

  const hasActiveTabKey = activeTabKey !== undefined;
  const extraProps = {
    ...tabProps,
    [hasActiveTabKey ? 'activeKey' : 'defaultActiveKey']: hasActiveTabKey
      ? activeTabKey
      : defaultActiveTabKey,
    tabBarExtraContent,
  };

  let head: React.ReactNode;
  const mergedSize = useSize(customizeSize);
  const tabSize = !mergedSize || mergedSize === 'default' ? 'large' : mergedSize;
  const tabsClasses = classNames(
    `${prefixCls}-head-tabs`,
    card?.classNames?.tabs,
    customClassNames?.tabs,
  );
  const mergedTabsStyle: React.CSSProperties = { ...card?.styles?.tabs, ...customStyles?.tabs };
  const tabs = tabList ? (
    <Tabs
      size={tabSize}
      {...extraProps}
      className={tabsClasses}
      style={mergedTabsStyle}
      onChange={onTabChange}
      items={tabList.map(({ tab, ...item }) => ({ label: tab, ...item }))}
    />
  ) : null;
  if (title || extra || tabs) {
    const headClasses = classNames(
      `${prefixCls}-head`,
      card?.classNames?.head,
      customClassNames?.head,
    );
    const mergedHeadStyle: React.CSSProperties = {
      ...card?.styles?.head,
      ...customStyles?.head,
      ...headStyle,
    };
    const titleClasses = classNames(
      `${prefixCls}-head-title`,
      card?.classNames?.title,
      customClassNames?.title,
    );
    const mergedTitleStyle: React.CSSProperties = {
      ...card?.styles?.title,
      ...customStyles?.title,
    };
    const extraClasses = classNames(
      `${prefixCls}-extra`,
      card?.classNames?.extra,
      customClassNames?.extra,
    );
    const mergedExtraStyle: React.CSSProperties = {
      ...card?.styles?.extra,
      ...customStyles?.extra,
    };
    const headWrapperClasses = classNames(
      `${prefixCls}-head-wrapper`,
      card?.classNames?.headWrapper,
      customClassNames?.headWrapper,
    );
    const mergedHeadWrapperStyle: React.CSSProperties = {
      ...card?.styles?.headWrapper,
      ...customStyles?.headWrapper,
    };
    head = (
      <div className={headClasses} style={mergedHeadStyle}>
        <div className={headWrapperClasses} style={mergedHeadWrapperStyle}>
          {title && (
            <div className={titleClasses} style={mergedTitleStyle}>
              {title}
            </div>
          )}
          {extra && (
            <div className={extraClasses} style={mergedExtraStyle}>
              {extra}
            </div>
          )}
        </div>
        {tabs}
      </div>
    );
  }
  const coverClasses = classNames(
    `${prefixCls}-cover`,
    card?.classNames?.cover,
    customClassNames?.cover,
  );
  const mergedCoverStyle: React.CSSProperties = {
    ...card?.styles?.cover,
    ...customStyles?.cover,
  };
  const coverDom = cover ? (
    <div className={coverClasses} style={mergedCoverStyle}>
      {cover}
    </div>
  ) : null;
  const bodyClasses = classNames(
    `${prefixCls}-body`,
    card?.classNames?.body,
    customClassNames?.body,
  );
  const mergedBodyStyle: React.CSSProperties = {
    ...card?.styles?.body,
    ...customStyles?.body,
    ...bodyStyle,
  };
  const body = (
    <div className={bodyClasses} style={mergedBodyStyle}>
      {loading ? loadingBlock : children}
    </div>
  );

  const actionClasses = classNames(
    `${prefixCls}-actions`,
    card?.classNames?.actions,
    customClassNames?.actions,
  );
  const mergedActionStyle: React.CSSProperties = {
    ...card?.styles?.actions,
    ...customStyles?.actions,
  };
  const actionDom =
    actions && actions.length ? (
      <ActionNode actionClasses={actionClasses} actionStyle={mergedActionStyle} actions={actions} />
    ) : null;

  const divProps = omit(others, ['onTabChange']);

  const classString = classNames(
    prefixCls,
    card?.className,
    {
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-bordered`]: bordered,
      [`${prefixCls}-hoverable`]: hoverable,
      [`${prefixCls}-contain-grid`]: isContainGrid,
      [`${prefixCls}-contain-tabs`]: tabList && tabList.length,
      [`${prefixCls}-${mergedSize}`]: mergedSize,
      [`${prefixCls}-type-${type}`]: !!type,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
    rootClassName,
    hashId,
  );

  const mergedStyle: React.CSSProperties = { ...card?.style, ...style };

  return wrapCSSVar(
    <div ref={ref} {...divProps} className={classString} style={mergedStyle}>
      {head}
      {coverDom}
      {body}
      {actionDom}
    </div>,
  );
});

export default Card;
