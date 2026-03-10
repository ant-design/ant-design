import { isValidElement, useMemo } from 'react';

import type { ImageProgressConfig, PlaceholderType } from '..';

export function isPlaceholderConfig(
  placeholder: unknown,
): placeholder is { progress?: boolean | ImageProgressConfig } {
  return !!placeholder && typeof placeholder === 'object' && !isValidElement(placeholder);
}

export default function usePlaceholderConfig(placeholder?: PlaceholderType) {
  return useMemo(() => {
    if (!placeholder || !isPlaceholderConfig(placeholder)) {
      return {};
    }

    if (typeof placeholder.progress === 'boolean') {
      return {
        progressConfig: placeholder.progress ? {} : undefined,
      };
    }

    return {
      progressConfig: placeholder.progress,
    };
  }, [placeholder]);
}
