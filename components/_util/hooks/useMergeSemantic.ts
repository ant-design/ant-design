import * as React from 'react';
import { clsx } from 'clsx';

import type { AnyObject, EmptyObject, ValidChar } from '../type';

export type SemanticSchema = { _default?: string } & {
  [key: `${ValidChar}${string}`]: SemanticSchema;
};

export type Resolvable<T, P extends AnyObject> = T | ((info: { props: P }) => T);

export type SemanticClassNamesType<
  Props extends AnyObject,
  SemanticClassNames extends Record<PropertyKey, string>,
  NestedStructure extends EmptyObject = EmptyObject,
> = Resolvable<Readonly<SemanticClassNames>, Props> & NestedStructure;

export type SemanticStylesType<
  Props extends AnyObject,
  SemanticStyles extends Record<PropertyKey, React.CSSProperties>,
  NestedStructure extends EmptyObject = EmptyObject,
> = Resolvable<Readonly<SemanticStyles>, Props> & NestedStructure;

// new types v2
export type SemanticTypeV2<P = any, T = any> = T | ((info: { props: P }) => T);
export type SemanticResultTypeV2<S = any, C = any> = { styles: S; classNames: C };

// ========================= ClassNames =========================
export const mergeClassNames = <
  Name extends string,
  SemanticClassNames extends Partial<Record<Name, any>>,
>(
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
          if (defaultField) {
            acc[key] = acc[key] || {};
            acc[key][defaultField] = clsx(acc[key][defaultField], curVal);
          }
        }
      } else {
        // Flatten fill
        acc[key] = clsx(acc[key], curVal);
      }
    });
    return acc;
  }, {} as SemanticClassNames);
};

const useSemanticClassNames = <ClassNamesType extends AnyObject>(
  schema?: SemanticSchema,
  ...classNames: (Partial<ClassNamesType> | undefined)[]
): Partial<ClassNamesType> => {
  return React.useMemo(() => mergeClassNames(schema, ...classNames), [schema, ...classNames]);
};

// =========================== Styles ===========================
export const mergeStyles = <StylesType extends AnyObject>(
  ...styles: (Partial<StylesType> | undefined)[]
) => {
  return styles
    .filter(Boolean)
    .reduce<Record<PropertyKey, React.CSSProperties>>((acc, cur = {}) => {
      Object.keys(cur).forEach((key) => {
        acc[key] = { ...acc[key], ...cur[key] };
      });
      return acc;
    }, {});
};

const useSemanticStyles = <StylesType extends AnyObject>(
  ...styles: (Partial<StylesType> | undefined)[]
) => {
  return React.useMemo(() => mergeStyles(...styles), [...styles]) as StylesType;
};

// =========================== Export ===========================
const fillObjectBySchema = <T extends AnyObject>(obj: T, schema: SemanticSchema): T => {
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

export const resolveStyleOrClass = <T extends AnyObject>(
  value: T | ((config: any) => T),
  info: { props: AnyObject },
) => {
  return typeof value === 'function' ? value(info) : value;
};

type MaybeFn<T, P> = T | ((info: { props: P }) => T) | undefined;

type ObjectOnly<T> = T extends (...args: any) => any ? never : T;

/**
 * @desc Merge classNames and styles from multiple sources. When `schema` is provided, it **must** provide the nest object structure.
 * @descZH 合并来自多个来源的 classNames 和 styles，当提供了 `schema` 时，必须提供嵌套的对象结构。
 */
export const useMergeSemantic = <
  ClassNamesType extends AnyObject,
  StylesType extends AnyObject,
  Props extends AnyObject,
>(
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

  const mergedClassNames = useSemanticClassNames(
    schema,
    ...resolvedClassNamesList,
  ) as ObjectOnly<ClassNamesType>;

  const mergedStyles = useSemanticStyles(...resolvedStylesList) as ObjectOnly<StylesType>;

  return React.useMemo(() => {
    if (!schema) {
      return [mergedClassNames, mergedStyles] as const;
    }
    return [
      fillObjectBySchema<ObjectOnly<ClassNamesType>>(mergedClassNames, schema),
      fillObjectBySchema<ObjectOnly<StylesType>>(mergedStyles, schema),
    ] as const;
  }, [mergedClassNames, mergedStyles, schema]);
};
