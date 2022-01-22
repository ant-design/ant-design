import { useEffect, useLayoutEffect } from 'react';

export default typeof document !== 'undefined' ? useLayoutEffect : useEffect;
