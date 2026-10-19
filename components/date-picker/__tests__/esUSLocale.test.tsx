import dayjs from 'dayjs';

import 'dayjs/locale/es-us';

import dayjsGenerateConfig from '@rc-component/picker/generate/dayjs';

import esUS from '../locale/es_US';

describe('DatePicker locale', () => {
  it('es_US should format month and weekday names in Spanish', () => {
    const date = dayjs('2018-01-15');
    const { locale } = esUS.lang;

    expect(dayjsGenerateConfig.locale.format(locale, date, 'MMMM')).toBe('enero');
    expect(dayjsGenerateConfig.locale.format(locale, date, 'dddd')).toBe('lunes');
  });
});
