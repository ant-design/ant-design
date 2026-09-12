// Keep React version detection isolated since mocking React itself causes test issues.
// This can be removed once all supported React versions accept Fragment refs.

import { version } from 'react';

const getReactVersion = () => {
  const [major, minor, patch] = version.split('.').map((number) => Number.parseInt(number, 10));
  return [major, minor, patch] as const;
};

export default getReactVersion;
