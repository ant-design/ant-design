import { useMemo } from 'react';
import type { Components } from '@rc-component/picker/interface';

import PickerButton from '../PickerButton';

export default function useComponents(components?: Components) {
  return useMemo(
    () => ({
      ...components,
      okButton: components?.okButton ?? components?.button ?? PickerButton,
    }),
    [components],
  );
}
