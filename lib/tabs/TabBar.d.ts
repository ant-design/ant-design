import * as React from 'react';
import { TabsProps } from './index';
export default class TabBar extends React.Component<TabsProps> {
    static defaultProps: {
        animated: boolean;
        type: string;
    };
    render(): React.ReactElement<any>;
}
