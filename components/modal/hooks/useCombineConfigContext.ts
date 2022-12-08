import { useContext, useMemo } from 'react';
import type { ConfigProviderProps } from '../../config-provider';
import { ConfigContext } from '../../config-provider';

export default function useCombineConfigContext(config: ConfigProviderProps) {
  const upperConfigContext = useContext(ConfigContext);
  const combinedConfigContext = useMemo<ConfigProviderProps>(
    () => ({
      ...upperConfigContext,
      ...config,
    }),
    [upperConfigContext, config],
  );

  return combinedConfigContext;
}
