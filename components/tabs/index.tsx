import CloseOutlined from '@ant-design/icons/CloseOutlined';
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import classNames from 'classnames';
import type { TabsProps as RcTabsProps } from 'rc-tabs';
import RcTabs from 'rc-tabs';
import type { EditableConfig } from 'rc-tabs/lib/interface';
import * as React from 'react';

import { ConfigContext } from '../config-provider';
import type { SizeType } from '../config-provider/SizeContext';
import SizeContext from '../config-provider/SizeContext';
import warning from '../_util/warning';
import useAnimateConfig from './hooks/useAnimateConfig';
import useLegacyItems from './hooks/useLegacyItems';
import TabPane, { TabPaneProps } from './TabPane';

export type TabsType = 'line' | 'card' | 'editable-card';
export type TabsPosition = 'top' | 'right' | 'bottom' | 'left';

export { TabPaneProps };

export interface TabsProps extends Omit<RcTabsProps, 'editable'> {
  type?: TabsType;
  size?: SizeType;
  hideAdd?: boolean;
  centered?: boolean;
  addIcon?: React.ReactNode;
  onEdit?: (e: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') => void;
  children?: React.ReactNode;
}

function Tabs({
  type,
  className,
  size: propSize,
  onEdit,
  hideAdd,
  centered,
  addIcon,
  children,
  items,
  animated,
  ...props
}: TabsProps) {
  const { prefixCls: customizePrefixCls, moreIcon = <EllipsisOutlined /> } = props;
  const { getPrefixCls, direction, getPopupContainer } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('tabs', customizePrefixCls);

  let editable: EditableConfig | undefined;
  if (type === 'editable-card') {
    editable = {
      onEdit: (editType, { key, event }) => {
        onEdit?.(editType === 'add' ? event : key!, editType);
      },
      removeIcon: <CloseOutlined />,
      addIcon: addIcon || <PlusOutlined />,
      showAdd: hideAdd !== true,
    };
  }
  const rootPrefixCls = getPrefixCls();

  warning(
    !('onPrevClick' in props) && !('onNextClick' in props),
    'Tabs',
    '`onPrevClick` and `onNextClick` has been removed. Please use `onTabScroll` instead.',
  );

  const mergedItems = useLegacyItems(items, children);

  const mergedAnimated = useAnimateConfig(prefixCls, animated);

  return (
    <SizeContext.Consumer>
      {contextSize => {
        const size = propSize !== undefined ? propSize : contextSize;
        return (
          <RcTabs
            direction={direction}
            getPopupContainer={getPopupContainer}
            moreTransitionName={`${rootPrefixCls}-slide-up`}
            {...props}
            items={mergedItems}
            className={classNames(
              {
                [`${prefixCls}-${size}`]: size,
                [`${prefixCls}-card`]: ['card', 'editable-card'].includes(type as string),
                [`${prefixCls}-editable-card`]: type === 'editable-card',
                [`${prefixCls}-centered`]: centered,
              },
              className,
            )}
            editable={editable}
            moreIcon={moreIcon}
            prefixCls={prefixCls}
            animated={mergedAnimated}
          />
        );
      }}
    </SizeContext.Consumer>
  );
}

Tabs.TabPane = TabPane;

export default Tabs;
