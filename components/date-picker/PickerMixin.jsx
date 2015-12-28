import objectAssign from 'object-assign';
import defaultLocale from './locale/zh_CN';
import DateTimeFormat from 'gregorian-calendar-format';
import GregorianCalendar from 'gregorian-calendar';

export default {
  getLocale() {
    // 统一合并为完整的 Locale
    let locale = objectAssign({}, defaultLocale, this.props.locale);
    locale.lang = objectAssign({}, defaultLocale.lang, this.props.locale.lang);
    return locale;
  },

  getFormatter() {
    const formats = this.formats = this.formats || {};
    const format = this.props.format;
    if (formats[format]) {
      return formats[format];
    }
    formats[format] = new DateTimeFormat(format, this.getLocale().lang.format);
    return formats[format];
  },

  parseDateFromValue(value) {
    if (value) {
      if (typeof value === 'string') {
        return this.getFormatter().parse(value, {locale: this.getLocale()});
      } else if (value instanceof Date) {
        let date = new GregorianCalendar(this.getLocale());
        date.setTime(+value);
        return date;
      }
    } else if (value === null) {
      return value;
    }
    return undefined;
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
