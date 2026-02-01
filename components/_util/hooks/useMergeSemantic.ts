import * as React from 'react';
import { clsx } from 'clsx';

import type { ValidChar } from '../type';
import type { RemoveClassNamesString } from './semanticType';

export type SemanticSchema = { _default?: string } & {
  [key: `${ValidChar}${string}`]: SemanticSchema;
};

export type SemanticType<P = any, T = any> = T | ((info: { props: P }) => T);

export type RemoveStringSemanticType<T extends { classNames?: any; styles?: any }> = {
  styles?: T['styles'];
  classNames?: RemoveClassNamesString<NonNullable<T['classNames']>>;
};

// ========================= ClassNames =========================
export const mergeClassNames = <SemanticClassNames = any>(
  schema?: SemanticSchema,
  ...classNames: (SemanticClassNames | undefined)[]
) => {
  const mergedSchema = schema || {};
  return classNames.filter(Boolean).reduce<SemanticClassNames>((acc: any, cur) => {
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
          if (defaultField && curVal) {
            acc[key] = acc[key] || {};
            acc[key][defaultField] = clsx(acc[key][defaultField], curVal);
          }
        }
      } else if (curVal) {
        // Flatten fill
        acc[key] = clsx(acc[key], curVal);
      }
    });
    return acc;
  }, {} as SemanticClassNames);
};

const useSemanticClassNames = <ClassNamesType = any>(
  schema?: SemanticSchema,
  ...classNames: ClassNamesType[]
): Partial<ClassNamesType> => {
  return React.useMemo(() => mergeClassNames(schema, ...classNames), [schema, ...classNames]);
};

// =========================== Styles ===========================
export const mergeStyles = <StylesType = any>(...styles: (StylesType | undefined)[]) => {
  return styles.filter(Boolean).reduce<Record<string, any>>((acc, cur) => {
    if (cur) {
      Object.keys(cur).forEach((key) => {
        acc[key] = { ...acc[key], ...(cur as Record<string, any>)[key] };
      });
    }
    return acc;
  }, {}) as StylesType;
};

const useSemanticStyles = <StylesType = any>(...styles: (StylesType | undefined)[]) => {
  return React.useMemo(() => mergeStyles(...styles), [...styles]) as StylesType;
};

// =========================== Export ===========================
const fillObjectBySchema = <T = any>(obj: T, schema: SemanticSchema): T => {
  const newObj: any = { ...obj };
  Object.keys(schema).forEach((key) => {
    if (key !== '_default') {
      const nestSchema = (schema as any)[key] as SemanticSchema;
      const nextValue = newObj[key] || {};
      newObj[key] = nestSchema ? fillObjectBySchema(nextValue, nestSchema) : nextValue;
    }
  });
  return newObj;
};

export const resolveStyleOrClass = <T = any, P = any>(
  value: T | ((config: any) => T),
  info: { props: P },
) => {
  if (typeof value === 'function') {
    return (value as (config: any) => T)(info);
  }
  return value;
};

type MaybeFn<T, P> = T | ((info: { props: P }) => T) | undefined;

/**
 * @desc Merge classNames and styles from multiple sources. When `schema` is provided, it **must** provide the nest object structure.
 * @descZH 合并来自多个来源的 classNames 和 styles，当提供了 `schema` 时，必须提供嵌套的对象结构。
 */
export const useMergeSemantic = <ClassNamesType = any, StylesType = any, Props = any>(
  classNamesList: MaybeFn<ClassNamesType, Props>[],
  stylesList: MaybeFn<StylesType, Props>[],
  info: { props: Props },
  schema?: SemanticSchema,
) => {
  const resolvedClassNamesList = classNamesList.map((classNames) =>
    classNames ? resolveStyleOrClass(classNames, info) : undefined,
  );

  const resolvedStylesList = stylesList.map((styles) =>
    styles ? resolveStyleOrClass(styles, info) : undefined,
  );

  const mergedClassNames = useSemanticClassNames(schema, ...resolvedClassNamesList);

  const mergedStyles = useSemanticStyles(...resolvedStylesList);

  const result = React.useMemo(() => {
    if (!schema) {
      return [mergedClassNames, mergedStyles] as const;
    }
    return [
      fillObjectBySchema(mergedClassNames, schema),
      fillObjectBySchema(mergedStyles, schema),
    ] as const;
  }, [mergedClassNames, mergedStyles, schema]);
  return result as [RemoveClassNamesString<NonNullable<ClassNamesType>>, NonNullable<StylesType>];
};

// type Result<T> = T extends string ? never : T;
// export function getFilterStringType<T, K extends string>(classNames: T, key: K): Result<T> {
//   return (typeof classNames === 'string' ? { [key]: classNames } : classNames) as Result<T>;
// }
