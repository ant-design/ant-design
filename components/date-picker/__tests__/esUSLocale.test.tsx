import dayjs from 'dayjs';

// The picker maps `es_US` to dayjs' `es-us` once @rc-component/picker ships that
// mapping; released versions fall back to the region-less `es` locale, so load both.
import 'dayjs/locale/es';
import 'dayjs/locale/es-us';

import dayjsGenerateConfig from '@rc-component/picker/generate/dayjs';

import esUS from '../locale/es_US';

describe('DatePicker locale', () => {
  it('es_US keeps the underscore form every adapter expects', () => {
    // `lang.locale` is passed to every date library adapter: the dayjs adapter
    // maps it through `localeMap`, while the date-fns adapter resolves it by
    // dropping the region. A hyphenated `es-us` breaks the latter and the panel
    // throws while rendering.
    expect(esUS.lang.locale).toBe('es_US');
  });

  it('es_US formats month and weekday names in Spanish', () => {
    const date = dayjs('2018-01-15');
    const { locale } = esUS.lang;

    expect(dayjsGenerateConfig.locale.format(locale, date, 'MMMM')).toBe('enero');
    expect(dayjsGenerateConfig.locale.format(locale, date, 'dddd')).toBe('lunes');
  });
});
