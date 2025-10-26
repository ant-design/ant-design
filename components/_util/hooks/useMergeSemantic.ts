import * as React from 'react';
import classnames from 'classnames';

import type { ValidChar } from '../type';

type TemplateSemanticClassNames<T extends string> = Partial<Record<T, string>>;

export type SemanticSchema = { _default?: string } & {
  [key: `${ValidChar}${string}`]: SemanticSchema;
};

// ========================= ClassNames =========================
export function mergeClassNames<
  T extends string,
  SemanticClassNames extends Partial<Record<T, any>> = TemplateSemanticClassNames<T>,
>(schema?: SemanticSchema, ...classNames: (SemanticClassNames | undefined)[]) {
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
          if (defaultField) {
            acc[key] = acc[key] || {};
            acc[key][defaultField] = classnames(acc[key][defaultField], curVal);
          }
        }
      } else {
        // Flatten fill
        acc[key] = classnames(acc[key], curVal);
      }
    });
    return acc;
  }, {} as SemanticClassNames);
}

function useSemanticClassNames<ClassNamesType extends object>(
  schema?: SemanticSchema,
  ...classNames: (Partial<ClassNamesType> | undefined)[]
): Partial<ClassNamesType> {
  return React.useMemo(
    () => mergeClassNames(schema, ...classNames),
    [classNames, schema],
  ) as ClassNamesType;
}

// =========================== Styles ===========================
function useSemanticStyles<StylesType extends object>(
  ...styles: (Partial<StylesType> | undefined)[]
) {
  return React.useMemo(() => {
    return styles.reduce<Record<string, React.CSSProperties>>((acc, cur = {}) => {
      Object.keys(cur).forEach((key) => {
        acc[key] = { ...acc[key], ...(cur as Record<string, React.CSSProperties>)[key] };
      });
      return acc;
    }, {});
  }, [styles]) as StylesType;
}

// =========================== Export ===========================
function fillObjectBySchema<T extends object>(obj: T, schema: SemanticSchema): T {
  const newObj: any = { ...obj };
  Object.keys(schema).forEach((key) => {
    if (key !== '_default') {
      const nestSchema = (schema as any)[key] as SemanticSchema;
      const nextValue = newObj[key] || {};
      newObj[key] = nestSchema ? fillObjectBySchema(nextValue, nestSchema) : nextValue;
    }
  });
  return newObj;
}

/**
 * Merge classNames and styles from multiple sources.
 * When `schema` is provided, it will **must** provide the nest object structure.
 */
export const useMergeSemantic = <ClassNamesType extends object, StylesType extends object>(
  classNamesList: (ClassNamesType | undefined)[],
  stylesList: (StylesType | undefined)[],
  schema?: SemanticSchema,
) => {
  const mergedClassNames = useSemanticClassNames(schema, ...classNamesList) as ClassNamesType;
  const mergedStyles = useSemanticStyles(...stylesList) as StylesType;
  return React.useMemo(() => {
    return [
      fillObjectBySchema(mergedClassNames, schema!) as ClassNamesType,
      fillObjectBySchema(mergedStyles, schema!) as StylesType,
    ] as const;
  }, [mergedClassNames, mergedStyles, schema]);
};
