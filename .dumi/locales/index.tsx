import * as React from 'react';
import { useLocale as useDumiLocale } from 'dumi';

export interface LocaleMap<Key extends string> {
  cn: Record<Key, string>;
  default: Record<Key, string>;
}

export default function useLocale<Key extends string>(localeMap: LocaleMap<Key>) {
  const { id } = useDumiLocale();
  const localeType = id === 'zh-CN' ? 'cn' : 'default';
  return localeMap[localeType];
}
