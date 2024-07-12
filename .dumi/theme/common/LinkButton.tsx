import React from 'react';
import { Button } from 'antd';
import type { ButtonProps } from 'antd';
import Link from './Link';
import type { LinkProps } from './Link';

type LinkButtonProps = LinkProps &
  Pick<ButtonProps, 'type' | 'size'> & { children: React.ReactNode };

const LinkButton: React.FC<LinkButtonProps> = (props) => <Link component={Button} {...props} />;

export default LinkButton;
