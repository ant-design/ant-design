import React, { useMemo } from 'react';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import type { BaseInputProps } from '@rc-component/input';

import fallbackProp from '../fallbackProp';
import { isPlainObject } from '../is';
import { devUseWarning } from '../warning';

export type AllowClear = BaseInputProps['allowClear'];

interface UseAllowClearOptions {
  allowClear: AllowClear;
  clearIcon?: React.ReactNode;
  contextAllowClear?: AllowClear;
  contextClearIcon?: React.ReactNode;
  defaultAllowClear?: boolean;
  componentName: string;
}

export const useAllowClear = (options: UseAllowClearOptions): AllowClear => {
  const {
    allowClear,
    clearIcon,
    contextAllowClear,
    contextClearIcon,
    defaultAllowClear,
    componentName,
  } = options;

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning(componentName);
    warning.deprecated(!clearIcon, 'clearIcon', 'allowClear={{ clearIcon: React.ReactNode }}');
  }

  return useMemo(() => {
    const mergedAllowClear = allowClear ?? contextAllowClear ?? defaultAllowClear;
    if (!mergedAllowClear) {
      return false;
    }
    return {
      clearIcon: fallbackProp(
        isPlainObject(allowClear) ? allowClear?.clearIcon : clearIcon,
        isPlainObject(contextAllowClear) ? contextAllowClear?.clearIcon : contextClearIcon,
        <CloseCircleFilled />,
      ),
      disabled:
        (isPlainObject(allowClear) ? allowClear?.disabled : undefined) ??
        (isPlainObject(contextAllowClear) ? contextAllowClear?.disabled : undefined),
    };
  }, [allowClear, clearIcon, contextAllowClear, contextClearIcon, defaultAllowClear]);
};
