import * as React from 'react';

import Button from '../button/Button';
import type { ButtonProps } from '../button/Button';

export const NowButton: React.FC<Readonly<ButtonProps>> = (props) => (
  <Button size="small" color="primary" variant="text" {...props} />
);

export const OkButton: React.FC<Readonly<ButtonProps>> = (props) => (
  <Button size="small" type="primary" {...props} />
);
