import * as React from 'react';
import type { BaseSelectRef } from '@rc-component/select';
import type { Placement } from '@rc-component/select/lib/BaseSelect';
import type { TreeSelectProps as RcTreeSelectProps } from '@rc-component/tree-select';
import RcTreeSelect, {
  SHOW_ALL,
  SHOW_CHILD,
  SHOW_PARENT,
  TreeNode,
} from '@rc-component/tree-select';
import type { DataNode } from '@rc-component/tree-select/lib/interface';
import { omit } from '@rc-component/util';
import cls from 'clsx';

import useMergeSemantic from '../_util/hooks/useMergeSemantic';
import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks/useMergeSemantic';
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

export interface LabeledValue {
  key?: string;
  value: RawValue;
  label: React.ReactNode;
}

export type SelectValue = RawValue | RawValue[] | LabeledValue | LabeledValue[];

type SemanticName = 'root' | 'prefix' | 'input' | 'suffix';
type PopupSemantic = 'item' | 'itemTitle' | 'root';

export type TreeSelectClassNamesType = SemanticClassNamesType<TreeSelectProps, SemanticName> & {
  popup?: Partial<Record<PopupSemantic, string>>;
};
export type TreeSelectStylesType = SemanticStylesType<TreeSelectProps, SemanticName> & {
  popup?: Partial<Record<PopupSemantic, React.CSSProperties>>;
};

interface BaseTreeSelectProps<ValueType = any, OptionType extends DataNode = DataNode>
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
      | 'classNames'
      | 'styles'
    > {
  size?: SizeType;
  disabled?: boolean;
  status?: InputStatus;
  variant?: Variant;
}

export interface TreeSelectProps<ValueType = any, OptionType extends DataNode = DataNode>
  extends BaseTreeSelectProps<ValueType, OptionType> {
  styles?: TreeSelectStylesType;
  classNames?: TreeSelectClassNamesType;
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
    dropdownStyle: _dropdownStyle,
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
    getPrefixCls,
    getPopupContainer: getContextPopupContainer,
    direction,
    styles: contextStyles,
    classNames: contextClassNames,
    switcherIcon,
  } = useComponentConfig('treeSelect');
  const {
    renderEmpty,
    virtual,
    popupMatchSelectWidth: contextPopupMatchSelectWidth,
    popupOverflow,
  } = React.useContext(ConfigContext);

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
  const [hashId, cssVarCls] = useSelectStyle(prefixCls, rootCls);
  useStyle(treeSelectPrefixCls, treePrefixCls, treeSelectRootCls);

  const [variant, enableVariantCls] = useVariant('treeSelect', customVariant, bordered);

  // ===================== Size =====================
  const mergedSize = useSize((ctx) => customizeSize ?? compactSize ?? ctx);

  // ===================== Disabled =====================
  const disabled = React.useContext(DisabledContext);
  const mergedDisabled = customDisabled ?? disabled;

  // ===================== Form =====================
  const {
    status: contextStatus,
    hasFeedback,
    isFormItemInput,
    feedbackIcon,
  } = React.useContext(FormItemInputContext);

  const mergedStatus = getMergedStatus(contextStatus, customStatus);

  // =========== Merged Props for Semantic ===========
  const mergedProps: TreeSelectProps<ValueType, OptionType> = {
    ...props,
    size: mergedSize,
    disabled: mergedDisabled,
    status: mergedStatus,
    variant,
  };

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    TreeSelectClassNamesType,
    TreeSelectStylesType,
    TreeSelectProps<ValueType, OptionType>
  >(
    [contextClassNames, classNames],
    [contextStyles, styles],
    {
      popup: {
        _default: 'root',
      },
    },
    {
      props: mergedProps,
    },
  );

  const mergedPopupClassName = cls(
    popupClassName || dropdownClassName,
    `${treeSelectPrefixCls}-dropdown`,
    {
      [`${treeSelectPrefixCls}-dropdown-rtl`]: direction === 'rtl',
    },
    rootClassName,
    mergedClassNames.root,
    mergedClassNames.popup?.root,
    cssVarCls,
    rootCls,
    treeSelectRootCls,
    hashId,
  );

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
    mergedClassNames?.root,
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
  const [zIndex] = useZIndex('SelectLike', mergedStyles.popup?.root?.zIndex as number);

  return (
    <RcTreeSelect
      classNames={mergedClassNames}
      styles={mergedStyles}
      virtual={virtual}
      disabled={mergedDisabled}
      {...selectProps}
      popupMatchSelectWidth={mergedPopupMatchSelectWidth}
      builtinPlacements={mergedBuiltinPlacements(builtinPlacements, popupOverflow)}
      ref={ref}
      prefixCls={prefixCls}
      className={mergedClassName}
      style={{ ...mergedStyles?.root, ...style }}
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
      popupClassName={mergedPopupClassName}
      popupStyle={{ ...mergedStyles.root, ...mergedStyles.popup?.root, zIndex }}
      popupRender={mergedPopupRender}
      onPopupVisibleChange={mergedOnOpenChange}
      choiceTransitionName={getTransitionName(rootPrefixCls, '', choiceTransitionName)}
      transitionName={getTransitionName(rootPrefixCls, 'slide-up', transitionName)}
      treeExpandAction={treeExpandAction}
      tagRender={isMultiple ? tagRender : undefined}
      maxCount={mergedMaxCount}
      showCheckedStrategy={showCheckedStrategy}
      treeCheckStrictly={treeCheckStrictly}
    />
  );
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
const PurePanel = genPurePanel(TreeSelect, 'popupAlign', (props: any) => omit(props, ['visible']));

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
