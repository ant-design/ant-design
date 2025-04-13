import * as React from 'react';

import Button from '../button';
import type { ButtonProps } from '../button';

const PickerButton: React.FC<Readonly<ButtonProps>> = (props) => (
  <Button size="small" type="primary" {...props} />
);

export default PickerButton;
