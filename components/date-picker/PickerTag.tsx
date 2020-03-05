import * as React from 'react';
import Tag, { TagProps } from '../tag';

export default function PickerButton(props: TagProps) {
  return <Tag color="blue" {...props} />;
}
