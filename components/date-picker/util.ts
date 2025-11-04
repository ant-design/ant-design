import * as React from 'react';
import type { PickerMode } from 'rc-picker/lib/interface';

import useSelectIcons from '../select/useIcons';
import type { PickerLocale, PickerProps } from './generatePicker';

type PlaceholderType = 'single' | 'range';

/**
 * Helper function to get placeholder key based on picker type and placeholder type
 */
function getPlaceholderKey(
  picker: PickerMode | undefined,
  type: PlaceholderType,
): keyof PickerLocale['lang'] {
  const prefix = type === 'range' ? 'range' : '';
  const pickerKey = picker ? picker.charAt(0).toUpperCase() + picker.slice(1) : '';
  
  if (picker === 'year') {
    return type === 'range' ? 'rangeYearPlaceholder' : 'yearPlaceholder';
  }
  if (picker === 'quarter') {
    return type === 'range' ? 'rangeQuarterPlaceholder' : 'quarterPlaceholder';
  }
  if (picker === 'month') {
    return type === 'range' ? 'rangeMonthPlaceholder' : 'monthPlaceholder';
  }
  if (picker === 'week') {
    return type === 'range' ? 'rangeWeekPlaceholder' : 'weekPlaceholder';
  }
  
  return type === 'range' ? 'rangePlaceholder' : 'placeholder';
}

export function getPlaceholder(
  locale: PickerLocale,
  picker?: PickerMode,
  customizePlaceholder?: string,
): string {
  if (customizePlaceholder !== undefined) {
    return customizePlaceholder;
  }

  if (picker === 'time' && locale.timePickerLocale.placeholder) {
    return locale.timePickerLocale.placeholder;
  }

  const key = getPlaceholderKey(picker, 'single');
  return locale.lang[key] as string || locale.lang.placeholder;
}

export function getRangePlaceholder(
  locale: PickerLocale,
  picker?: PickerMode,
  customizePlaceholder?: [string, string],
) {
  if (customizePlaceholder !== undefined) {
    return customizePlaceholder;
  }

  if (picker === 'time' && locale.timePickerLocale.rangePlaceholder) {
    return locale.timePickerLocale.rangePlaceholder;
  }

  const key = getPlaceholderKey(picker, 'range');
  return locale.lang[key] as [string, string] || locale.lang.rangePlaceholder;
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
