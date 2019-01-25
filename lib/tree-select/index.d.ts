import * as React from 'react';
import { TreeSelectProps } from './interface';
import { ConfigConsumerProps } from '../config-provider';
import { AntTreeNodeProps } from '../tree';
export { TreeNode, TreeSelectProps } from './interface';
export default class TreeSelect extends React.Component<TreeSelectProps, any> {
    static TreeNode: any;
    static SHOW_ALL: any;
    static SHOW_PARENT: any;
    static SHOW_CHILD: any;
    static defaultProps: {
        transitionName: string;
        choiceTransitionName: string;
        showSearch: boolean;
    };
    private rcTreeSelect;
    constructor(props: TreeSelectProps);
    focus(): void;
    blur(): void;
    saveTreeSelect: (node: any) => void;
    renderSwitcherIcon: (prefixCls: string, { isLeaf, loading }: AntTreeNodeProps) => JSX.Element | null;
    renderTreeSelect: ({ getPopupContainer: getContextPopupContainer, getPrefixCls, renderEmpty, }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
