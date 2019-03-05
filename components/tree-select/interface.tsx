import * as React from 'react';
import { AbstractSelectProps } from '../select';

export type TreeNode = TreeNodeNormal | TreeNodeSimpleMode;

export interface TreeNodeNormal {
  value: string | number;
  /**
   * @deprecated Please use `title` instead.
   */
  label?: React.ReactNode;
  title?: React.ReactNode;
  key: string;
  isLeaf?: boolean;
  disabled?: boolean;
  disableCheckbox?: boolean;
  selectable?: boolean;
  children?: TreeNodeNormal[];
}

export interface TreeNodeSimpleMode {
  /* It is possible to change `id` and `pId` prop keys using TreeDataSimpleMode so those keys can be anything */
  [key: string]: string | boolean | React.ReactNode;
}

export interface TreeDataSimpleMode {
  id?: string;
  pId?: string;
  rootPId?: string;
}

export interface TreeSelectProps extends AbstractSelectProps {
  autoFocus?: boolean;
  defaultValue?: string | number | Array<any>;
  dropdownStyle?: React.CSSProperties;
  filterTreeNode?: (inputValue: string, treeNode: any) => boolean | boolean;
  labelInValue?: boolean;
  loadData?: (node: any) => void;
  maxTagCount?: number;
  maxTagPlaceholder?: React.ReactNode | ((omittedValues: any[]) => React.ReactNode);
  multiple?: boolean;
  notFoundContent?: React.ReactNode;
  onChange?: (value: any, label: any, extra: any) => void;
  onSearch?: (value: any) => void;
  onSelect?: (value: any) => void;
  onTreeExpand?: (keys: Array<string>) => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  searchPlaceholder?: string;
  searchValue?: string;
  showCheckedStrategy?: 'SHOW_ALL' | 'SHOW_PARENT' | 'SHOW_CHILD';
  suffixIcon?: React.ReactNode;
  treeCheckable?: boolean | React.ReactNode;
  treeCheckStrictly?: boolean;
  treeData?: Array<TreeNode>;
  treeDataSimpleMode?: boolean | TreeDataSimpleMode;
  treeDefaultExpandAll?: boolean;
  treeDefaultExpandedKeys?: Array<string>;
  treeExpandedKeys?: Array<string>;
  treeIcon?: boolean;
  treeNodeFilterProp?: string;
  treeNodeLabelProp?: string;
  value?: string | number | Array<any>;
}
