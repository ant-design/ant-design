import { useMemo } from 'react';
import type { CSSProperties } from 'react';

type SlotName = string;

export type ClassValue = string | NestedClassNames;

export type NestedClassNames = { [key: string]: string | { [key: string]: string } };

export type ConditionalClassNames = Partial<Record<SlotName, string | { [key: string]: string }>>;
export type ConditionalStyles = Partial<Record<SlotName, CSSProperties>>;

export interface MergeCondition<Props extends Record<string, any>> {
  props: Partial<Props>;
  classNames?: ConditionalClassNames;
  styles?: ConditionalStyles;
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

export function useMergeConditionalClassNames<Props extends Record<string, any>>(
  currentProps: Props,
  conditions: MergeCondition<Props>[] = [],
): NestedClassNames {
  return useMemo(() => {
    const merged: NestedClassNames = {};

    for (const { props: expectedProps, classNames } of conditions) {
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
  }, [currentProps, conditions]);
}

export function useMergeConditionalStyles<Props extends Record<string, any>>(
  currentProps: Props,
  conditions: MergeCondition<Props>[] = [],
): ConditionalStyles {
  return useMemo(() => {
    const merged: ConditionalStyles = {};

    for (const { props: expectedProps, styles } of conditions) {
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
  }, [currentProps, conditions]);
}

export default function useMergeCondition<Props extends Record<string, any>>(
  currentProps: Props,
  conditions: MergeCondition<Props>[],
): [NestedClassNames, ConditionalStyles] {
  const classNames = useMergeConditionalClassNames(currentProps, conditions);
  const styles = useMergeConditionalStyles(currentProps, conditions);

  return [classNames, styles];
}
