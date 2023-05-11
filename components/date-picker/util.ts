import type { AlignType } from '@rc-component/trigger';
import type { PickerMode } from 'rc-picker/lib/interface';
import type { SelectCommonPlacement } from '../_util/motion';
import type { DirectionType } from '../config-provider';
import type { PickerLocale } from './generatePicker';

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

export function transPlacement2DropdownAlign(
  direction: DirectionType,
  placement?: SelectCommonPlacement,
): AlignType {
  const overflow = {
    adjustX: 1,
    adjustY: 1,
  };
  switch (placement) {
    case 'bottomLeft': {
      return {
        points: ['tl', 'bl'],
        offset: [0, 4],
        overflow,
      };
    }
    case 'bottomRight': {
      return {
        points: ['tr', 'br'],
        offset: [0, 4],
        overflow,
      };
    }
    case 'topLeft': {
      return {
        points: ['bl', 'tl'],
        offset: [0, -4],
        overflow,
      };
    }
    case 'topRight': {
      return {
        points: ['br', 'tr'],
        offset: [0, -4],
        overflow,
      };
    }
    default: {
      return {
        points: direction === 'rtl' ? ['tr', 'br'] : ['tl', 'bl'],
        offset: [0, 4],
        overflow,
      };
    }
  }
}
