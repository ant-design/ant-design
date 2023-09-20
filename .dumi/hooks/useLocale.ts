import { useLocale as useDumiLocale } from 'dumi';

export interface LocaleMap<Key extends string> {
  cn: Record<Key, string>;
  en: Record<Key, string>;
}

function useLocale<Key extends string>(
  localeMap?: LocaleMap<Key>,
): [Record<Key, string>, 'cn' | 'en'] {
  const { id } = useDumiLocale();
  const localeType = id === 'zh-CN' ? ('cn' as const) : ('en' as const);
  return [localeMap?.[localeType]!, localeType];
}

export default useLocale;
