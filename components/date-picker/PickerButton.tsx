import * as React from 'react';
import type { ButtonProps } from '../button';
import Button from '../button';

export default function PickerButton(props: ButtonProps) {
  // add unCompact class to the button to ensure it's un-compacted
  // when used with Space.Compact
  return <Button size="small" type="primary" className="unCompact" {...props} />;
}
