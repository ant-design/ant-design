import * as React from 'react';
import { useContext } from 'react';
import Button from '../button';
import type { ButtonProps } from '../button';
import { ConfigContext } from '../config-provider';

export default function PickerButton(props: ButtonProps) {
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('btn');
  const compactCls = `${prefixCls}-compact`;

  return <Button size="small" type="primary" className={`${compactCls}-last-item`} {...props} />;
}
