import { useContext } from 'react';
import { ConfigContext } from './config-provider';

import cxCurry from './cx';

export default () => {
  const config = useContext(ConfigContext);

  const { prefixCls } = config;

  const cxUtils = cxCurry(prefixCls);

  return { ...config, ...cxUtils };
};
