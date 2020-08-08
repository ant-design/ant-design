import { useContext } from 'react';
import { ConfigContext } from '../config-provider';

import cxCurry from './cx';

interface Props {
  name: string;
  customizePrefixCls?: string;
}
export default ({ name, customizePrefixCls }: Props) => {
  const config = useContext(ConfigContext);

  const { getPrefixCls } = config;

  const prefixCls = getPrefixCls(name, customizePrefixCls);

  const cxUtils = cxCurry(prefixCls);

  return { ...config, prefixCls, ...cxUtils };
};
