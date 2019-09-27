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
import { Loading, CaretDown, Down, Close, CloseCircleFilled } from '@ant-design/icons';

import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import warning from '../_util/warning';
import { cloneElement } from '../_util/reactNode';
import { AntTreeNodeProps } from '../tree';
import { Size } from '../select';
import { getIcons } from '../select/utils/iconUtil';
import { renderSwitcherIcon } from '../tree/utils/iconUtil';

type RawValue = string | number;

export interface LabeledValue {
  key?: string;
  value: RawValue;
  label: React.ReactNode;
}

export type SelectValue = RawValue | RawValue[] | LabeledValue | LabeledValue[];

export interface TreeSelectProps<T> extends RcTreeSelectProps<T> {
  size?: Size;
}

class TreeSelect<T> extends React.Component<TreeSelectProps<T>> {
  static TreeNode = TreeNode;

  static SHOW_ALL = SHOW_ALL;

  static SHOW_PARENT = SHOW_PARENT;

  static SHOW_CHILD = SHOW_CHILD;

  renderTreeSelect = ({
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    renderEmpty,
  }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      size,
      className,
      treeCheckable,
      multiple,
      listHeight = 256,
      listItemHeight = 32,
      notFoundContent,
      switcherIcon,
      treeLine,
    } = this.props;

    const prefixCls = getPrefixCls('select', customizePrefixCls);
    const treePrefixCls = getPrefixCls('select-tree', customizePrefixCls);

    const mergedClassName = classNames(
      !customizePrefixCls && getPrefixCls('tree-select', customizePrefixCls),
      {
        [`${prefixCls}-lg`]: size === 'large',
        [`${prefixCls}-sm`]: size === 'small',
      },
      className,
    );

    const isMultiple = !!(treeCheckable || multiple);

    // ===================== Icons =====================
    const { suffixIcon, itemIcon, removeIcon, clearIcon } = getIcons({
      ...this.props,
      multiple: isMultiple,
    });

    // ===================== Empty =====================
    let mergedNotFound;
    if (notFoundContent !== undefined) {
      mergedNotFound = notFoundContent;
    } else {
      mergedNotFound = renderEmpty('Select');
    }

    // ==================== Render =====================
    const selectProps = omit(this.props, [
      'prefixCls',
      'suffixIcon',
      'itemIcon',
      'removeIcon',
      'clearIcon',
      'switcherIcon',
      'size',
    ]);

    return (
      <RcTreeSelect
        {...selectProps}
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
        notFoundContent={mergedNotFound}
      />
    );
  };

  render() {
    return <ConfigConsumer>{this.renderTreeSelect}</ConfigConsumer>;
  }
}

export default TreeSelect;
