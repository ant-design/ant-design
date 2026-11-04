import * as React from 'react';

import { useDevWarning } from '../../_util/warning';
import type { FormProps } from '../Form';

const names: Record<string, number> = {};

export default function useFormWarning({ name, labelAlign }: FormProps) {
  const warning = useDevWarning('Form');

  warning.deprecated(
    labelAlign !== 'left' && labelAlign !== 'right',
    'labelAlign=left|right',
    'labelAlign=start|end',
  );

  React.useEffect(() => {
    if (name) {
      names[name] = (names[name] || 0) + 1;

      warning(names[name] <= 1, 'usage', 'There exist multiple Form with same `name`.');

      return () => {
        names[name] -= 1;
      };
    }
  }, [name]);
}
