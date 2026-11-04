import React, { useMemo } from 'react';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import type { AllowClearConfig } from '@rc-component/util';

import fallbackProp from '../fallbackProp';
import { isPlainObject } from '../is';
import { devUseWarning } from '../warning';

export type AllowClear = boolean | AllowClearConfig | undefined;

interface UseAllowClearOptions {
  allowClear: AllowClear;
  clearIcon?: React.ReactNode;
  contextAllowClear?: AllowClear;
  contextClearIcon?: React.ReactNode;
  defaultAllowClear?: boolean;
  defaultLabel?: string;
  componentName: string;
}

export const useAllowClear = (options: UseAllowClearOptions): AllowClearConfig | false => {
  const {
    allowClear,
    clearIcon,
    contextAllowClear,
    contextClearIcon,
    defaultAllowClear,
    defaultLabel,
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
        isPlainObject(allowClear) ? allowClear.clearIcon : undefined,
        clearIcon,
        isPlainObject(contextAllowClear) ? contextAllowClear.clearIcon : undefined,
        contextClearIcon,
        <CloseCircleFilled />,
      ),
      disabled:
        (isPlainObject(allowClear) ? allowClear?.disabled : undefined) ??
        (isPlainObject(contextAllowClear) ? contextAllowClear?.disabled : undefined),
      tabIndex:
        (isPlainObject(allowClear) ? allowClear?.tabIndex : undefined) ??
        (isPlainObject(contextAllowClear) ? contextAllowClear?.tabIndex : undefined),
      label:
        (isPlainObject(allowClear) ? allowClear.label : undefined) ??
        (isPlainObject(contextAllowClear) ? contextAllowClear.label : undefined) ??
        defaultLabel,
    };
  }, [allowClear, clearIcon, contextAllowClear, contextClearIcon, defaultAllowClear, defaultLabel]);
};
