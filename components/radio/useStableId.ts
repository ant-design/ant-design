import { useState } from 'react';

let globalId = 0;

/**
 * 生成稳定且唯一的ID的自定义Hook
 * @param prefix - ID的可选前缀
 * @returns 唯一的ID字符串
 */
export function useStableId(): string {
  const [id] = useState(() => {
    globalId += 1;

    const isServer = typeof window === 'undefined';

    const envPrefix = isServer ? 's' : 'c';

    return `${envPrefix}-${globalId}`;
  });

  return id;
}
