import * as React from 'react';
import cls from 'classnames';
import type { BaseSelectRef } from 'rc-select';
import type { Placement } from 'rc-select/lib/BaseSelect';
import type { TreeSelectProps as RcTreeSelectProps } from 'rc-tree-select';
import RcTreeSelect, { SHOW_ALL, SHOW_CHILD, SHOW_PARENT, TreeNode } from 'rc-tree-select';
import type { DataNode } from 'rc-tree-select/lib/interface';
import omit from 'rc-util/lib/omit';

import { useZIndex } from '../_util/hooks/useZIndex';
import type { SelectCommonPlacement } from '../_util/motion';
import { getTransitionName } from '../_util/motion';
import genPurePanel from '../_util/PurePanel';
import type { InputStatus } from '../_util/statusUtils';
import { getMergedStatus, getStatusClassNames } from '../_util/statusUtils';
import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
import type { Variant } from '../config-provider';
import { useComponentConfig } from '../config-provider/context';
import DefaultRenderEmpty from '../config-provider/defaultRenderEmpty';
import DisabledContext from '../config-provider/DisabledContext';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import useSize from '../config-provider/hooks/useSize';
import type { SizeType } from '../config-provider/SizeContext';
import { FormItemInputContext } from '../form/context';
import useVariant from '../form/hooks/useVariants';
import mergedBuiltinPlacements from '../select/mergedBuiltinPlacements';
import useSelectStyle from '../select/style';
import useIcons from '../select/useIcons';
import usePopupRender from '../select/usePopupRender';
import useShowArrow from '../select/useShowArrow';
import { useCompactItemContext } from '../space/Compact';
import { useToken } from '../theme/internal';
import type { AntTreeNodeProps, TreeProps } from '../tree';
import type { SwitcherIcon } from '../tree/Tree';
import SwitcherIconCom from '../tree/utils/iconUtil';
import useStyle from './style';

type RawValue = string | number;

type SemanticName = 'root';
type PopupSemantic = 'root';

export interface LabeledValue {
  key?: string;
  value: RawValue;
  label: React.ReactNode;
}

export type SelectValue = RawValue | RawValue[] | LabeledValue | LabeledValue[];

export interface TreeSelectProps<ValueType = any, OptionType extends DataNode = DataNode>
  extends React.AriaAttributes,
    Omit<
      RcTreeSelectProps<ValueType, OptionType>,
      | 'showTreeIcon'
      | 'treeMotion'
      | 'mode'
      | 'getInputElement'
      | 'backfill'
      | 'treeLine'
      | 'switcherIcon'
    > {
  suffixIcon?: React.ReactNode;
  size?: SizeType;
  disabled?: boolean;
  placement?: SelectCommonPlacement;
  /** @deprecated Please use `classNames.popup.root` instead */
  popupClassName?: string;
  /** @deprecated Please use `classNames.popup.root` instead */
  dropdownClassName?: string;
  /** @deprecated Please use `popupRender` instead */
  dropdownRender?: (menu: React.ReactElement) => React.ReactElement;
  popupRender?: (menu: React.ReactElement) => React.ReactElement;
  /** @deprecated Please use `styles.popup.root` instead */
  dropdownStyle?: React.CSSProperties;
  /** @deprecated Please use `onOpenChange` instead */
  onDropdownVisibleChange?: (visible: boolean) => void;
  onOpenChange?: (open: boolean) => void;
  /** @deprecated Use `variant` instead. */
  bordered?: boolean;
  treeLine?: TreeProps['showLine'];
  status?: InputStatus;
  switcherIcon?: SwitcherIcon | RcTreeSelectProps<ValueType, OptionType>['switcherIcon'];
  rootClassName?: string;
  /** @deprecated Please use `popupMatchSelectWidth` instead */
  dropdownMatchSelectWidth?: boolean | number;
  popupMatchSelectWidth?: boolean | number;
  /**
   * @deprecated `showArrow` is deprecated which will be removed in next major version. It will be a
   *   default behavior, you can hide it by setting `suffixIcon` to null.
   */
  showArrow?: boolean;
  /**
   * @since 5.13.0
   * @default "outlined"
   */
  variant?: Variant;
  classNames?: Partial<Record<SemanticName, string>> & {
    popup?: Partial<Record<PopupSemantic, string>>;
  };
  styles?: Partial<Record<SemanticName, React.CSSProperties>> & {
    popup?: Partial<Record<PopupSemantic, React.CSSProperties>>;
  };
}

