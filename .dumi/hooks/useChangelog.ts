import useSWR from 'swr';

export interface ChangelogInfo {
  version: string;
  changelog: string;
  refs: string[];
  contributors: string[];
  releaseDate: string;
}

const useChangelog = (path: string, lang: 'cn' | 'en'): ChangelogInfo[] => {
  const logFileName = `components-changelog-${lang}.json`;

  const { data, error, isLoading } = useSWR(
    lang ? `component-changelog-${lang}` : null,
    () => import(`../preset/${logFileName}`),
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
