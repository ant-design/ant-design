import * as React from 'react';
import RcTabs, { TabPane, TabsProps as RcTabsProps, TabPaneProps } from 'rc-tabs';
import { EditableConfig } from 'rc-tabs/lib/interface';
import classNames from 'classnames';
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';

import devWarning from '../_util/devWarning';
import { ConfigContext } from '../config-provider';
import { SizeType } from '../config-provider/SizeContext';

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
}

function Tabs({ type, className, size, onEdit, hideAdd, centered, addIcon, ...props }: TabsProps) {
  const { prefixCls: customizePrefixCls } = props;
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
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

  devWarning(
    !('onPrevClick' in props) && !('onNextClick' in props),
    'Tabs',
    '`onPrevClick` and `onNextClick` has been removed. Please use `onTabScroll` instead.',
  );

  return (
    <RcTabs
      direction={direction}
      moreTransitionName={`${rootPrefixCls}-slide-up`}
      {...props}
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
      moreIcon={<EllipsisOutlined />}
      prefixCls={prefixCls}
    />
  );
}

Tabs.TabPane = TabPane;

export default Tabs;
