import classNames from 'classnames';
import type { BaseSelectRef } from 'rc-select';
import type { TreeSelectProps as RcTreeSelectProps } from 'rc-tree-select';
import RcTreeSelect, { SHOW_ALL, SHOW_CHILD, SHOW_PARENT, TreeNode } from 'rc-tree-select';
import type { BaseOptionType, DefaultOptionType } from 'rc-tree-select/lib/TreeSelect';
import omit from 'rc-util/lib/omit';
import * as React from 'react';
import { useContext } from 'react';
import { ConfigContext } from '../config-provider';
import defaultRenderEmpty from '../config-provider/defaultRenderEmpty';
import DisabledContext from '../config-provider/DisabledContext';
import type { SizeType } from '../config-provider/SizeContext';
import SizeContext from '../config-provider/SizeContext';
import { FormItemInputContext } from '../form/context';
import getIcons from '../select/utils/iconUtil';
import type { AntTreeNodeProps, TreeProps } from '../tree';
import type { SwitcherIcon } from '../tree/Tree';
import renderSwitcherIcon from '../tree/utils/iconUtil';
import type { SelectCommonPlacement } from '../_util/motion';
import { getTransitionDirection, getTransitionName } from '../_util/motion';
import type { InputStatus } from '../_util/statusUtils';
import { getMergedStatus, getStatusClassNames } from '../_util/statusUtils';
import warning from '../_util/warning';

type RawValue = string | number;

export interface LabeledValue {
  key?: string;
  value: RawValue;
  label: React.ReactNode;
}

export type SelectValue = RawValue | RawValue[] | LabeledValue | LabeledValue[];

export interface TreeSelectProps<
  ValueType = any,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
> extends Omit<
    RcTreeSelectProps<ValueType, OptionType>,
    | 'showTreeIcon'
    | 'treeMotion'
    | 'inputIcon'
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
  bordered?: boolean;
  treeLine?: TreeProps['showLine'];
  status?: InputStatus;
  switcherIcon?: SwitcherIcon | RcTreeSelectProps<ValueType, OptionType>['switcherIcon'];
}

