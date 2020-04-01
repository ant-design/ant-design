import * as React from 'react';
import Button, { ButtonProps } from '../button';

export default function PickerButton(props: ButtonProps) {
  return <Button size="small" type="primary" {...props} />;
}
