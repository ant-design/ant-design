// ZombieJ: This is only warn for React 17 not support.
// But Jest mock React 17 will cause many issues in testing,
// Can be safe to remove in next major version.

import { version } from 'react';

export default function getReactMajorVersion() {
  const majorVersion = Number.parseInt(version.split('.')[0], 10);
  return majorVersion;
}
