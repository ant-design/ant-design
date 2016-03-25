import React from 'react';
import defaultLocale from './locale/zh_CN';
import DateTimeFormat from 'gregorian-calendar-format';
import GregorianCalendar from 'gregorian-calendar';

export default {
  contextTypes: {
    antLocale: React.PropTypes.object,
  },

  getLocale() {
    let locale = defaultLocale;
    if (this.context.antLocale && this.context.antLocale.DatePicker) {
      locale = this.context.antLocale.DatePicker;
    }
    // 统一合并为完整的 Locale
    const result = { ...locale, ...this.props.locale };
    result.lang = { ...locale.lang, ...this.props.locale.lang };
    return result;
  },

  getFormatter() {
    const formats = this.formats = this.formats || {};
    let format = this.props.format;
    if (formats[format]) {
      return formats[format];
    }
    formats[format] = new DateTimeFormat(format, this.getLocale().lang.format);
    return formats[format];
  },

  parseDateFromValue(value) {
    if (value) {
      if (typeof value === 'string') {
        return this.getFormatter().parse(value, { locale: this.getLocale() });
      } else if (value instanceof Date) {
        let date = new GregorianCalendar(this.getLocale());
        date.setTime(+value);
        return date;
      }
    }
    return value;
  },

  // remove input readonly warning
  handleInputChange() {
  },

  toggleOpen(e) {
    this.setState({
      open: e.open
    });
  },
};
