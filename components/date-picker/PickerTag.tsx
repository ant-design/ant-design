import * as React from 'react';
import type { TagProps } from '../tag';
import Tag from '../tag';

export default function PickerTag(props: TagProps) {
  return <Tag color="blue" {...props} />;
}
