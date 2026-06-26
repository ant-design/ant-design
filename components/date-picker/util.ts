import * as React from 'react';
import type { PickerMode } from '@rc-component/picker/interface';

import { isNonNullable } from '../_util/is';
import useSelectIcons from '../select/useIcons';
import type { PickerLocale, PickerProps } from './generatePicker';

export const getPlaceholder = (
  locale: PickerLocale,
  picker?: PickerMode,
  customizePlaceholder?: string,
) => {
  if (isNonNullable(customizePlaceholder)) {
    return customizePlaceholder;
  }

  if (picker === 'year' && locale.lang.yearPlaceholder) {
    return locale.lang.yearPlaceholder;
  }
  if (picker === 'quarter' && locale.lang.quarterPlaceholder) {
    return locale.lang.quarterPlaceholder;
  }
  if (picker === 'month' && locale.lang.monthPlaceholder) {
    return locale.lang.monthPlaceholder;
  }
  if (picker === 'week' && locale.lang.weekPlaceholder) {
    return locale.lang.weekPlaceholder;
  }
  if (picker === 'time' && locale.timePickerLocale.placeholder) {
    return locale.timePickerLocale.placeholder;
  }
  return locale.lang.placeholder;
};

export const getRangePlaceholder = (
  locale: PickerLocale,
  picker?: PickerMode,
  customizePlaceholder?: [string, string],
) => {
  if (isNonNullable(customizePlaceholder)) {
    return customizePlaceholder;
  }

  if (picker === 'year' && locale.lang.rangeYearPlaceholder) {
    return locale.lang.rangeYearPlaceholder;
  }
  if (picker === 'quarter' && locale.lang.rangeQuarterPlaceholder) {
    return locale.lang.rangeQuarterPlaceholder;
  }
  if (picker === 'month' && locale.lang.rangeMonthPlaceholder) {
    return locale.lang.rangeMonthPlaceholder;
  }
  if (picker === 'week' && locale.lang.rangeWeekPlaceholder) {
    return locale.lang.rangeWeekPlaceholder;
  }
  if (picker === 'time' && locale.timePickerLocale.rangePlaceholder) {
    return locale.timePickerLocale.rangePlaceholder;
  }
  return locale.lang.rangePlaceholder;
};

export const useIcons = (
  props: Pick<PickerProps, 'allowClear' | 'removeIcon'>,
  prefixCls: string,
) => {
  const { allowClear = true } = props;

  const { clearIcon, removeIcon } = useSelectIcons({
    ...props,
    prefixCls,
    componentName: 'DatePicker',
  });

  const mergedAllowClear = React.useMemo(() => {
    if (allowClear === false) {
      return false;
    }

    const allowClearConfig = allowClear === true ? {} : allowClear;

    return {
      clearIcon: clearIcon as React.ReactNode,
      ...allowClearConfig,
    };
  }, [allowClear, clearIcon]);

  return [mergedAllowClear, removeIcon] as const;
};
