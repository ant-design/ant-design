import * as React from 'react';
import * as ReactDOM from 'react-dom';
import RcTabs, { TabPane, TabsProps as RcTabsProps } from 'rc-tabs';
import classNames from 'classnames';
import omit from 'omit.js';
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';

import { ConfigConsumer, ConfigConsumerProps, ConfigContext } from '../config-provider';
import { cloneElement, isValidElement } from '../_util/reactNode';

export type TabsType = 'line' | 'card' | 'editable-card';
export type TabsPosition = 'top' | 'right' | 'bottom' | 'left';

export interface TabsProps extends RcTabsProps {
  type?: TabsType;
}

function Tabs({ type, ...props }: TabsProps) {
  const { prefixCls: customizePrefixCls } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('tabs', customizePrefixCls);
  return <RcTabs {...props} moreIcon={<EllipsisOutlined />} prefixCls={prefixCls} />;
}

Tabs.TabPane = TabPane;

export default Tabs;
