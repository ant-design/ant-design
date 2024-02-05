import * as React from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import classNames from 'classnames';
import type { TabsProps as RcTabsProps } from 'rc-tabs';
import RcTabs from 'rc-tabs';
import type { GetIndicatorSize } from 'rc-tabs/lib/hooks/useIndicator';
import type { EditableConfig } from 'rc-tabs/lib/interface';

import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import useSize from '../config-provider/hooks/useSize';
import type { SizeType } from '../config-provider/SizeContext';
import useAnimateConfig from './hooks/useAnimateConfig';
import useLegacyItems from './hooks/useLegacyItems';
import useStyle from './style';
import TabPane from './TabPane';
import type { TabPaneProps } from './TabPane';

export type TabsType = 'line' | 'card' | 'editable-card';
export type TabsPosition = 'top' | 'right' | 'bottom' | 'left';

export type { TabPaneProps };

export interface TabsProps extends Omit<RcTabsProps, 'editable'> {
  rootClassName?: string;
  type?: TabsType;
  size?: SizeType;
  hideAdd?: boolean;
  centered?: boolean;
  addIcon?: React.ReactNode;
  removeIcon?: React.ReactNode;
  onEdit?: (e: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') => void;
  children?: React.ReactNode;
  /** @deprecated Please use `indicator={{ size: ... }}` instead */
  indicatorSize?: GetIndicatorSize;
}

const Tabs: React.FC<TabsProps> & { TabPane: typeof TabPane } = (props) => {
  const {
    type,
    className,
    rootClassName,
    size: customSize,
    onEdit,
    hideAdd,
    centered,
    addIcon,
    removeIcon,
    moreIcon,
    popupClassName,
    children,
    items,
    animated,
    style,
    indicatorSize,
    indicator,
    ...otherProps
  } = props;
  const { prefixCls: customizePrefixCls } = otherProps;
  const { direction, tabs, getPrefixCls, getPopupContainer } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('tabs', customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  let editable: EditableConfig | undefined;
  if (type === 'editable-card') {
    editable = {
      onEdit: (editType, { key, event }) => {
        onEdit?.(editType === 'add' ? event : key!, editType);
      },
      removeIcon: removeIcon ?? tabs?.removeIcon ?? <CloseOutlined />,
      addIcon: (addIcon ?? tabs?.addIcon) || <PlusOutlined />,
      showAdd: hideAdd !== true,
    };
  }
  const rootPrefixCls = getPrefixCls();

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Tabs');

    warning(
      !('onPrevClick' in props) && !('onNextClick' in props),
      'breaking',
      '`onPrevClick` and `onNextClick` has been removed. Please use `onTabScroll` instead.',
    );

    warning(
      !(indicatorSize || tabs?.indicatorSize),
      'deprecated',
      '`indicatorSize` has been deprecated. Please use `indicator={{ size: ... }}` instead.',
    );
  }

  const size = useSize(customSize);

  const mergedItems = useLegacyItems(items, children);

  const mergedAnimated = useAnimateConfig(prefixCls, animated);

  const mergedStyle: React.CSSProperties = { ...tabs?.style, ...style };

  const mergedIndicator: TabsProps['indicator'] = {
    align: indicator?.align ?? tabs?.indicator?.align,
    size: indicator?.size ?? indicatorSize ?? tabs?.indicator?.size ?? tabs?.indicatorSize,
  };

  return wrapCSSVar(
    <RcTabs
      direction={direction}
      getPopupContainer={getPopupContainer}
      moreTransitionName={`${rootPrefixCls}-slide-up`}
      {...otherProps}
      items={mergedItems}
      className={classNames(
        {
          [`${prefixCls}-${size}`]: size,
          [`${prefixCls}-card`]: ['card', 'editable-card'].includes(type!),
          [`${prefixCls}-editable-card`]: type === 'editable-card',
          [`${prefixCls}-centered`]: centered,
        },
        tabs?.className,
        className,
        rootClassName,
        hashId,
        cssVarCls,
        rootCls,
      )}
      popupClassName={classNames(popupClassName, hashId, cssVarCls, rootCls)}
      style={mergedStyle}
      editable={editable}
      moreIcon={moreIcon ?? tabs?.moreIcon ?? <EllipsisOutlined />}
      prefixCls={prefixCls}
      animated={mergedAnimated}
      indicator={mergedIndicator}
    />,
  );
};

Tabs.TabPane = TabPane;

if (process.env.NODE_ENV !== 'production') {
  Tabs.displayName = 'Tabs';
}

export default Tabs;
