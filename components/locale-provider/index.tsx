import * as React from 'react';
import { ValidateMessages } from 'rc-field-form/lib/interface';
import devWarning from '../_util/devWarning';

import { ModalLocale, changeConfirmLocale } from '../modal/locale';
import { TransferLocale as TransferLocaleForEmpty } from '../empty';
import { PaginationLocale } from '../pagination/Pagination';
import { TableLocale } from '../table/interface';
import { PopconfirmLocale } from '../popconfirm';
import { UploadLocale } from '../upload/interface';
import { TransferLocale } from '../transfer';
import { PickerLocale as DatePickerLocale } from '../date-picker/generatePicker';
import LocaleContext from './context';

export const ANT_MARK = 'internalMark';

export interface Locale {
  locale: string;
  Pagination?: PaginationLocale;
  DatePicker?: DatePickerLocale;
  TimePicker?: Object;
  Calendar?: Object;
  Table?: TableLocale;
  Modal?: ModalLocale;
  Popconfirm?: PopconfirmLocale;
  Transfer?: Partial<TransferLocale>;
  Select?: Object;
  Upload?: UploadLocale;
  Empty?: TransferLocaleForEmpty;
  global?: Object;
  PageHeader?: Object;
  Icon?: Object;
  Text?: Object;
  Form?: {
    defaultValidateMessages: ValidateMessages;
  };
}

export interface LocaleProviderProps {
  locale: Locale;
  children?: React.ReactNode;
  _ANT_MARK__?: string;
}

const LocaleProvider: React.FC<LocaleProviderProps> = ({ locale = {}, children, _ANT_MARK__ }) => {
  devWarning(
    _ANT_MARK__ === ANT_MARK,
    'LocaleProvider',
    '`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead: http://u.ant.design/locale',
  );

  React.useEffect(() => {
    changeConfirmLocale(locale && locale.Modal);
    return () => changeConfirmLocale();
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ ...locale, exist: true }}>{children}</LocaleContext.Provider>
  );
};

export default LocaleProvider;
