import { useMemo } from 'react';
import type { CSSProperties } from 'react';

type SlotName = string;

export type ClassValue = string | NestedClassNames;

export type NestedClassNames = { [key: string]: string | { [key: string]: string } };

export type RulesClassNames = Partial<Record<SlotName, string | { [key: string]: string }>>;
export type RulesStyles = Partial<Record<SlotName, CSSProperties>>;

export interface MergeRules<Props extends Record<string, any>> {
  props: Partial<Props>;
  classNames?: RulesClassNames;
  styles?: RulesStyles;
}

function mergeClassNames(target: NestedClassNames, slot: string, incoming: ClassValue): void {
  if (typeof incoming === 'string') {
    const existing = target[slot];
    if (typeof existing === 'string') {
      target[slot] = `${existing} ${incoming}`;
    } else if (typeof existing === 'object' && existing !== null) {
      target[slot] = {
        ...existing,
        default: existing.default ? `${existing.default} ${incoming}` : incoming,
      };
    } else {
      target[slot] = incoming;
    }
    return;
  }

  const existing = target[slot];
  if (typeof existing === 'string') {
    target[slot] = { default: existing, ...incoming };
  } else if (typeof existing === 'object' && existing !== null) {
    // 深度合并对象
    const merged: NestedClassNames = { ...existing };
    Object.entries(incoming).forEach(([subKey, subVal]) => {
      if (subVal) {
        mergeClassNames(merged, subKey, subVal);
      }
    });
    (target[slot] as NestedClassNames) = merged;
  } else {
    (target[slot] as NestedClassNames) = incoming;
  }
}

export function useMergeRulesClassNames<Props extends Record<string, any>>(
  currentProps: Props,
  rules: MergeRules<Props>[] = [],
): NestedClassNames {
  return useMemo(() => {
    const merged: NestedClassNames = {};

    for (const { props: expectedProps, classNames } of rules) {
      if (!classNames) continue;

      const isMatch = Object.entries(expectedProps).every(
        ([key, value]) => currentProps[key as keyof Props] === value,
      );

      if (!isMatch) continue;

      for (const [slot, cls] of Object.entries(classNames)) {
        if (cls) {
          mergeClassNames(merged, slot, cls);
        }
      }
    }

    return merged;
  }, [currentProps, rules]);
}

export function useMergeRulesStyles<Props extends Record<string, any>>(
  currentProps: Props,
  rules: MergeRules<Props>[] = [],
): RulesStyles {
  return useMemo(() => {
    const merged: RulesStyles = {};

    for (const { props: expectedProps, styles } of rules) {
      if (!styles) continue;

      const isMatch = Object.entries(expectedProps).every(
        ([key, value]) => currentProps[key as keyof Props] === value,
      );

      if (!isMatch) continue;

      for (const [slot, styleObj] of Object.entries(styles)) {
        merged[slot] = {
          ...merged[slot],
          ...styleObj,
        } as CSSProperties;
      }
    }

    return merged;
  }, [currentProps, rules]);
}

export default function useMergeRulesSemantics<Props extends Record<string, any>>(
  currentProps: Props,
  rules: MergeRules<Props>[],
): [NestedClassNames, RulesStyles] {
  const classNames = useMergeRulesClassNames(currentProps, rules);
  const styles = useMergeRulesStyles(currentProps, rules);

  return [classNames, styles];
}
