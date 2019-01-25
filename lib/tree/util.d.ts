import * as React from 'react';
export declare function getFullKeyList(children: React.ReactNode | React.ReactNode[]): string[];
/** 计算选中范围，只考虑expanded情况以优化性能 */
export declare function calcRangeKeys(rootChildren: React.ReactNode | React.ReactNode[], expandedKeys: string[], startKey?: string, endKey?: string): string[];
