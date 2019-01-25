import * as React from 'react';
import { CheckboxChangeEvent } from '../checkbox';
import { SelectionCheckboxAllProps, SelectionCheckboxAllState, SelectionItem } from './interface';
export default class SelectionCheckboxAll<T> extends React.Component<SelectionCheckboxAllProps<T>, SelectionCheckboxAllState> {
    unsubscribe: () => void;
    defaultSelections: SelectionItem[];
    constructor(props: SelectionCheckboxAllProps<T>);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: SelectionCheckboxAllProps<T>): void;
    componentWillUnmount(): void;
    subscribe(): void;
    checkSelection(props: SelectionCheckboxAllProps<T>, data: T[], type: string, byDefaultChecked: boolean): boolean;
    setCheckState(props: SelectionCheckboxAllProps<T>): void;
    getCheckState(props: SelectionCheckboxAllProps<T>): boolean;
    getIndeterminateState(props: SelectionCheckboxAllProps<T>): boolean;
    handleSelectAllChange: (e: CheckboxChangeEvent) => void;
    renderMenus(selections: SelectionItem[]): JSX.Element[];
    render(): JSX.Element;
}
