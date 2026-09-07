import useSWR from 'swr';

export interface ChangelogInfo {
  version: string;
  changelog: string;
  refs: string[];
  contributors: string[];
  releaseDate: string;
}

type ChangelogData = Record<string, ChangelogInfo[]>;

const changelogLoaders: Record<'cn' | 'en', () => Promise<ChangelogData>> = {
  cn: () => import('../preset/components-changelog-cn.json').then((mod) => mod.default),
  en: () => import('../preset/components-changelog-en.json').then((mod) => mod.default),
};

const useChangelog = (path: string, lang: 'cn' | 'en'): ChangelogInfo[] => {
  const { data, error, isLoading } = useSWR(
    lang ? `component-changelog-${lang}` : null,
    changelogLoaders[lang],
  );

  if (error || isLoading || !data) {
    return [];
  }

  const component = path.replace(/-/g, '');
  const componentName = Object.keys(data).find(
    (name) => name.toLowerCase() === component.toLowerCase(),
  );
  if (!componentName) {
    return [];
  }
  return data?.[componentName] || [];
};

export default useChangelog;
