import { useMemo } from 'react';

export default function usePreviewConfig<T>(preview?: boolean | T): T {
  return useMemo(() => {
    if (typeof preview === 'boolean') {
      return preview ? {} : null;
    }
    return preview && typeof preview === 'object' ? preview : {};
  }, [preview]);
}
