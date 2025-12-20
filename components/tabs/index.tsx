import * as React from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import type { TabsProps as RcTabsProps } from '@rc-component/tabs';
import RcTabs from '@rc-component/tabs';
import type { GetIndicatorSize } from '@rc-component/tabs/lib/hooks/useIndicator';
import type { EditableConfig, MoreProps, Tab } from '@rc-component/tabs/lib/interface';
import { clsx } from 'clsx';

import { useMergeSemantic } from '../_util/hooks';
import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks';
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

export type TabPosition = 'top' | 'right' | 'bottom' | 'left';

export type TabPlacement = 'top' | 'end' | 'bottom' | 'start';

export type { TabPaneProps };

export type TabsSemanticName = 'root' | 'item' | 'indicator' | 'content' | 'header';

export type TabsSemanticClassNames = {
  root?: string;
  item?: string;
  indicator?: string;
  content?: string;
  header?: string;
};

export type TabsSemanticStyles = {
  root?: React.CSSProperties;
  item?: React.CSSProperties;
  indicator?: React.CSSProperties;
  content?: React.CSSProperties;
  header?: React.CSSProperties;
};

export type TabsClassNamesType = SemanticClassNamesType<
  TabsProps,
  TabsSemanticClassNames,
  {
    popup?: {
      root?: string;
    };
  }
>;

export type TabsStylesType = SemanticStylesType<
  TabsProps,
  TabsSemanticStyles,
  {
    popup?: {
      root?: React.CSSProperties;
    };
  }
>;

export interface CompatibilityProps {
  /** @deprecated Please use `destroyOnHidden` instead */
  destroyInactiveTabPane?: boolean;
}

export interface TabsRef {
  nativeElement: React.ComponentRef<typeof RcTabs> | null;
}

export interface BaseTabsProps {
  type?: TabsType;
  size?: SizeType;
  hideAdd?: boolean;
  centered?: boolean;
  className?: string;
  rootClassName?: string;
  classNames?: TabsClassNamesType;
  styles?: TabsStylesType;
  /** @deprecated please use `tabPlacement` instead */
  tabPosition?: TabPosition;
  tabPlacement?: TabPlacement;
  onEdit?: (e: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') => void;
  children?: React.ReactNode;
  /** @deprecated Please use `indicator={{ size: ... }}` instead */
  indicatorSize?: GetIndicatorSize;
  items?: (Tab & CompatibilityProps)[];
}

export interface TabsProps
  extends BaseTabsProps,
    CompatibilityProps,
    Omit<RcTabsProps, 'editable' | 'items' | 'classNames' | 'styles' | 'popupClassName'> {
  addIcon?: React.ReactNode;
  moreIcon?: React.ReactNode;
  more?: MoreProps;
  removeIcon?: React.ReactNode;
  styles?: TabsStylesType;
  classNames?: TabsClassNamesType;
  /** @deprecated Please use `classNames.popup` instead */
  popupClassName?: string;
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
    classNames,
    styles,
    destroyInactiveTabPane,
    destroyOnHidden,
    tabPlacement,
    tabPosition,
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
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);

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
    [
      ['popupClassName', 'classNames.popup'],
      ['tabPosition', 'tabPlacement'],
    ].forEach(([deprecatedName, newName]) => {
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

  const mergedIndicator: TabsProps['indicator'] = {
    align: indicator?.align ?? tabs?.indicator?.align,
    size: indicator?.size ?? indicatorSize ?? tabs?.indicator?.size ?? tabs?.indicatorSize,
  };

  const mergedPlacement: TabPosition | undefined = React.useMemo(() => {
    const placement = tabPlacement ?? tabPosition ?? undefined;
    const isRTL = direction === 'rtl';
    switch (placement) {
      case 'start':
        return isRTL ? 'right' : 'left';
      case 'end':
        return isRTL ? 'left' : 'right';
      default:
        return placement;
    }
  }, [tabPlacement, tabPosition, direction]);

  // =========== Merged Props for Semantic ===========
  const mergedProps: TabsProps = {
    ...props,
    size,
    tabPlacement: mergedPlacement as TabPlacement,
    items: mergedItems,
  };

  // ========================= Style ==========================
  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    TabsClassNamesType,
    TabsStylesType,
    TabsProps
  >(
    [contextClassNames, classNames],
    [contextStyles, styles],
    {
      props: mergedProps,
    },
    {
      popup: {
        _default: 'root',
      },
    },
  );

  return (
    <RcTabs
      ref={tabsRef}
      direction={direction}
      getPopupContainer={getPopupContainer}
      {...restProps}
      items={mergedItems}
      className={clsx(
        {
          [`${prefixCls}-${size}`]: size,
          [`${prefixCls}-card`]: ['card', 'editable-card'].includes(type!),
          [`${prefixCls}-editable-card`]: type === 'editable-card',
          [`${prefixCls}-centered`]: centered,
        },
        contextClassName,
        className,
        rootClassName,
        mergedClassNames.root,
        hashId,
        cssVarCls,
        rootCls,
      )}
      classNames={{
        ...mergedClassNames,
        popup: clsx(popupClassName, hashId, cssVarCls, rootCls, mergedClassNames.popup?.root),
      }}
      styles={mergedStyles}
      style={{ ...mergedStyles.root, ...contextStyle, ...style }}
      editable={editable}
      more={{
        icon: tabs?.more?.icon ?? tabs?.moreIcon ?? moreIcon ?? <EllipsisOutlined />,
        transitionName: `${rootPrefixCls}-slide-up`,
        ...more,
      }}
      prefixCls={prefixCls}
      animated={mergedAnimated}
      indicator={mergedIndicator}
      destroyOnHidden={destroyOnHidden ?? destroyInactiveTabPane}
      tabPosition={mergedPlacement}
    />
  );
});

type CompoundedComponent = typeof InternalTabs & { TabPane: typeof TabPane };

const Tabs = InternalTabs as CompoundedComponent;
Tabs.TabPane = TabPane;

if (process.env.NODE_ENV !== 'production') {
  Tabs.displayName = 'Tabs';
}

export default Tabs;
