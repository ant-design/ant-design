import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ModalLocale } from '../modal/locale';
export interface Locale {
    locale: string;
    Pagination?: Object;
    DatePicker?: Object;
    TimePicker?: Object;
    Calendar?: Object;
    Table?: Object;
    Modal?: ModalLocale;
    Popconfirm?: Object;
    Transfer?: Object;
    Select?: Object;
    Upload?: Object;
}
export interface LocaleProviderProps {
    locale: Locale;
    children?: React.ReactNode;
}
export default class LocaleProvider extends React.Component<LocaleProviderProps, any> {
    static propTypes: {
        locale: PropTypes.Requireable<object>;
    };
    static defaultProps: {
        locale: {};
    };
    static childContextTypes: {
        antLocale: PropTypes.Requireable<object>;
    };
    constructor(props: LocaleProviderProps);
    getChildContext(): {
        antLocale: {
            exist: boolean;
            locale: string;
            Pagination?: Object | undefined;
            DatePicker?: Object | undefined;
            TimePicker?: Object | undefined;
            Calendar?: Object | undefined;
            Table?: Object | undefined;
            Modal?: ModalLocale | undefined;
            Popconfirm?: Object | undefined;
            Transfer?: Object | undefined;
            Select?: Object | undefined;
            Upload?: Object | undefined;
        };
    };
    componentDidUpdate(prevProps: LocaleProviderProps): void;
    componentWillUnmount(): void;
    render(): React.ReactElement<any>;
}
