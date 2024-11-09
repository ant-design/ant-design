import * as React from 'react';
import type { PickerMode } from 'rc-picker/lib/interface';

import useSelectIcons from '../select/useIcons';
import type { PickerLocale, PickerProps } from './generatePicker';

export function getPlaceholder(
  locale: PickerLocale,
  picker?: PickerMode,
  customizePlaceholder?: string,
): string {
  if (customizePlaceholder !== undefined) {
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
    return locale!.timePickerLocale.placeholder;
  }
  return locale.lang.placeholder;
}

export function getRangePlaceholder(
  locale: PickerLocale,
  picker?: PickerMode,
  customizePlaceholder?: [string, string],
) {
  if (customizePlaceholder !== undefined) {
    return customizePlaceholder;
  }

  if (picker === 'year' && locale.lang.yearPlaceholder) {
    return locale.lang.rangeYearPlaceholder;
  }
  if (picker === 'quarter' && locale.lang.quarterPlaceholder) {
    return locale.lang.rangeQuarterPlaceholder;
  }
  if (picker === 'month' && locale.lang.monthPlaceholder) {
    return locale.lang.rangeMonthPlaceholder;
  }
  if (picker === 'week' && locale.lang.weekPlaceholder) {
    return locale.lang.rangeWeekPlaceholder;
  }
  if (picker === 'time' && locale.timePickerLocale.placeholder) {
    return locale!.timePickerLocale.rangePlaceholder;
  }
  return locale.lang.rangePlaceholder;
}

export function useIcons(props: Pick<PickerProps, 'allowClear' | 'removeIcon'>, prefixCls: string) {
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
}
