import * as React from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import type { TabsProps as RcTabsProps } from '@rc-component/tabs';
import RcTabs from '@rc-component/tabs';
import type { GetIndicatorSize } from '@rc-component/tabs/lib/hooks/useIndicator';
import type { EditableConfig, MoreProps } from '@rc-component/tabs/lib/interface';
import classNames from 'classnames';

import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
import { useComponentConfig } from '../config-provider/context';
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

type SemanticName = 'root' | 'popup' | 'item' | 'indicator';
export interface TabsProps
  extends Omit<RcTabsProps, 'editable' | 'classNames' | 'styles' | 'popupClassName'> {
  rootClassName?: string;
  type?: TabsType;
  size?: SizeType;
  hideAdd?: boolean;
  centered?: boolean;
  addIcon?: React.ReactNode;
  moreIcon?: React.ReactNode;
  more?: MoreProps;
  removeIcon?: React.ReactNode;
  onEdit?: (e: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') => void;
  children?: React.ReactNode;
  /** @deprecated Please use `indicator={{ size: ... }}` instead */
  indicatorSize?: GetIndicatorSize;
  classNames?: Partial<Record<SemanticName, string>>;
  styles?: Partial<Record<SemanticName, React.CSSProperties>>;
  /** @deprecated Please use `classNames={{ popup: '' }}` instead */
  popupClassName?: string;
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
    more,
    popupClassName,
    children,
    items,
    animated,
    style,
    indicatorSize,
    indicator,
    classNames: tabsClassNames,
    styles,
    ...restProps
  } = props;
  const { prefixCls: customizePrefixCls } = restProps;
  const {
    getPrefixCls,
    direction,
    getPopupContainer,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('tabs');
  const { tabs } = React.useContext(ConfigContext);
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
    [['popupClassName', 'classNames={{ popup: "" }}']].forEach(([deprecatedName, newName]) => {
      warning.deprecated(!(deprecatedName in props), deprecatedName, newName);
    });
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

  const mergedIndicator: TabsProps['indicator'] = {
    align: indicator?.align ?? tabs?.indicator?.align,
    size: indicator?.size ?? indicatorSize ?? tabs?.indicator?.size ?? tabs?.indicatorSize,
  };

  return wrapCSSVar(
    <RcTabs
      direction={direction}
      getPopupContainer={getPopupContainer}
      {...restProps}
      items={mergedItems}
      className={classNames(
        {
          [`${prefixCls}-${size}`]: size,
          [`${prefixCls}-card`]: ['card', 'editable-card'].includes(type!),
          [`${prefixCls}-editable-card`]: type === 'editable-card',
          [`${prefixCls}-centered`]: centered,
        },
        contextClassName,
        className,
        rootClassName,
        contextClassNames.root,
        tabsClassNames?.root,
        hashId,
        cssVarCls,
        rootCls,
      )}
      classNames={{
        popup: classNames(
          popupClassName,
          hashId,
          cssVarCls,
          rootCls,
          contextClassNames.popup,
          tabsClassNames?.popup,
        ),
        item: classNames(contextClassNames.item, tabsClassNames?.item),
        indicator: classNames(contextClassNames.indicator, tabsClassNames?.indicator),
      }}
      styles={{
        popup: { ...contextStyles.popup, ...styles?.popup },
        item: { ...contextStyles.item, ...styles?.item },
        indicator: { ...contextStyles.indicator, ...styles?.indicator },
      }}
      style={{ ...contextStyles.root, ...styles?.root, ...contextStyle, ...style }}
      editable={editable}
      more={{
        icon: tabs?.more?.icon ?? tabs?.moreIcon ?? moreIcon ?? <EllipsisOutlined />,
        transitionName: `${rootPrefixCls}-slide-up`,
        ...more,
      }}
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
