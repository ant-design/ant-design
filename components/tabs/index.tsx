import * as React from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import classNames from 'classnames';
import type { TabsProps as RcTabsProps } from 'rc-tabs';
import RcTabs from 'rc-tabs';
import type { GetIndicatorSize } from 'rc-tabs/lib/hooks/useIndicator';
import type { EditableConfig, MoreProps, Tab } from 'rc-tabs/lib/interface';

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

export interface CompatibilityProps {
  /** @deprecated Please use `destroyOnHidden` instead */
  destroyInactiveTabPane?: boolean;
  /**
   * @since 5.25.0
   */
  destroyOnHidden?: boolean;
}

export interface TabsRef {
  nativeElement: React.ComponentRef<typeof RcTabs> | null;
}

export interface TabsProps
  extends CompatibilityProps,
    Omit<RcTabsProps, 'editable' | 'destroyInactiveTabPane' | 'items'> {
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
  items?: (Omit<Tab, 'destroyInactiveTabPane'> & CompatibilityProps)[];
}

const InternalTabs = React.forwardRef<TabsRef, TabsProps>((props, ref) => {
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
    destroyInactiveTabPane,
    destroyOnHidden,
    ...otherProps
  } = props;
  const { prefixCls: customizePrefixCls } = otherProps;
  const { direction, tabs, getPrefixCls, getPopupContainer } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('tabs', customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const tabsRef = React.useRef<TabsRef['nativeElement']>(null);

  React.useImperativeHandle(ref, () => ({
    nativeElement: tabsRef.current,
  }));

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

    warning.deprecated(
      !(
        'destroyInactiveTabPane' in props || items?.some((item) => 'destroyInactiveTabPane' in item)
      ),
      'destroyInactiveTabPane',
      'destroyOnHidden',
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
      ref={tabsRef}
      direction={direction}
      getPopupContainer={getPopupContainer}
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
      more={{
        icon: tabs?.more?.icon ?? tabs?.moreIcon ?? moreIcon ?? <EllipsisOutlined />,
        transitionName: `${rootPrefixCls}-slide-up`,
        ...more,
      }}
      prefixCls={prefixCls}
      animated={mergedAnimated}
      indicator={mergedIndicator}
      // TODO: In the future, destroyInactiveTabPane in rc-tabs needs to be upgrade to destroyOnHidden
      destroyInactiveTabPane={destroyOnHidden ?? destroyInactiveTabPane}
    />,
  );
});

type CompoundedComponent = typeof InternalTabs & { TabPane: typeof TabPane };

const Tabs = InternalTabs as CompoundedComponent;
Tabs.TabPane = TabPane;

if (process.env.NODE_ENV !== 'production') {
  Tabs.displayName = 'Tabs';
}

export default Tabs;
