import { useCallback, useRef } from 'react';

import toList from '../_util/toList';
import useClips from './useClips';

type ClipsFunction = ReturnType<typeof useClips>;
type ClipsResult = ReturnType<ClipsFunction>;
type ClipsParams = Parameters<ClipsFunction>;

function generateCacheVerify(params: ClipsParams): string {
  const [content, rotate, ratio, width, height, font, gapX, gapY] = params;
  let verify = `${rotate}-${ratio}-${width}-${height}-${gapX}-${gapY}`;
  if (!(content instanceof HTMLImageElement)) {
    const { color, fontSize, fontStyle, fontWeight, fontFamily, textAlign } = font;
    const fontVerify = `${color}-${fontSize}-${fontStyle}-${fontWeight}-${fontFamily}-${textAlign}`;
    const contents = toList(content);
    verify = `${verify}-${fontVerify}-${contents.join('')}`;
  }
  return verify;
}

export default function useCache(): {
  getCache: (...params: ClipsParams) => ClipsResult | undefined;
  setCache: (result: ClipsResult, ...params: ClipsParams) => void;
} {
  const imageCache = useRef(
    new WeakMap<HTMLImageElement, { verify: string; cache: ClipsResult }>(),
  );
  const textCache = useRef(new Map<string, ClipsResult>());

  const setCache = useCallback((result: ClipsResult, ...params: ClipsParams) => {
    const [content] = params;
    const verify = generateCacheVerify(params);
    if (content instanceof HTMLImageElement) {
      imageCache.current.set(content, { verify, cache: result });
    } else {
      textCache.current.set(verify, result);
    }
  }, []);

  const getCache = useCallback((...params: ClipsParams): ClipsResult | undefined => {
    const [content] = params;
    const verify = generateCacheVerify(params);
    if (content instanceof HTMLImageElement) {
      const cached = imageCache.current.get(content);
      return cached?.verify === verify ? cached.cache : undefined;
    }

    return textCache.current.get(verify);
  }, []);

  return { getCache, setCache };
}
