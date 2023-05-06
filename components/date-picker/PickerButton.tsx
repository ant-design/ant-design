import * as React from 'react';
import type { ButtonProps } from '../button';
import Button from '../button';

export default function PickerButton(props: ButtonProps) {
  return <Button size="small" type="primary" {...props} />;
}
