import React, { useMemo } from 'react';
import type { Components } from 'rc-picker/lib/interface';

import type { ButtonProps } from '../../button/button';
import Button from '../../button/button';

export default function useComponents(components?: Components, buttonProps?: ButtonProps) {
  function PickerButton(props: ButtonProps) {
    const mergedProps = { size: 'small', type: 'primary', ...buttonProps, ...props } as ButtonProps;

    return <Button {...mergedProps} />;
  }

  return useMemo(
    () => ({
      button: PickerButton,
      ...components,
    }),
    [components],
  );
}
