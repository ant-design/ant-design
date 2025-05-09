import * as React from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import type { TabsProps as RcTabsProps } from '@rc-component/tabs';
import RcTabs from '@rc-component/tabs';
import type { GetIndicatorSize } from '@rc-component/tabs/lib/hooks/useIndicator';
import type { EditableConfig, MoreProps, Tab } from '@rc-component/tabs/lib/interface';
import cls from 'classnames';

import useMergeSemantic from '../_util/hooks/useMergeSemantic';
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

type SemanticName = 'root' | 'item' | 'indicator' | 'content' | 'header';

type PopupSemantic = 'root';

interface CompatibilityProps {
  /** @deprecated Please use `destroyOnHidden` instead */
  destroyInactiveTabPane?: boolean;
}

export interface TabsProps
  extends CompatibilityProps,
    Omit<RcTabsProps, 'editable' | 'items' | 'classNames' | 'styles' | 'popupClassName'> {
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
  styles?: Partial<Record<SemanticName, React.CSSProperties>> & {
    popup?: Partial<Record<PopupSemantic, React.CSSProperties>>;
  };
  classNames?: Partial<Record<SemanticName, string>> & {
    popup?: Partial<Record<PopupSemantic, string>>;
  };
  /** @deprecated Please use `classNames.popup` instead */
  popupClassName?: string;
  items?: (Tab & CompatibilityProps)[];
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
    classNames,
    styles,
    destroyInactiveTabPane,
    destroyOnHidden,
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

  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [contextClassNames, classNames],
    [contextStyles, styles],
    {
      popup: {
        _default: 'root',
      },
    },
  );
  const { tabs } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('tabs', customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);

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
    [['popupClassName', 'classNames.popup']].forEach(([deprecatedName, newName]) => {
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

  return (
    <RcTabs
      direction={direction}
      getPopupContainer={getPopupContainer}
      {...restProps}
      items={mergedItems}
      className={cls(
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
        popup: cls(popupClassName, hashId, cssVarCls, rootCls, mergedClassNames.popup?.root),
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
    />
  );
};

Tabs.TabPane = TabPane;

if (process.env.NODE_ENV !== 'production') {
  Tabs.displayName = 'Tabs';
}

export default Tabs;
