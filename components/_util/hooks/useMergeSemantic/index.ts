import * as React from 'react';
import classnames from 'classnames';

import { ValidChar } from './interface';

type TemplateSemanticClassNames<T extends string> = Partial<Record<T, string>>;
type SemanticStyles<T extends string> = Partial<Record<T, React.CSSProperties>>;

export type SemanticSchema = {
  _default?: string;
} & {
  [key: `${ValidChar}${string}`]: SemanticSchema;
};

export function mergeClassNames<
  T extends string,
  SemanticClassNames extends Partial<Record<T, any>> = TemplateSemanticClassNames<T>,
>(schema: SemanticSchema | undefined, ...classNames: (SemanticClassNames | undefined)[]) {
  const mergedSchema = schema || {};

  return classNames.reduce((acc: any, cur) => {
    // Loop keys of the current classNames
    Object.keys(cur || {}).forEach((key) => {
      const keySchema = mergedSchema[key as keyof SemanticSchema] as SemanticSchema;
      const curVal = (cur as SemanticClassNames)[key as keyof SemanticClassNames];

      if (keySchema && typeof keySchema === 'object') {
        if (curVal && typeof curVal === 'object') {
          // Loop fill
          acc[key] = mergeClassNames(keySchema, acc[key], curVal);
        } else {
          // Covert string to object structure
          const { _default: defaultField } = keySchema;
          acc[key] = acc[key] || {};
          acc[key][defaultField!] = classnames(acc[key][defaultField!], curVal);
        }
      } else {
        // Flatten fill
        acc[key] = classnames(acc[key], curVal);
      }
    });
    return acc;
  }, {} as SemanticClassNames) as SemanticClassNames;
}

function useSemanticClassNames<
  T extends string,
  SemanticClassNames extends Partial<Record<T, any>> = TemplateSemanticClassNames<T>,
>(
  schema: SemanticSchema | undefined,
  ...classNames: (SemanticClassNames | undefined)[]
): SemanticClassNames {
  return React.useMemo(() => mergeClassNames(schema, ...classNames), [classNames]);
}

function useSemanticStyles<T extends string>(
  schema: SemanticSchema | undefined,
  ...styles: (SemanticStyles<T> | undefined)[]
) {
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
  schema?: SemanticSchema,
) {
  const mergedClassNames = useSemanticClassNames(schema, ...classNamesList);
  const mergedStyles = useSemanticStyles(schema, ...stylesList);

  return [mergedClassNames, mergedStyles] as const;
}
