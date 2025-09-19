import * as React from 'react';
import classnames from 'classnames';

import type { AnyObject } from '../../type';
import { ValidChar } from './interface';

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
function useSemanticStyles<StylesType extends AnyObject>(
  ...styles: (Partial<StylesType> | undefined)[]
) {
  return React.useMemo(() => {
    return styles.reduce<Record<string, React.CSSProperties>>((acc, cur = {}) => {
      Object.keys(cur).forEach((key) => {
        acc[key] = { ...acc[key], ...cur[key] };
      });
      return acc;
    }, {});
  }, [...styles]) as StylesType;
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
  ClassNamesType extends object,
  StylesType extends object,
  Props,
>(
  classNamesList: MaybeFn<ClassNamesType, Props>[],
  stylesList: MaybeFn<StylesType, Props>[],
  schema?: SemanticSchema,
  info?: {
    props: Props;
  },
) {
  const resolveCallBack = <T extends object>(
    val: MaybeFn<T | undefined, Props> | undefined,
  ): T | undefined => {
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
      fillObjectBySchema(mergedClassNames, schema) as ObjectOnly<ClassNamesType>,
      fillObjectBySchema(mergedStyles, schema) as ObjectOnly<StylesType>,
    ] as const;
  }, [mergedClassNames, mergedStyles]);
}

export type SemanticClassNamesType<Props, SemanticName extends string> =
  | Partial<Record<SemanticName, string>>
  | ((info: { props: Props }) => Partial<Record<SemanticName, string>> | undefined);

export type SemanticStylesType<Props, SemanticName extends string> =
  | Partial<Record<SemanticName, React.CSSProperties>>
  | ((info: { props: Props }) => Partial<Record<SemanticName, React.CSSProperties>> | undefined);
