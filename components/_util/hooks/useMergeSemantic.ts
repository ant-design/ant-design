import * as React from 'react';
import classnames from 'classnames';

type SemanticClassNames<T extends string> = Partial<Record<T, string>>;
type SemanticStyles<T extends string> = Partial<Record<T, React.CSSProperties>>;

function useSemanticClassNames<T extends string>(
  ...classNames: (SemanticClassNames<T> | undefined)[]
) {
  return React.useMemo(() => {
    return classNames.reduce(
      (acc, cur = {}) => {
        Object.keys(cur).forEach((key) => {
          acc[key] = classnames(acc[key], (cur as Record<string, string>)[key]);
        });
        return acc;
      },
      {} as Record<string, string>,
    ) as SemanticClassNames<T>;
  }, [classNames]);
}

function useSemanticStyles<T extends string>(...styles: (SemanticStyles<T> | undefined)[]) {
  return React.useMemo(() => {
    return styles.reduce(
      (acc, cur = {}) => {
        Object.keys(cur).forEach((key) => {
          acc[key] = { ...acc[key], ...(cur as Record<string, React.CSSProperties>)[key] };
        });
        return acc;
      },
      {} as Record<string, React.CSSProperties>,
    ) as SemanticStyles<T>;
  }, [styles]);
}

export default function useMergeSemantic<T extends string>(
  classNamesList: (SemanticClassNames<T> | undefined)[],
  stylesList: (SemanticStyles<T> | undefined)[],
) {
  const mergedClassNames = useSemanticClassNames(...classNamesList);
  const mergedStyles = useSemanticStyles(...stylesList);

  return [mergedClassNames, mergedStyles] as const;
}
