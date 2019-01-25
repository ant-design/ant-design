import * as React from 'react';
import { FilterMenuProps, FilterMenuState, ColumnProps, ColumnFilterItem } from './interface';
export default class FilterMenu<T> extends React.Component<FilterMenuProps<T>, FilterMenuState> {
    static defaultProps: {
        handleFilter(): void;
        column: {};
    };
    neverShown: boolean;
    constructor(props: FilterMenuProps<T>);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: FilterMenuProps<T>): void;
    getDropdownVisible(): boolean | undefined;
    setNeverShown: (column: ColumnProps<T>) => void;
    setSelectedKeys: ({ selectedKeys }: {
        selectedKeys: string[];
    }) => void;
    setVisible(visible: boolean): void;
    handleClearFilters: () => void;
    handleConfirm: () => void;
    onVisibleChange: (visible: boolean) => void;
    confirmFilter(): void;
    renderMenuItem(item: ColumnFilterItem): JSX.Element;
    hasSubMenu(): boolean;
    renderMenus(items: ColumnFilterItem[]): React.ReactElement<any>[];
    handleMenuItemClick: (info: {
        keyPath: string;
        key: string;
    }) => void;
    renderFilterIcon: () => JSX.Element;
    render(): JSX.Element;
}
