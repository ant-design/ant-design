import { useMemo } from 'react';
import type { CSSProperties } from 'react';

type SlotName = string;

export type ConditionalClassNames = Partial<Record<SlotName, string>>;
export type ConditionalStyles = Partial<Record<SlotName, CSSProperties>>;

export interface MergeCondition<Props extends Record<string, any>> {
  props: Partial<Props>;
  classNames?: ConditionalClassNames;
  styles?: ConditionalStyles;
}

function appendClassName(target: ConditionalClassNames, slot: string, cls: string) {
  target[slot] = target[slot] ? `${target[slot]} ${cls}` : cls;
}

export function useMergeConditionalClassNames<Props extends Record<string, any>>(
  currentProps: Props,
  conditions: MergeCondition<Props>[],
): ConditionalClassNames {
  return useMemo(() => {
    const mergedClassNames: ConditionalClassNames = {};

    conditions.forEach(({ props: expectedProps, classNames = {} }) => {
      const isMatch = Object.entries(expectedProps).every(
        ([key, value]) => (currentProps as any)[key] === value,
      );

      if (isMatch) {
        Object.entries(classNames).forEach(([slot, cls]) => {
          if (cls) appendClassName(mergedClassNames, slot, cls);
        });
      }
    });

    return mergedClassNames;
  }, [currentProps, conditions]);
}

export function useMergeConditionalStyles<Props extends Record<string, any>>(
  currentProps: Props,
  conditions: MergeCondition<Props>[],
): ConditionalStyles {
  return useMemo(() => {
    const mergedStyles: ConditionalStyles = {};

    conditions.forEach(({ props: expectedProps, styles = {} }) => {
      const isMatch = Object.entries(expectedProps).every(
        ([key, value]) => (currentProps as any)[key] === value,
      );

      if (isMatch) {
        Object.entries(styles).forEach(([slot, styleObj]) => {
          mergedStyles[slot] = {
            ...mergedStyles[slot],
            ...styleObj,
          } as CSSProperties;
        });
      }
    });

    return mergedStyles;
  }, [currentProps, conditions]);
}

export default function useMergeCondition<Props extends Record<string, any>>(
  currentProps: Props,
  conditions: MergeCondition<Props>[],
): [ConditionalClassNames, ConditionalStyles] {
  const classNames = useMergeConditionalClassNames(currentProps, conditions);
  const styles = useMergeConditionalStyles(currentProps, conditions);

  return [classNames, styles];
}
