import React from 'react';
import { changeConfirmLocale } from '../modal/locale';

export interface LocaleProviderProps {
  locale: {
    Pagination?: Object,
    DatePicker?: Object,
    TimePicker?: Object,
    Calendar?: Object,
    Table?: Object,
    Modal?: Object,
    Popconfirm?: Object,
    Transfer?: Object,
    Select?: Object,
  };
  children?: React.ReactElement<any>;
}

export default class LocaleProvider extends React.Component<LocaleProviderProps, any> {
  static propTypes = {
    locale: React.PropTypes.object,
  };

  static childContextTypes = {
    antLocale: React.PropTypes.object,
  };

  getChildContext() {
    return {
      antLocale: {
        ...this.props.locale,
        exist: true,
      },
    };
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    const { locale } = this.props;
    changeConfirmLocale(locale && locale.Modal);
  }

  componentWillUnMount() {
    changeConfirmLocale();
  }

  render() {
    return React.Children.only(this.props.children);
  }
}
