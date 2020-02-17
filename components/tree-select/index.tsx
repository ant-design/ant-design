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
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
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
  size?: SizeType;
  bordered?: boolean;
}

class TreeSelect<T> extends React.Component<TreeSelectProps<T>, {}> {
  static TreeNode = TreeNode;

  static SHOW_ALL = SHOW_ALL;

  static SHOW_PARENT = SHOW_PARENT;

  static SHOW_CHILD = SHOW_CHILD;

  static defaultProps = {
    transitionName: 'slide-up',
    choiceTransitionName: 'zoom',
    bordered: true,
  };

  selectRef = React.createRef<RcTreeSelect>();

  constructor(props: TreeSelectProps<T>) {
    super(props);

    warning(
      props.multiple !== false || !props.treeCheckable,
      'TreeSelect',
      '`multiple` will alway be `true` when `treeCheckable` is true',
    );
  }

  focus() {
    if (this.selectRef.current) {
      this.selectRef.current.focus();
    }
  }

  blur() {
    if (this.selectRef.current) {
      this.selectRef.current.blur();
    }
  }

  renderTreeSelect = ({
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    renderEmpty,
    direction,
  }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      size: customizeSize,
      className,
      treeCheckable,
      multiple,
      listHeight = 256,
      listItemHeight = 32,
      notFoundContent,
      switcherIcon,
      treeLine,
      getPopupContainer,
      dropdownClassName,
      bordered,
    } = this.props;

    const prefixCls = getPrefixCls('select', customizePrefixCls);
    const treePrefixCls = getPrefixCls('select-tree', customizePrefixCls);
    const treeSelectPrefixCls = getPrefixCls('tree-select', customizePrefixCls);

    const mergedDropdownClassName = classNames(
      dropdownClassName,
      `${treeSelectPrefixCls}-dropdown`,
      {
        [`${treeSelectPrefixCls}-dropdown-rtl`]: direction === 'rtl',
      },
    );

    const isMultiple = !!(treeCheckable || multiple);

    // ===================== Icons =====================
    const { suffixIcon, itemIcon, removeIcon, clearIcon } = getIcons({
      ...this.props,
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
    const selectProps = omit(this.props, [
      'prefixCls',
      'suffixIcon',
      'itemIcon',
      'removeIcon',
      'clearIcon',
      'switcherIcon',
      'size',
      'bordered',
    ]);

    return (
      <SizeContext.Consumer>
        {size => {
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
              ref={this.selectRef}
              prefixCls={prefixCls}
              className={mergedClassName}
              listHeight={listHeight}
              listItemHeight={listItemHeight}
              treeCheckable={
                treeCheckable ? (
                  <span className={`${prefixCls}-tree-checkbox-inner`} />
                ) : (
                  treeCheckable
                )
              }
              inputIcon={suffixIcon}
              menuItemSelectedIcon={itemIcon}
              removeIcon={removeIcon}
              clearIcon={clearIcon}
              switcherIcon={(nodeProps: AntTreeNodeProps) =>
                renderSwitcherIcon(treePrefixCls, switcherIcon, treeLine, nodeProps)
              }
              showTreeIcon={false}
              notFoundContent={mergedNotFound}
              getPopupContainer={getPopupContainer || getContextPopupContainer}
              treeMotion={null}
              dropdownClassName={mergedDropdownClassName}
            />
          );
        }}
      </SizeContext.Consumer>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderTreeSelect}</ConfigConsumer>;
  }
}

export { TreeNode };

export default TreeSelect;
