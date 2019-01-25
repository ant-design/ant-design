import { IconProps } from './index';
import * as React from 'react';
export interface CustomIconOptions {
    scriptUrl?: string;
    extraCommonProps?: {
        [key: string]: any;
    };
}
export default function create(options?: CustomIconOptions): React.SFC<IconProps>;
