import * as React from 'react';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
import Grid from './Grid';
import Meta from './Meta';
import Tabs, { TabsProps } from '../tabs';
import Row from '../row';
import Col from '../col';
import { ConfigContext } from '../config-provider';
import { Omit } from '../_util/type';
import SizeContext from '../config-provider/SizeContext';

function getAction(actions: React.ReactNode[]) {
  const actionList = actions.map((action, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <li style={{ width: `${100 / actions.length}%` }} key={`action-${index}`}>
      <span>{action}</span>
    </li>
  ));
  return actionList;
}

export { CardGridProps } from './Grid';
export { CardMetaProps } from './Meta';

export type CardType = 'inner';
export type CardSize = 'default' | 'small';

export interface CardTabListType {
  key: string;
  tab: React.ReactNode;
  disabled?: boolean;
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
  size?: CardSize;
  type?: CardType;
  cover?: React.ReactNode;
  actions?: React.ReactNode[];
  tabList?: CardTabListType[];
  tabBarExtraContent?: React.ReactNode | null;
  onTabChange?: (key: string) => void;
  activeTabKey?: string;
  defaultActiveTabKey?: string;
  tabProps?: TabsProps;
}

export interface CardInterface extends React.FC<CardProps> {
  Grid: typeof Grid;
  Meta: typeof Meta;
}

const Card: CardInterface = props => {
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const size = React.useContext(SizeContext);

  const onTabChange = (key: string) => {
    props.onTabChange?.(key);
  };

  const isContainGrid = () => {
    let containGrid;
    React.Children.forEach(props.children, (element: JSX.Element) => {
      if (element && element.type && element.type === Grid) {
        containGrid = true;
      }
    });
    return containGrid;
  };

  const {
    prefixCls: customizePrefixCls,
    className,
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
    ...others
  } = props;

  const prefixCls = getPrefixCls('card', customizePrefixCls);

  const loadingBlockStyle =
    bodyStyle.padding === 0 || bodyStyle.padding === '0px' ? { padding: 24 } : undefined;

  const block = <div className={`${prefixCls}-loading-block`} />;

  const loadingBlock = (
    <div className={`${prefixCls}-loading-content`} style={loadingBlockStyle}>
      <Row gutter={8}>
        <Col span={22}>{block}</Col>
      </Row>
      <Row gutter={8}>
        <Col span={8}>{block}</Col>
        <Col span={15}>{block}</Col>
      </Row>
      <Row gutter={8}>
        <Col span={6}>{block}</Col>
        <Col span={18}>{block}</Col>
      </Row>
      <Row gutter={8}>
        <Col span={13}>{block}</Col>
        <Col span={9}>{block}</Col>
      </Row>
      <Row gutter={8}>
        <Col span={4}>{block}</Col>
        <Col span={3}>{block}</Col>
        <Col span={16}>{block}</Col>
      </Row>
    </div>
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
  const tabs =
    tabList && tabList.length ? (
      <Tabs
        size="large"
        {...extraProps}
        className={`${prefixCls}-head-tabs`}
        onChange={onTabChange}
      >
        {tabList.map(item => (
          <Tabs.TabPane tab={item.tab} disabled={item.disabled} key={item.key} />
        ))}
      </Tabs>
    ) : null;
  if (title || extra || tabs) {
    head = (
      <div className={`${prefixCls}-head`} style={headStyle}>
        <div className={`${prefixCls}-head-wrapper`}>
          {title && <div className={`${prefixCls}-head-title`}>{title}</div>}
          {extra && <div className={`${prefixCls}-extra`}>{extra}</div>}
        </div>
        {tabs}
      </div>
    );
  }
  const coverDom = cover ? <div className={`${prefixCls}-cover`}>{cover}</div> : null;
  const body = (
    <div className={`${prefixCls}-body`} style={bodyStyle}>
      {loading ? loadingBlock : children}
    </div>
  );
  const actionDom =
    actions && actions.length ? (
      <ul className={`${prefixCls}-actions`}>{getAction(actions)}</ul>
    ) : null;
  const divProps = omit(others, ['onTabChange']);
  const mergedSize = customizeSize || size;
  const classString = classNames(
    prefixCls,
    {
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-bordered`]: bordered,
      [`${prefixCls}-hoverable`]: hoverable,
      [`${prefixCls}-contain-grid`]: isContainGrid(),
      [`${prefixCls}-contain-tabs`]: tabList && tabList.length,
      [`${prefixCls}-${mergedSize}`]: mergedSize,
      [`${prefixCls}-type-${type}`]: !!type,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  );

  return (
    <div {...divProps} className={classString}>
      {head}
      {coverDom}
      {body}
      {actionDom}
    </div>
  );
};

Card.Grid = Grid;
Card.Meta = Meta;

export default Card;
