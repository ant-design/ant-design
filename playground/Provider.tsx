import React from 'react';
import { theme, ConfigProvider } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import useUrlState from '@ahooksjs/use-url-state';

export const useUrl: typeof useUrlState = (initialState, opt) =>
  useUrlState(initialState, {
    ...opt,
    parseOptions: {
      parseBooleans: true,
      arrayFormat: 'comma',
      ...opt?.parseOptions,
    },
    stringifyOptions: {
      arrayFormat: 'comma',
      ...opt?.stringifyOptions,
    },
  });

function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

const algorithmMap = {
  default: theme.defaultAlgorithm,
  light: theme.defaultAlgorithm,
  dark: theme.darkAlgorithm,
  compact: theme.compactAlgorithm,
};

const Provider = ({ children }: React.PropsWithChildren) => {
  const [urlParams] = useUrl({
    theme: [], // theme algorithm
    cssVar: false,
    hashed: true,
  });

  const algorithm = Array.from(
    new Set(
      toArray(urlParams.theme)
        .map((name: string) => algorithmMap[name as keyof typeof algorithmMap])
        .filter(Boolean),
    ),
  );

  return (
    <ConfigProvider
      theme={{
        cssVar: urlParams.cssVar,
        hashed: urlParams.hashed,
        algorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default Provider;
