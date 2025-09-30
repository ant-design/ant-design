import * as React from 'react';
import classnames from 'classnames';

import type { AnyObject } from '../../type';
import type { ValidChar } from './interface';

type TemplateSemanticClassNames<T extends string> = Partial<Record<T, string>>;

export type SemanticSchema = {
  _default?: string;
} & {
  [key: `${ValidChar}${string}`]: SemanticSchema;
};

// ========================= ClassNames =========================
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

function useSemanticClassNames<ClassNamesType extends object>(
  schema?: SemanticSchema,
  ...classNames: (Partial<ClassNamesType> | undefined)[]
): Partial<ClassNamesType> {
  return React.useMemo(() => mergeClassNames(schema, ...classNames), [schema, ...classNames]);
}

// =========================== Styles ===========================
export function mergeStyles<StylesType extends AnyObject>(
  ...styles: (Partial<StylesType> | undefined)[]
): Record<string, React.CSSProperties> {
  return styles.reduce<Record<string, React.CSSProperties>>((acc, cur = {}) => {
    Object.keys(cur).forEach((key) => {
      acc[key] = { ...acc[key], ...cur[key] };
    });
    return acc;
  }, {});
}
function useSemanticStyles<StylesType extends AnyObject>(
  ...styles: (Partial<StylesType> | undefined)[]
) {
  return React.useMemo(() => mergeStyles(...styles), [...styles]) as StylesType;
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

type MaybeFn<T, P> = T | ((info: { props: P }) => T) | undefined;
type ObjectOnly<T> = T extends (...args: any) => any ? never : T;
/**
 * Merge classNames and styles from multiple sources.
 * When `schema` is provided, it will **must** provide the nest object structure.
 */
export default function useMergeSemantic<
  ClassNamesType extends AnyObject,
  StylesType extends AnyObject,
  Props extends AnyObject,
>(
  classNamesList: MaybeFn<ClassNamesType, Props>[],
  stylesList: MaybeFn<StylesType, Props>[],
  schema?: SemanticSchema,
  info?: {
    props: Props;
  },
) {
  const resolveCallBack = <T extends object>(val?: MaybeFn<T, Props>) => {
    if (typeof val === 'function') {
      return val(info as { props: Props });
    }
    return val;
  };

  const resolvedClassNamesList = classNamesList.map(resolveCallBack);
  const resolvedStylesList = stylesList.map(resolveCallBack);

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
  }, [mergedClassNames, mergedStyles]);
}

export type SemanticClassNamesType<
  Props,
  SemanticName extends string,
  NestedStructure extends AnyObject = object,
> =
  | (Partial<Record<SemanticName, string>> & NestedStructure)
  | (((info: { props: Props }) => Partial<Record<SemanticName, string>> | undefined) &
      NestedStructure);

export type SemanticStylesType<
  Props,
  SemanticName extends string,
  NestedStructure extends AnyObject = object,
> =
  | (Partial<Record<SemanticName, React.CSSProperties>> & NestedStructure)
  | (((info: { props: Props }) => Partial<Record<SemanticName, React.CSSProperties>> | undefined) &
      NestedStructure);
