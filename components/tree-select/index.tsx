import * as React from 'react';
import RcTreeSelect, {
  TreeNode,
  SHOW_ALL,
  SHOW_PARENT,
  SHOW_CHILD,
  TreeSelectProps as RcTreeSelectProps,
} from 'rc-tree-select';
import classNames from 'classnames';
import omit from 'omit.js';
import { ConfigContext } from '../config-provider';
import warning from '../_util/warning';
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

function InternalTreeSelect<T>(
  props: TreeSelectProps<T>,
  ref: ((instance: T | null) => void) | React.MutableRefObject<T | null> | null,
) {
  warning(
    props.multiple !== false || !props.treeCheckable,
    'TreeSelect',
    '`multiple` will alway be `true` when `treeCheckable` is true',
  );

  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    renderEmpty,
    direction,
  } = React.useContext(ConfigContext);
  const size = React.useContext(SizeContext);

  const {
    prefixCls: customizePrefixCls,
    size: customizeSize,
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
    bordered,
    treeIcon = false,
  } = props;

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
    'prefixCls',
    'suffixIcon',
    'itemIcon',
    'removeIcon',
    'clearIcon',
    'switcherIcon',
    'size',
    'bordered',
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
    />
  );
}

export { TreeNode };

interface CompoundedComponent<T>
  extends React.ForwardRefExoticComponent<TreeSelectProps<T> & React.RefAttributes<HTMLElement>> {
  TreeNode: typeof TreeNode;
  SHOW_ALL: typeof SHOW_ALL;
  SHOW_PARENT: typeof SHOW_PARENT;
  SHOW_CHILD: typeof SHOW_CHILD;
}

const TreeSelect = React.forwardRef(InternalTreeSelect) as CompoundedComponent<unknown>;

TreeSelect.defaultProps = {
  transitionName: 'slide-up',
  choiceTransitionName: 'zoom',
  bordered: true,
};

TreeSelect.TreeNode = TreeNode;
TreeSelect.SHOW_ALL = SHOW_ALL;
TreeSelect.SHOW_PARENT = SHOW_PARENT;
TreeSelect.SHOW_CHILD = SHOW_CHILD;

export default TreeSelect;