const InternalTreeSelect = <ValueType = any, OptionType extends DataNode = DataNode>(
  props: TreeSelectProps<ValueType, OptionType>,
  ref: React.Ref<BaseSelectRef>,
) => {
  const {
    prefixCls: customizePrefixCls,
    size: customizeSize,
    disabled: customDisabled,
    bordered = true,
    style,
    className,
    rootClassName,
    treeCheckable,
    multiple,
    listHeight = 256,
    listItemHeight: customListItemHeight,
    placement,
    notFoundContent,
    switcherIcon: customSwitcherIcon,
    treeLine,
    getPopupContainer,
    popupClassName,
    dropdownClassName,
    treeIcon = false,
    transitionName,
    choiceTransitionName = '',
    status: customStatus,
    treeExpandAction,
    builtinPlacements,
    dropdownMatchSelectWidth,
    popupMatchSelectWidth,
    allowClear,
    variant: customVariant,
    dropdownStyle,
    dropdownRender,
    popupRender,
    onDropdownVisibleChange,
    onOpenChange,
    tagRender,
    maxCount,
    showCheckedStrategy,
    treeCheckStrictly,
    styles,
    classNames,
    ...restProps
  } = props;
  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    renderEmpty,
    direction,
    virtual,
    popupMatchSelectWidth: contextPopupMatchSelectWidth,
    popupOverflow,
  } = React.useContext(ConfigContext);

  const {
    styles: contextStyles,
    classNames: contextClassNames,
    switcherIcon,
  } = useComponentConfig('treeSelect');

  const [, token] = useToken();
  const listItemHeight = customListItemHeight ?? token?.controlHeightSM + token?.paddingXXS;

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('TreeSelect');

    const deprecatedProps = {
      dropdownMatchSelectWidth: 'popupMatchSelectWidth',
      dropdownStyle: 'styles.popup.root',
      dropdownClassName: 'classNames.popup.root',
      popupClassName: 'classNames.popup.root',
      dropdownRender: 'popupRender',
      onDropdownVisibleChange: 'onOpenChange',
      bordered: 'variant',
    };

    Object.entries(deprecatedProps).forEach(([oldProp, newProp]) => {
      warning.deprecated(!(oldProp in props), oldProp, newProp);
    });

    warning(
      multiple !== false || !treeCheckable,
      'usage',
      '`multiple` will always be `true` when `treeCheckable` is true',
    );

    warning(
      !('showArrow' in props),
      'deprecated',
      '`showArrow` is deprecated which will be removed in next major version. It will be a default behavior, you can hide it by setting `suffixIcon` to null.',
    );
  }

  const rootPrefixCls = getPrefixCls();
  const prefixCls = getPrefixCls('select', customizePrefixCls);
  const treePrefixCls = getPrefixCls('select-tree', customizePrefixCls);
  const treeSelectPrefixCls = getPrefixCls('tree-select', customizePrefixCls);
  const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);

  const rootCls = useCSSVarCls(prefixCls);
  const treeSelectRootCls = useCSSVarCls(treeSelectPrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useSelectStyle(prefixCls, rootCls);
  const [treeSelectWrapCSSVar] = useStyle(treeSelectPrefixCls, treePrefixCls, treeSelectRootCls);

  const [variant, enableVariantCls] = useVariant('treeSelect', customVariant, bordered);

  const mergedPopupClassName = cls(
    classNames?.popup?.root ||
      contextClassNames?.popup?.root ||
      popupClassName ||
      dropdownClassName,
    `${treeSelectPrefixCls}-dropdown`,
    {
      [`${treeSelectPrefixCls}-dropdown-rtl`]: direction === 'rtl',
    },
    rootClassName,
    contextClassNames.root,
    classNames?.root,
    cssVarCls,
    rootCls,
    treeSelectRootCls,
    hashId,
  );

  const mergedPopupStyle = styles?.popup?.root || contextStyles?.popup?.root || dropdownStyle;

  const mergedPopupRender = usePopupRender(popupRender || dropdownRender);

  const mergedOnOpenChange = onOpenChange || onDropdownVisibleChange;

  const isMultiple = !!(treeCheckable || multiple);

  const mergedMaxCount = React.useMemo(() => {
    if (
      maxCount &&
      ((showCheckedStrategy === 'SHOW_ALL' && !treeCheckStrictly) ||
        showCheckedStrategy === 'SHOW_PARENT')
    ) {
      return undefined;
    }
    return maxCount;
  }, [maxCount, showCheckedStrategy, treeCheckStrictly]);

  const showSuffixIcon = useShowArrow(props.suffixIcon, props.showArrow);

  const mergedPopupMatchSelectWidth =
    popupMatchSelectWidth ?? dropdownMatchSelectWidth ?? contextPopupMatchSelectWidth;

  // ===================== Form =====================
  const {
    status: contextStatus,
    hasFeedback,
    isFormItemInput,
    feedbackIcon,
  } = React.useContext(FormItemInputContext);
  const mergedStatus = getMergedStatus(contextStatus, customStatus);

  // ===================== Icons =====================
  const { suffixIcon, removeIcon, clearIcon } = useIcons({
    ...restProps,
    multiple: isMultiple,
    showSuffixIcon,
    hasFeedback,
    feedbackIcon,
    prefixCls,
    componentName: 'TreeSelect',
  });

  const mergedAllowClear = allowClear === true ? { clearIcon } : allowClear;

  // ===================== Empty =====================
  let mergedNotFound: React.ReactNode;
  if (notFoundContent !== undefined) {
    mergedNotFound = notFoundContent;
  } else {
    mergedNotFound = renderEmpty?.('Select') || <DefaultRenderEmpty componentName="Select" />;
  }

  // ==================== Render =====================
  const selectProps = omit(restProps, [
    'suffixIcon',
    'removeIcon',
    'clearIcon',
    'itemIcon' as any,
    'switcherIcon' as any,
    'style',
  ]);

  // ===================== Placement =====================
  const memoizedPlacement = React.useMemo<Placement>(() => {
    if (placement !== undefined) {
      return placement;
    }
    return direction === 'rtl' ? 'bottomRight' : 'bottomLeft';
  }, [placement, direction]);

  const mergedSize = useSize((ctx) => customizeSize ?? compactSize ?? ctx);

  // ===================== Disabled =====================
  const disabled = React.useContext(DisabledContext);
  const mergedDisabled = customDisabled ?? disabled;

  const mergedClassName = cls(
    !customizePrefixCls && treeSelectPrefixCls,
    {
      [`${prefixCls}-lg`]: mergedSize === 'large',
      [`${prefixCls}-sm`]: mergedSize === 'small',
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-${variant}`]: enableVariantCls,
      [`${prefixCls}-in-form-item`]: isFormItemInput,
    },
    getStatusClassNames(prefixCls, mergedStatus, hasFeedback),
    compactItemClassnames,
    className,
    rootClassName,
    contextClassNames.root,
    classNames?.root,
    cssVarCls,
    rootCls,
    treeSelectRootCls,
    hashId,
  );

  const mergedSwitcherIcon = customSwitcherIcon ?? switcherIcon;

  const renderSwitcherIcon = (nodeProps: AntTreeNodeProps) => (
    <SwitcherIconCom
      prefixCls={treePrefixCls}
      switcherIcon={mergedSwitcherIcon as SwitcherIcon}
      treeNodeProps={nodeProps}
      showLine={treeLine}
    />
  );

  // ============================ zIndex ============================
  const [zIndex] = useZIndex('SelectLike', mergedPopupStyle?.zIndex as number);

  const returnNode = (
    <RcTreeSelect
      virtual={virtual}
      disabled={mergedDisabled}
      {...selectProps}
      dropdownMatchSelectWidth={mergedPopupMatchSelectWidth}
      builtinPlacements={mergedBuiltinPlacements(builtinPlacements, popupOverflow)}
      ref={ref}
      prefixCls={prefixCls}
      className={mergedClassName}
      style={{ ...styles?.root, ...style }}
      listHeight={listHeight}
      listItemHeight={listItemHeight}
      treeCheckable={
        treeCheckable ? <span className={`${prefixCls}-tree-checkbox-inner`} /> : treeCheckable
      }
      treeLine={!!treeLine}
      suffixIcon={suffixIcon}
      multiple={isMultiple}
      placement={memoizedPlacement}
      removeIcon={removeIcon}
      allowClear={mergedAllowClear}
      switcherIcon={renderSwitcherIcon as RcTreeSelectProps['switcherIcon']}
      showTreeIcon={treeIcon as boolean}
      notFoundContent={mergedNotFound}
      getPopupContainer={getPopupContainer || getContextPopupContainer}
      treeMotion={null}
      dropdownClassName={mergedPopupClassName}
      dropdownStyle={{ ...mergedPopupStyle, zIndex }}
      dropdownRender={mergedPopupRender}
      onDropdownVisibleChange={mergedOnOpenChange}
      choiceTransitionName={getTransitionName(rootPrefixCls, '', choiceTransitionName)}
      transitionName={getTransitionName(rootPrefixCls, 'slide-up', transitionName)}
      treeExpandAction={treeExpandAction}
      tagRender={isMultiple ? tagRender : undefined}
      maxCount={mergedMaxCount}
      showCheckedStrategy={showCheckedStrategy}
      treeCheckStrictly={treeCheckStrictly}
    />
  );

  return wrapCSSVar(treeSelectWrapCSSVar(returnNode));
};

const TreeSelectRef = React.forwardRef(InternalTreeSelect) as <
  ValueType = any,
  OptionType extends DataNode = DataNode,
>(
  props: React.PropsWithChildren<TreeSelectProps<ValueType, OptionType>> &
    React.RefAttributes<BaseSelectRef>,
) => React.ReactElement;

type InternalTreeSelectType = typeof TreeSelectRef;

type CompoundedComponent = InternalTreeSelectType & {
  displayName?: string;
  TreeNode: typeof TreeNode;
  SHOW_ALL: typeof SHOW_ALL;
  SHOW_PARENT: typeof SHOW_PARENT;
  SHOW_CHILD: typeof SHOW_CHILD;
  _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
};

const TreeSelect = TreeSelectRef as CompoundedComponent;

// We don't care debug panel
/* istanbul ignore next */
const PurePanel = genPurePanel(TreeSelect, 'dropdownAlign', (props: any) =>
  omit(props, ['visible']),
);

TreeSelect.TreeNode = TreeNode;
TreeSelect.SHOW_ALL = SHOW_ALL;
TreeSelect.SHOW_PARENT = SHOW_PARENT;
TreeSelect.SHOW_CHILD = SHOW_CHILD;
TreeSelect._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

if (process.env.NODE_ENV !== 'production') {
  TreeSelect.displayName = 'TreeSelect';
}

export { TreeNode };

export default TreeSelect;
