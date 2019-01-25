import * as React from 'react';
import * as PropTypes from 'prop-types';
export interface SubMenuProps {
    rootPrefixCls?: string;
    className?: string;
    disabled?: boolean;
    title?: React.ReactNode;
    onTitleClick?: (key: string, domEvent?: Event) => void;
}
declare class SubMenu extends React.Component<SubMenuProps, any> {
    static contextTypes: {
        antdMenuTheme: PropTypes.Requireable<string>;
    };
    static isSubMenu: number;
    context: any;
    private subMenu;
    onKeyDown: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    saveSubMenu: (subMenu: any) => void;
    render(): JSX.Element;
}
export default SubMenu;
