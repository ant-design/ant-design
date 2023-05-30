import { createTheme } from '@ant-design/cssinjs';
import type { ThemeConfig } from '../config-provider/context';
import type { AliasToken } from './interface';
import defaultDerivative from './themes/default';
import seedToken from './themes/seed';
import formatToken from './util/alias';

const getDesignToken = (config?: ThemeConfig): AliasToken => {
  const theme = config?.algorithm ? createTheme(config.algorithm) : createTheme(defaultDerivative);
  const mergedToken = { ...seedToken, ...config?.token };
  const mapToken = theme.getDerivativeToken(mergedToken);
  const mergedMapToken = {
    ...mapToken,
    override: config?.token,
  };
  return formatToken(mergedMapToken);
};

export default getDesignToken;
