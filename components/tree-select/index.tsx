import * as React from 'react';
import RcTreeSelect, {
  TreeNode,
  SHOW_ALL,
  SHOW_PARENT,
  SHOW_CHILD,
  TreeSelectProps as RcTreeSelectProps,
} from 'rc-tree-select';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
import type { BaseOptionType, DefaultOptionType } from 'rc-tree-select/lib/TreeSelect';
import type { BaseSelectRef } from 'rc-select';
import { ConfigContext } from '../config-provider';
import devWarning from '../_util/devWarning';
import { AntTreeNodeProps, TreeProps } from '../tree';
import getIcons from '../select/utils/iconUtil';
import renderSwitcherIcon from '../tree/utils/iconUtil';
import SizeContext, { SizeType } from '../config-provider/SizeContext';
import { getTransitionName } from '../_util/motion';

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
  > {
  suffixIcon?: React.ReactNode;
  size?: SizeType;
  bordered?: boolean;
  treeLine?: TreeProps['showLine'];
}

const InternalTreeSelect = <OptionType extends BaseOptionType | DefaultOptionType = BaseOptionType>(
  {
    prefixCls: customizePrefixCls,
    size: customizeSize,
    bordered = true,
    className,
    treeCheckable,
    multiple,
    listHeight = 256,
    listItemHeight = 26,
    notFoundContent,
    switcherIcon,
    treeLine,
    getPopupContainer,
    dropdownClassName,
    treeIcon = false,
    transitionName,
    choiceTransitionName = '',
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

  devWarning(
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

  // ===================== Icons =====================
  const { suffixIcon, removeIcon, clearIcon } = getIcons({
    ...props,
    multiple: isMultiple,
    prefixCls,
  });

  // ===================== Empty =====================
  let mergedNotFound: React.ReactNode;
  if (notFoundContent !== undefined) {
    mergedNotFound = notFoundContent;
  } else {
    mergedNotFound = renderEmpty('Select');
  }

  // ==================== Render =====================
  const selectProps = omit(props as typeof props & { itemIcon: any; switcherIcon: any }, [
    'suffixIcon',
    'itemIcon',
    'removeIcon',
    'clearIcon',
    'switcherIcon',
  ]);

  const mergedSize = customizeSize || size;
  const mergedClassName = classNames(
    !customizePrefixCls && treeSelectPrefixCls,
    {
      [`${prefixCls}-lg`]: mergedSize === 'large',
      [`${prefixCls}-sm`]: mergedSize === 'small',
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-borderless`]: !bordered,
    },
    className,
  );
  const rootPrefixCls = getPrefixCls();

  return (
    <RcTreeSelect
      virtual={virtual}
      dropdownMatchSelectWidth={dropdownMatchSelectWidth}
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
      transitionName={getTransitionName(rootPrefixCls, 'slide-up', transitionName)}
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
