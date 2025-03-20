import * as React from 'react';
import classnames from 'classnames';

type TemplateSemanticClassNames<T extends string> = Partial<Record<T, string>>;
type SemanticStyles<T extends string> = Partial<Record<T, React.CSSProperties>>;

/**
 * Check if value type is object.
 */
function isObjectStructure(value: any): value is Record<string, any> {
  return value && typeof value === 'object';
}

function covertToObjectStructure(value: string | NestClassNames): NestClassNames {
  return typeof value === 'string' ? { default: value } : value;
}

interface NestClassNames {
  [key: string]: string | NestClassNames;
}

function mergeClassNames<T extends NestClassNames>(...classNamesList: T[]) {
  // Init array for performance saving
  const keyList: string[] = [];

  classNamesList.forEach((classNames) => {
    keyList.push(...Object.keys(classNames));
  });

  const filledClassNames: NestClassNames = {};

  new Set(keyList).forEach((key) => {
    const value1 = classNames1[key];
    const value2 = classNames2[key];

    if (!isObjectStructure(value1) && !isObjectStructure(value2)) {
      filledClassNames[key] = classnames(value1, value2);
    } else {
      const valueObj1 = covertToObjectStructure(value1);
      const valueObj2 = covertToObjectStructure(value2);
      filledClassNames[key] = mergeClassNames(valueObj1, valueObj2);
    }
  });

  return filledClassNames as T;
}

function useSemanticClassNames<
  T extends string,
  SemanticClassNames extends Partial<Record<T, any>> = TemplateSemanticClassNames<T>,
>(...classNames: (SemanticClassNames | undefined)[]): SemanticClassNames {
  return React.useMemo(() => {
    // return classNames.reduce(
    //   (acc, cur) => {
    //     const filledCur = cur || ({} as SemanticClassNames);
    //     Object.keys(filledCur).forEach((key) => {
    //       const oriValue = acc[key];
    //       const curValue = (filledCur as Record<string, string>)[key];
    //       // acc[key] = classnames(acc[key], (filledCur as Record<string, string>)[key]);
    //       if (isObjectStructure(oriValue) || isObjectStructure(curValue)) {
    //       }
    //     });
    //     return acc;
    //   },
    //   {} as Record<string, string>,
    // ) as SemanticClassNames;
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

export default function useMergeSemantic<
  T extends string,
  SemanticClassNames extends Partial<Record<T, any>> = TemplateSemanticClassNames<T>,
>(
  classNamesList: (SemanticClassNames | undefined)[],
  stylesList: (SemanticStyles<T> | undefined)[],
) {
  const mergedClassNames = useSemanticClassNames(...classNamesList);
  const mergedStyles = useSemanticStyles(...stylesList);

  return [mergedClassNames, mergedStyles] as const;
}
