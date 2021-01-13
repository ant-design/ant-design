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
import { DefaultValueType } from 'rc-tree-select/lib/interface';
import { ConfigContext } from '../config-provider';
import devWarning from '../_util/devWarning';
import { AntTreeNodeProps } from '../tree';
import getIcons from '../select/utils/iconUtil';
import renderSwitcherIcon from '../tree/utils/iconUtil';
import SizeContext, { SizeType } from '../config-provider/SizeContext';

type RawValue = string | number;

export interface LabeledValue {
  key?: string;
  value: RawValue;
  label: React.ReactNode;
}

export type SelectValue = RawValue | RawValue[] | LabeledValue | LabeledValue[];

export interface TreeSelectProps<T>
  extends Omit<
    RcTreeSelectProps<T>,
    'showTreeIcon' | 'treeMotion' | 'inputIcon' | 'mode' | 'getInputElement' | 'backfill'
  > {
  suffixIcon?: React.ReactNode;
  size?: SizeType;
  bordered?: boolean;
}

export interface RefTreeSelectProps {
  focus: () => void;
  blur: () => void;
}

const InternalTreeSelect = <T extends DefaultValueType>(
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
    transitionName = 'slide-up',
    choiceTransitionName = '',
    ...props
  }: TreeSelectProps<T>,
  ref: React.Ref<RefTreeSelectProps>,
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
    '`multiple` will alway be `true` when `treeCheckable` is true',
  );

  const prefixCls = getPrefixCls('select', customizePrefixCls);
  const treePrefixCls = getPrefixCls('select-tree', customizePrefixCls);
  const treeSelectPrefixCls = getPrefixCls('tree-select', customizePrefixCls);

  const mergedDropdownClassName = classNames(dropdownClassName, `${treeSelectPrefixCls}-dropdown`, {
    [`${treeSelectPrefixCls}-dropdown-rtl`]: direction === 'rtl',
  });

  const isMultiple = !!(treeCheckable || multiple);

  // ===================== Icons =====================
  const { suffixIcon, itemIcon, removeIcon, clearIcon } = getIcons({
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
  const selectProps = omit(props, [
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

  return (
    <RcTreeSelect
      virtual={virtual}
      dropdownMatchSelectWidth={dropdownMatchSelectWidth}
      {...selectProps}
      ref={ref}
      prefixCls={prefixCls}
      className={mergedClassName}
      listHeight={listHeight}
      listItemHeight={listItemHeight}
      treeCheckable={
        treeCheckable ? <span className={`${prefixCls}-tree-checkbox-inner`} /> : treeCheckable
      }
      inputIcon={suffixIcon}
      menuItemSelectedIcon={itemIcon}
      multiple={multiple}
      removeIcon={removeIcon}
      clearIcon={clearIcon}
      switcherIcon={(nodeProps: AntTreeNodeProps) =>
        renderSwitcherIcon(treePrefixCls, switcherIcon, treeLine, nodeProps)
      }
      showTreeIcon={treeIcon}
      notFoundContent={mergedNotFound}
      getPopupContainer={getPopupContainer || getContextPopupContainer}
      treeMotion={null}
      dropdownClassName={mergedDropdownClassName}
      choiceTransitionName={choiceTransitionName}
      transitionName={transitionName}
    />
  );
};

const TreeSelectRef = React.forwardRef(InternalTreeSelect) as <T extends DefaultValueType>(
  props: TreeSelectProps<T> & { ref?: React.Ref<RefTreeSelectProps> },
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
