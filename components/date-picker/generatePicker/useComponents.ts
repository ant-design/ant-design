import { useMemo } from 'react';
import type { Components } from 'rc-picker/lib/interface';

import PickerButton from '../PickerButton';

export default function useComponents(components?: Components) {
  return useMemo(
    () => ({
      button: PickerButton,
      ...components,
    }),
    [components],
  );
}
