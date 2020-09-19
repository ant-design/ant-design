import { useEffect, useLayoutEffect } from 'react';
import canUseDom from 'rc-util/lib/Dom/canUseDom';

/** This is only to remove warning from ssr. But do nothing special */
const useIsomorphicEffect = canUseDom() ? useLayoutEffect : useEffect;

export default useIsomorphicEffect;
