import useSWR from 'swr';

export interface ChangelogInfo {
  version: string;
  changelog: string;
  refs: string[];
  contributors: string[];
  releaseDate: string;
}

export const useChangelog = (componentPath: string, lang: 'cn' | 'en'): ChangelogInfo[] => {
  const logFileName = `components-changelog-${lang}.json`;

  const { data, error, isLoading } = useSWR(
    `component-changelog-${lang}`,
    () => import(`../../../preset/${logFileName}`),
  );

  if (error || isLoading) {
    return [];
  }

  const component = componentPath.replace(/-/g, '');
  const componentName = Object.keys(data).find(
    (name) => name.toLowerCase() === component.toLowerCase(),
  );
  if (!componentName) {
    return [];
  }
  return data?.[componentName] || [];
};
