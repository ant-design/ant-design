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

export function covertToSemanticObj<T extends { default?: string }>(value?: string | T): T;
export function covertToSemanticObj(value: string | NestClassNames): NestClassNames;
export function covertToSemanticObj(value: string | NestClassNames): NestClassNames {
  return typeof value === 'string' ? { default: value } : value;
}

interface NestClassNames {
  [key: string]: string | NestClassNames | undefined;
}

function mergeClassNames<T extends NestClassNames>(...classNamesList: (T | undefined)[]) {
  // Init array for performance saving
  const keyList: string[] = [];

  classNamesList.forEach((classNames) => {
    if (classNames) {
      keyList.push(...Object.keys(classNames));
    }
  });

  const filledClassNames: NestClassNames = {};

  new Set(keyList).forEach((key) => {
    const valueList = classNamesList.map((classNames) => (classNames || ({} as T))[key]) as (
      | string
      | NestClassNames
    )[];
    if (valueList.some((value) => isObjectStructure(value))) {
      const valueObjList = valueList.map((value) => covertToSemanticObj(value));
      filledClassNames[key] = mergeClassNames(...valueObjList);
    } else {
      filledClassNames[key] = classnames(...valueList);
    }
  });

  return filledClassNames as T;
}

function useSemanticClassNames<
  T extends string,
  SemanticClassNames extends Partial<Record<T, any>> = TemplateSemanticClassNames<T>,
>(...classNames: (SemanticClassNames | undefined)[]): SemanticClassNames {
  return React.useMemo(() => {
    return mergeClassNames(...classNames) as SemanticClassNames;
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
