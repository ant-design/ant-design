import * as React from 'react';
import type { Tab, TabBarExtraContent } from '@rc-component/tabs/lib/interface';
import { omit, toArray } from '@rc-component/util';
import { clsx } from 'clsx';

import { useMergeSemantic } from '../_util/hooks';
import type { SemanticType } from '../_util/hooks';
import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import useSize from '../config-provider/hooks/useSize';
import useVariant from '../form/hooks/useVariants';
import Skeleton from '../skeleton';
import type { TabsProps } from '../tabs';
import Tabs from '../tabs';
import CardGrid from './CardGrid';
import useStyle from './style';

export type CardType = 'inner';

export type CardSize = 'default' | 'small';

export interface CardTabListType extends Omit<Tab, 'label'> {
  key: string;
  /** @deprecated Please use `label` instead */
  tab?: React.ReactNode;
  label?: React.ReactNode;
}

export type CardSemanticType = {
  classNames?: {
    root?: string;
    header?: string;
    body?: string;
    extra?: string;
    title?: string;
    actions?: string;
    cover?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    header?: React.CSSProperties;
    body?: React.CSSProperties;
    extra?: React.CSSProperties;
    title?: React.CSSProperties;
    actions?: React.CSSProperties;
    cover?: React.CSSProperties;
  };
};

export type CardClassNamesType = SemanticType<CardProps, CardSemanticType['classNames']>;

export type CardStylesType = SemanticType<CardProps, CardSemanticType['styles']>;

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  prefixCls?: string;
  title?: React.ReactNode;
  extra?: React.ReactNode;
  /** @deprecated Please use `variant` instead */
  bordered?: boolean;
  /** @deprecated Please use `styles.header` instead */
  headStyle?: React.CSSProperties;
  /** @deprecated Please use `styles.body` instead */
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
  tabBarExtraContent?: TabBarExtraContent;
  onTabChange?: (key: string) => void;
  activeTabKey?: string;
  defaultActiveTabKey?: string;
  tabProps?: TabsProps;
  classNames?: CardClassNamesType;
  styles?: CardStylesType;
  variant?: 'borderless' | 'outlined';
}

const ActionNode: React.FC<{
  actionClasses: string;
  actions: React.ReactNode[];
  actionStyle?: React.CSSProperties;
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
    bordered,
    variant: customVariant,
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
    classNames,
    styles,
    ...rest
  } = props;
  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('card');
  const [variant] = useVariant('card', customVariant, bordered);

  const mergedSize = useSize(customizeSize);

  // =========== Merged Props for Semantic ==========
  const mergedProps: CardProps = {
    ...props,
    size: mergedSize,
    variant: variant as CardProps['variant'],
    loading,
  };

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    CardSemanticType['classNames'],
    CardSemanticType['styles'],
    CardProps
  >([contextClassNames, classNames], [contextStyles, styles], { props: mergedProps });

  // =================Warning===================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Card');
    [
      ['headStyle', 'styles.header'],
      ['bodyStyle', 'styles.body'],
      ['bordered', 'variant'],
    ].forEach(([deprecatedName, newName]) => {
      warning.deprecated(!(deprecatedName in props), deprecatedName, newName);
    });
  }

  const onTabChange = (key: string) => {
    props.onTabChange?.(key);
  };

  const isContainGrid = React.useMemo<boolean>(() => {
    const childNodes: React.ReactNode[] = toArray(children);
    return childNodes.some((child) => React.isValidElement(child) && child.type === CardGrid);
  }, [children]);

  const prefixCls = getPrefixCls('card', customizePrefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls);

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
  const tabSize = !mergedSize || mergedSize === 'default' ? 'large' : mergedSize;
  const tabs = tabList ? (
    <Tabs
      size={tabSize}
      {...extraProps}
      className={`${prefixCls}-head-tabs`}
      onChange={onTabChange}
      items={tabList.map(({ tab, ...item }) => ({ label: tab, ...item }))}
    />
  ) : null;
  if (title || extra || tabs) {
    const headClasses = clsx(`${prefixCls}-head`, mergedClassNames.header);
    const titleClasses = clsx(`${prefixCls}-head-title`, mergedClassNames.title);
    const extraClasses = clsx(`${prefixCls}-extra`, mergedClassNames.extra);
    const mergedHeadStyle: React.CSSProperties = {
      ...headStyle,
      ...mergedStyles.header,
    };
    head = (
      <div className={headClasses} style={mergedHeadStyle}>
        <div className={`${prefixCls}-head-wrapper`}>
          {title && (
            <div className={titleClasses} style={mergedStyles.title}>
              {title}
            </div>
          )}
          {extra && (
            <div className={extraClasses} style={mergedStyles.extra}>
              {extra}
            </div>
          )}
        </div>
        {tabs}
      </div>
    );
  }
  const coverClasses = clsx(`${prefixCls}-cover`, mergedClassNames.cover);
  const coverDom = cover ? (
    <div className={coverClasses} style={mergedStyles.cover}>
      {cover}
    </div>
  ) : null;
  const bodyClasses = clsx(`${prefixCls}-body`, mergedClassNames.body);
  const mergedBodyStyle: React.CSSProperties = {
    ...bodyStyle,
    ...mergedStyles.body,
  };
  const body = (
    <div className={bodyClasses} style={mergedBodyStyle}>
      {loading ? loadingBlock : children}
    </div>
  );

  const actionClasses = clsx(`${prefixCls}-actions`, mergedClassNames.actions);
  const actionDom = actions?.length ? (
    <ActionNode
      actionClasses={actionClasses}
      actionStyle={mergedStyles.actions}
      actions={actions}
    />
  ) : null;

  const divProps = omit(rest, ['onTabChange']);

  const classString = clsx(
    prefixCls,
    contextClassName,
    {
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-bordered`]: variant !== 'borderless',
      [`${prefixCls}-hoverable`]: hoverable,
      [`${prefixCls}-contain-grid`]: isContainGrid,
      [`${prefixCls}-contain-tabs`]: tabList?.length,
      [`${prefixCls}-${mergedSize}`]: mergedSize,
      [`${prefixCls}-type-${type}`]: !!type,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
    rootClassName,
    hashId,
    cssVarCls,
    mergedClassNames.root,
  );

  const mergedStyle: React.CSSProperties = {
    ...mergedStyles.root,
    ...contextStyle,
    ...style,
  };

  return (
    <div ref={ref} {...divProps} className={classString} style={mergedStyle}>
      {head}
      {coverDom}
      {body}
      {actionDom}
    </div>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Card.displayName = 'Card';
}

export default Card;
