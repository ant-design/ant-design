import * as React from 'react';
export declare function flatArray(data?: any[], childrenName?: string): any[];
export declare function treeMap<Node>(tree: Node[], mapper: (node: Node, index: number) => any, childrenName?: string): any[];
export declare function flatFilter(tree: any[], callback: Function): any;
export declare function normalizeColumns(elements: React.ReactChildren): any[];
