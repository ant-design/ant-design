import * as React from 'react';
import RcTreeSelect, { TreeNode, SHOW_ALL, SHOW_PARENT, SHOW_CHILD } from 'rc-tree-select';
import classNames from 'classnames';
import { TreeSelectProps } from './interface';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import warning from '../_util/warning';
import Icon from '../icon';
import { AntTreeNodeProps } from '../tree';
import omit from 'omit.js';

export { TreeNode, TreeSelectProps } from './interface';

export default class TreeSelect extends React.Component<TreeSelectProps, any> {
  static TreeNode = TreeNode;
  static SHOW_ALL = SHOW_ALL;
  static SHOW_PARENT = SHOW_PARENT;
  static SHOW_CHILD = SHOW_CHILD;

  static defaultProps = {
    transitionName: 'slide-up',
    choiceTransitionName: 'zoom',
    showSearch: false,
  };

  private rcTreeSelect: any;

  constructor(props: TreeSelectProps) {
    super(props);

    warning(
      props.multiple !== false || !props.treeCheckable,
      '`multiple` will alway be `true` when `treeCheckable` is true',
    );
  }

  focus() {
    this.rcTreeSelect.focus();
  }

  blur() {
    this.rcTreeSelect.blur();
  }

  saveTreeSelect = (node: typeof RcTreeSelect) => {
    this.rcTreeSelect = node;
  };

  renderLoadingIcon = (prefixCls: string) => {
    const { loadingIcon } = this.props;
    const loadingIconCls = `${prefixCls}-switcher-loading-icon`;

    if (loadingIcon) {
      return React.isValidElement<{ className?: string }>(loadingIcon)
        ? React.cloneElement(loadingIcon, {
            className: classNames(loadingIcon.props.className, loadingIconCls),
          })
        : loadingIcon;
    }

    return <Icon type="loading" className={loadingIconCls} />;
  };

  renderCaretDownIcon = (prefixCls: string) => {
    const { caretDownIcon } = this.props;
    const caretDownCls = `${prefixCls}-switcher-icon`;

    if (caretDownIcon) {
      return React.isValidElement<{ className?: string }>(caretDownIcon)
        ? React.cloneElement(caretDownIcon, {
            className: classNames(caretDownIcon.props.className, caretDownCls),
          })
        : caretDownIcon;
    }

    return <Icon type="caret-down" className={caretDownCls} />;
  };

  renderSwitcherIcon = (prefixCls: string, { isLeaf, loading }: AntTreeNodeProps) => {
    if (loading) {
      return this.renderLoadingIcon(prefixCls);
    }
    if (isLeaf) {
      return null;
    }
    return this.renderCaretDownIcon(prefixCls);
  };

  renderTreeSelect = ({
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    renderEmpty,
  }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      className,
      size,
      notFoundContent,
      dropdownStyle,
      dropdownClassName,
      suffixIcon,
      removeIcon,
      clearIcon,
      getPopupContainer,
      ...restProps
    } = this.props;
    const rest = omit(restProps, ['inputIcon', 'removeIcon', 'clearIcon', 'switcherIcon']);

    const prefixCls = getPrefixCls('select', customizePrefixCls);
    const cls = classNames(
      {
        [`${prefixCls}-lg`]: size === 'large',
        [`${prefixCls}-sm`]: size === 'small',
      },
      className,
    );

    let checkable = rest.treeCheckable;
    if (checkable) {
      checkable = <span className={`${prefixCls}-tree-checkbox-inner`} />;
    }

    const inputIcon = (suffixIcon &&
      (React.isValidElement<{ className?: string }>(suffixIcon)
        ? React.cloneElement(suffixIcon)
        : suffixIcon)) || <Icon type="down" className={`${prefixCls}-arrow-icon`} />;

    const finalRemoveIcon = (removeIcon &&
      (React.isValidElement<{ className?: string }>(removeIcon)
        ? React.cloneElement(removeIcon, {
            className: classNames(removeIcon.props.className, `${prefixCls}-remove-icon`),
          })
        : removeIcon)) || <Icon type="close" className={`${prefixCls}-remove-icon`} />;

    const finalClearIcon = (clearIcon &&
      (React.isValidElement<{ className?: string }>(clearIcon)
        ? React.cloneElement(clearIcon, {
            className: classNames(clearIcon.props.className, `${prefixCls}-clear-icon`),
          })
        : clearIcon)) || (
      <Icon type="close-circle" className={`${prefixCls}-clear-icon`} theme="filled" />
    );

    return (
      <RcTreeSelect
        switcherIcon={(nodeProps: AntTreeNodeProps) =>
          this.renderSwitcherIcon(prefixCls, nodeProps)
        }
        inputIcon={inputIcon}
        removeIcon={finalRemoveIcon}
        clearIcon={finalClearIcon}
        {...rest}
        getPopupContainer={getPopupContainer || getContextPopupContainer}
        dropdownClassName={classNames(dropdownClassName, `${prefixCls}-tree-dropdown`)}
        prefixCls={prefixCls}
        className={cls}
        dropdownStyle={{ maxHeight: '100vh', overflow: 'auto', ...dropdownStyle }}
        treeCheckable={checkable}
        notFoundContent={notFoundContent || renderEmpty('Select')}
        ref={this.saveTreeSelect}
      />
    );
  };

  render() {
    return <ConfigConsumer>{this.renderTreeSelect}</ConfigConsumer>;
  }
}
