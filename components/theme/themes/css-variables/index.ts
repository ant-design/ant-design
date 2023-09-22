import type { DerivativeFunc } from '@ant-design/cssinjs';
import type { MapToken, SeedToken } from 'antd/es/theme/interface';
import defaultAlgorithm from 'antd/es/theme/themes/default';

const derivative: DerivativeFunc<SeedToken, MapToken> = (token, mapToken) => {
  const mergedMapToken = mapToken ?? defaultAlgorithm(token);

  return {
    ...mergedMapToken,
  };
};

export default derivative;