const InternalTreeSelect = <OptionType extends BaseOptionType | DefaultOptionType = BaseOptionType>(
  {
    prefixCls: customizePrefixCls,
    size: customizeSize,
    disabled: customDisabled,
    bordered = true,
    className,
    treeCheckable,
    multiple,
    listHeight = 256,
    listItemHeight = 26,
    placement,
    notFoundContent,
    switcherIcon,
    treeLine,
    getPopupContainer,
    dropdownClassName,
    treeIcon = false,
    transitionName,
    choiceTransitionName = '',
    status: customStatus,
    showArrow,
    treeExpandAction,
    ...props
  }: TreeSelectProps<OptionType>,
  ref: React.Ref<BaseSelectRef>,
) => {
  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    renderEmpty,
    direction,
    virtual,
    dropdownMatchSelectWidth,
  } = React.useContext(ConfigContext);
  const size = React.useContext(SizeContext);

  warning(
    multiple !== false || !treeCheckable,
    'TreeSelect',
    '`multiple` will always be `true` when `treeCheckable` is true',
  );

  const prefixCls = getPrefixCls('select', customizePrefixCls);
  const treePrefixCls = getPrefixCls('select-tree', customizePrefixCls);
  const treeSelectPrefixCls = getPrefixCls('tree-select', customizePrefixCls);

  const mergedDropdownClassName = classNames(dropdownClassName, `${treeSelectPrefixCls}-dropdown`, {
    [`${treeSelectPrefixCls}-dropdown-rtl`]: direction === 'rtl',
  });

  const isMultiple = !!(treeCheckable || multiple);
  const mergedShowArrow = showArrow !== undefined ? showArrow : props.loading || !isMultiple;

  // ===================== Form =====================
  const {
    status: contextStatus,
    hasFeedback,
    isFormItemInput,
    feedbackIcon,
  } = useContext(FormItemInputContext);
  const mergedStatus = getMergedStatus(contextStatus, customStatus);

  // ===================== Icons =====================
  const { suffixIcon, removeIcon, clearIcon } = getIcons({
    ...props,
    multiple: isMultiple,
    showArrow: mergedShowArrow,
    hasFeedback,
    feedbackIcon,
    prefixCls,
  });

  // ===================== Empty =====================
  let mergedNotFound: React.ReactNode;
  if (notFoundContent !== undefined) {
    mergedNotFound = notFoundContent;
  } else {
    mergedNotFound = (renderEmpty || defaultRenderEmpty)('Select');
  }

  // ==================== Render =====================
  const selectProps = omit(props as typeof props & { itemIcon: any; switcherIcon: any }, [
    'suffixIcon',
    'itemIcon',
    'removeIcon',
    'clearIcon',
    'switcherIcon',
  ]);

  // ===================== Placement =====================
  const getPlacement = () => {
    if (placement !== undefined) {
      return placement;
    }
    return direction === 'rtl'
      ? ('bottomRight' as SelectCommonPlacement)
      : ('bottomLeft' as SelectCommonPlacement);
  };

  const mergedSize = customizeSize || size;
  // ===================== Disabled =====================
  const disabled = React.useContext(DisabledContext);
  const mergedDisabled = customDisabled || disabled;

  const mergedClassName = classNames(
    !customizePrefixCls && treeSelectPrefixCls,
    {
      [`${prefixCls}-lg`]: mergedSize === 'large',
      [`${prefixCls}-sm`]: mergedSize === 'small',
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-borderless`]: !bordered,
      [`${prefixCls}-in-form-item`]: isFormItemInput,
    },
    getStatusClassNames(prefixCls, mergedStatus, hasFeedback),
    className,
  );
  const rootPrefixCls = getPrefixCls();

  return (
    <RcTreeSelect
      virtual={virtual}
      dropdownMatchSelectWidth={dropdownMatchSelectWidth}
      disabled={mergedDisabled}
      {...selectProps}
      ref={ref as any}
      prefixCls={prefixCls}
      className={mergedClassName}
      listHeight={listHeight}
      listItemHeight={listItemHeight}
      treeCheckable={
        treeCheckable ? <span className={`${prefixCls}-tree-checkbox-inner`} /> : treeCheckable
      }
      treeLine={!!treeLine}
      inputIcon={suffixIcon}
      multiple={multiple}
      placement={getPlacement()}
      removeIcon={removeIcon}
      clearIcon={clearIcon}
      switcherIcon={(nodeProps: AntTreeNodeProps) =>
        renderSwitcherIcon(treePrefixCls, switcherIcon, treeLine, nodeProps)
      }
      showTreeIcon={treeIcon as any}
      notFoundContent={mergedNotFound}
      getPopupContainer={getPopupContainer || getContextPopupContainer}
      treeMotion={null}
      dropdownClassName={mergedDropdownClassName}
      choiceTransitionName={getTransitionName(rootPrefixCls, '', choiceTransitionName)}
      transitionName={getTransitionName(
        rootPrefixCls,
        getTransitionDirection(placement),
        transitionName,
      )}
      showArrow={hasFeedback || showArrow}
      treeExpandAction={treeExpandAction}
    />
  );
};

const TreeSelectRef = React.forwardRef(InternalTreeSelect) as <
  ValueType = any,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
>(
  props: React.PropsWithChildren<TreeSelectProps<ValueType, OptionType>> & {
    ref?: React.Ref<BaseSelectRef>;
  },
) => React.ReactElement;

type InternalTreeSelectType = typeof TreeSelectRef;

interface TreeSelectInterface extends InternalTreeSelectType {
  TreeNode: typeof TreeNode;
  SHOW_ALL: typeof SHOW_ALL;
  SHOW_PARENT: typeof SHOW_PARENT;
  SHOW_CHILD: typeof SHOW_CHILD;
}

const TreeSelect = TreeSelectRef as TreeSelectInterface;

TreeSelect.TreeNode = TreeNode;
TreeSelect.SHOW_ALL = SHOW_ALL;
TreeSelect.SHOW_PARENT = SHOW_PARENT;
TreeSelect.SHOW_CHILD = SHOW_CHILD;

export { TreeNode };

export default TreeSelect;
