/**
 * Created by Andrey Gayvoronsky on 13/04/16.
 */
import TimepickerLocale from 'rc-time-picker/lib/locale/ru_RU';
import assign from 'object-assign';
const locale = assign({}, {
  placeholder: 'Выберите время',
}, TimepickerLocale);

export default locale;
