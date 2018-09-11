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
  value?: string | number | Array<any>;
  defaultValue?: string | number | Array<any>;
  multiple?: boolean;
  maxTagCount?: number;
  onSelect?: (value: any) => void;
  onChange?: (value: any, label: any) => void;
  onSearch?: (value: any) => void;
  searchPlaceholder?: string;
  dropdownStyle?: React.CSSProperties;
  treeDefaultExpandAll?: boolean;
  treeCheckable?: boolean | React.ReactNode;
  treeDefaultExpandedKeys?: Array<string>;
  filterTreeNode?: (inputValue: string, treeNode: any) => boolean | boolean;
  treeNodeFilterProp?: string;
  treeNodeLabelProp?: string;
  treeData?: Array<TreeNode>;
  treeDataSimpleMode?: boolean | TreeDataSimpleMode;
  loadData?: (node: any) => void;
  showCheckedStrategy?: 'SHOW_ALL' | 'SHOW_PARENT' | 'SHOW_CHILD';
  labelInValue?: boolean;
  treeCheckStrictly?: boolean;
  getPopupContainer?: (triggerNode: Element) => HTMLElement;
}
