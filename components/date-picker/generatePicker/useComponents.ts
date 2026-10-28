import { useMemo } from 'react';
import type { Components } from '@rc-component/picker/interface';

import { NowButton, OkButton } from '../PickerButton';

export default function useComponents(components?: Components) {
  return useMemo(
    () => ({
      nowButton: NowButton,
      okButton: OkButton,
      ...components,
    }),
    [components],
  );
}
