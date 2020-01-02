import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ModalLocale, changeConfirmLocale } from '../modal/locale';
import warning from '../_util/warning';

export const ANT_MARK = 'internalMark';

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
  _ANT_MARK__?: string;
}

export default class LocaleProvider extends React.Component<LocaleProviderProps, any> {
  static defaultProps = {
    locale: {},
  };

  static childContextTypes = {
    antLocale: PropTypes.object,
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

  getChildContext() {
    return {
      antLocale: {
        ...this.props.locale,
        exist: true,
      },
    };
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

  render() {
    return this.props.children;
  }
}
