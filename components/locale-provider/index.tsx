import memoizeOne from 'memoize-one';
import type { ValidateMessages } from 'rc-field-form/lib/interface';
import * as React from 'react';
import warning from '../_util/warning';

import type { PickerLocale as DatePickerLocale } from '../date-picker/generatePicker';
import type { TransferLocale as TransferLocaleForEmpty } from '../empty';
import type { ModalLocale } from '../modal/locale';
import { changeConfirmLocale } from '../modal/locale';
import type { PaginationLocale } from '../pagination/Pagination';
import type { PopconfirmLocale } from '../popconfirm';
import type { TableLocale } from '../table/interface';
import type { TransferLocale } from '../transfer';
import type { UploadLocale } from '../upload/interface';
import LocaleContext from './context';

export const ANT_MARK = 'internalMark';

export interface Locale {
  locale: string;
  Pagination?: PaginationLocale;
  DatePicker?: DatePickerLocale;
  TimePicker?: Record<string, any>;
  Calendar?: Record<string, any>;
  Table?: TableLocale;
  Modal?: ModalLocale;
  Popconfirm?: PopconfirmLocale;
  Transfer?: Partial<TransferLocale>;
  Select?: Record<string, any>;
  Upload?: UploadLocale;
  Empty?: TransferLocaleForEmpty;
  global?: Record<string, any>;
  PageHeader?: { back: string };
  Icon?: Record<string, any>;
  Text?: {
    edit?: any;
    copy?: any;
    copied?: any;
    expand?: any;
  };
  Form?: {
    optional?: string;
    defaultValidateMessages: ValidateMessages;
  };
  Image?: {
    preview: string;
  };
}

export interface LocaleProviderProps {
  locale: Locale;
  children?: React.ReactNode;
  _ANT_MARK__?: string;
}

export default class LocaleProvider extends React.Component<LocaleProviderProps, any> {
  static defaultProps = {
    locale: {},
  };

  constructor(props: LocaleProviderProps) {
    super(props);
    changeConfirmLocale(props.locale && props.locale.Modal);

    warning(
      props._ANT_MARK__ === ANT_MARK,
      'LocaleProvider',
      '`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead: http://u.ant.design/locale',
    );
  }

  componentDidMount() {
    changeConfirmLocale(this.props.locale && this.props.locale.Modal);
  }

  componentDidUpdate(prevProps: LocaleProviderProps) {
    const { locale } = this.props;
    if (prevProps.locale !== locale) {
      changeConfirmLocale(locale && locale.Modal);
    }
  }

  componentWillUnmount() {
    changeConfirmLocale();
  }

  getMemoizedContextValue = memoizeOne((localeValue: Locale): Locale & { exist?: boolean } => ({
    ...localeValue,
    exist: true,
  }));

  render() {
    const { locale, children } = this.props;
    const contextValue = this.getMemoizedContextValue(locale);
    return <LocaleContext.Provider value={contextValue}>{children}</LocaleContext.Provider>;
  }
}
