import * as React from 'react';

import Button from '../button/Button';
import type { ButtonProps } from '../button/Button';

const PickerButton: React.FC<Readonly<ButtonProps>> = (props) => (
  <Button size="small" type="primary" {...props} />
);

export default PickerButton;
